import { createHash, randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CALLBACK_PATH = "/api/etsy/callback";
const SCOPES = ["shops_r", "listings_r", "listings_w"];

function baseUrl(request: NextRequest) {
  const configured = process.env.ETSY_CALLBACK_ORIGIN;
  if (configured) return configured.replace(/\/$/, "");
  return request.nextUrl.origin;
}

function urlSafeRandom(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export async function GET(request: NextRequest) {
  const clientId = process.env.ETSY_API_KEY;
  if (!clientId) {
    return NextResponse.json({ error: "Etsy is not configured" }, { status: 503 });
  }

  const state = urlSafeRandom();
  const verifier = urlSafeRandom(48);
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const redirectUri = `${baseUrl(request)}${CALLBACK_PATH}`;

  const authorize = new URL("https://www.etsy.com/oauth/connect");
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", redirectUri);
  authorize.searchParams.set("scope", SCOPES.join(" "));
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("code_challenge", challenge);
  authorize.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authorize);
  response.cookies.set("etsy_oauth", JSON.stringify({ state, verifier, redirectUri }), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 10 * 60,
    path: CALLBACK_PATH,
  });
  return response;
}
