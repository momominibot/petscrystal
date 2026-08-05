import { createDecipheriv, createCipheriv, randomBytes } from "crypto";
import { get, put } from "@vercel/blob";

type StoredAuthorization = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  connectedAt: string;
  scope?: unknown;
};

type EncryptedAuthorization = {
  v: 1;
  iv: string;
  tag: string;
  data: string;
};

const AUTHORIZATION_PATH = "etsy/authorization.json";
const TOKEN_URL = "https://api.etsy.com/v3/public/oauth/token";
const API_BASE_URL = "https://openapi.etsy.com/v3/application";

function encryptionKey() {
  const value = process.env.ETSY_TOKEN_ENCRYPTION_KEY;
  if (!value) throw new Error("Missing Etsy token encryption key");
  const key = Buffer.from(value, "base64");
  if (key.length !== 32) throw new Error("Invalid Etsy token encryption key");
  return key;
}

function encrypt(value: StoredAuthorization) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  return JSON.stringify({
    v: 1,
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    data: ciphertext.toString("base64url"),
  } satisfies EncryptedAuthorization);
}

function decrypt(value: string) {
  const payload = JSON.parse(value) as EncryptedAuthorization;
  if (payload.v !== 1 || !payload.iv || !payload.tag || !payload.data) {
    throw new Error("Invalid encrypted Etsy authorization");
  }
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(payload.iv, "base64url"));
  decipher.setAuthTag(Buffer.from(payload.tag, "base64url"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.data, "base64url")),
    decipher.final(),
  ]);
  return JSON.parse(plaintext.toString("utf8")) as StoredAuthorization;
}

async function loadAuthorization() {
  const result = await get(AUTHORIZATION_PATH, { access: "private", useCache: false });
  if (!result) throw new Error("Etsy is not connected");
  return decrypt(await new Response(result.stream).text());
}

async function saveAuthorization(authorization: StoredAuthorization) {
  await put(AUTHORIZATION_PATH, encrypt(authorization), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function currentAuthorization() {
  const authorization = await loadAuthorization();
  if (authorization.expiresAt > Date.now() + 5 * 60_000) return authorization;

  const clientId = process.env.ETSY_API_KEY;
  if (!clientId) throw new Error("Missing Etsy API key");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: authorization.refreshToken,
  });
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error("Etsy token refresh failed");
  const token = (await response.json()) as Record<string, unknown>;
  if (typeof token.access_token !== "string" || typeof token.refresh_token !== "string") {
    throw new Error("Etsy returned an incomplete refresh token");
  }
  const refreshed: StoredAuthorization = {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + (typeof token.expires_in === "number" ? token.expires_in * 1000 : 3_600_000),
    connectedAt: authorization.connectedAt,
    scope: token.scope ?? authorization.scope,
  };
  await saveAuthorization(refreshed);
  return refreshed;
}

/**
 * Server-only Etsy API caller. Keep this behind authenticated server routes or
 * server actions; never expose the returned access token to the browser.
 */
export async function etsyRequest(path: string, init: RequestInit = {}) {
  const apiKey = process.env.ETSY_API_KEY;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;
  if (!apiKey || !sharedSecret) throw new Error("Missing Etsy API credentials");

  const authorization = await currentAuthorization();
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      accept: "application/json",
      "x-api-key": `${apiKey}:${sharedSecret}`,
      authorization: `Bearer ${authorization.accessToken}`,
      ...init.headers,
    },
  });
}
