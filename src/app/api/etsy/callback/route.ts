import { createCipheriv, randomBytes } from "crypto";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type OAuthCookie = { state: string; verifier: string; redirectUri: string };

function encryptionKey() {
  const value = process.env.ETSY_TOKEN_ENCRYPTION_KEY;
  if (!value) throw new Error("Missing Etsy token encryption key");
  const key = Buffer.from(value, "base64");
  if (key.length !== 32) throw new Error("Invalid Etsy token encryption key");
  return key;
}

function encrypt(value: object) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const plaintext = Buffer.from(JSON.stringify(value), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return JSON.stringify({
    v: 1,
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    data: ciphertext.toString("base64url"),
  });
}

export async function GET(request: NextRequest) {
  const clearCookie = (response: NextResponse) => {
    response.cookies.set("etsy_oauth", "", { path: "/api/etsy/callback", maxAge: 0 });
    return response;
  };

  const etsyError = request.nextUrl.searchParams.get("error");
  if (etsyError) {
    return clearCookie(NextResponse.json({ error: "Etsy authorization was cancelled" }, { status: 400 }));
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const rawCookie = request.cookies.get("etsy_oauth")?.value;
  if (!code || !state || !rawCookie) {
    return clearCookie(NextResponse.json({ error: "Authorization session is missing or expired" }, { status: 400 }));
  }

  let session: OAuthCookie;
  try {
    session = JSON.parse(rawCookie) as OAuthCookie;
  } catch {
    return clearCookie(NextResponse.json({ error: "Authorization session is invalid" }, { status: 400 }));
  }
  if (session.state !== state) {
    return clearCookie(NextResponse.json({ error: "Authorization state did not match" }, { status: 400 }));
  }

  const clientId = process.env.ETSY_API_KEY;
  if (!clientId) {
    return clearCookie(NextResponse.json({ error: "Etsy is not configured" }, { status: 503 }));
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: session.redirectUri,
    code,
    code_verifier: session.verifier,
  });
  const tokenResponse = await fetch("https://api.etsy.com/v3/public/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenResponse.ok) {
    return clearCookie(NextResponse.json({ error: "Etsy did not issue a token" }, { status: 502 }));
  }

  const token = (await tokenResponse.json()) as Record<string, unknown>;
  if (typeof token.refresh_token !== "string" || typeof token.access_token !== "string") {
    return clearCookie(NextResponse.json({ error: "Etsy returned an incomplete token" }, { status: 502 }));
  }

  await put("etsy/authorization.json", encrypt({
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + (typeof token.expires_in === "number" ? token.expires_in * 1000 : 3600000),
    connectedAt: new Date().toISOString(),
    scope: token.scope,
  }), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });

  return clearCookie(NextResponse.json({ connected: true }));
}
