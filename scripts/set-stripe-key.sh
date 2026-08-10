#!/usr/bin/env bash
# Point the deployed site at the same Stripe account the price sync used.
#
#   ./scripts/set-stripe-key.sh            # swap the key on Vercel + redeploy
#   ./scripts/set-stripe-key.sh --check    # validate only, change nothing
#
# Exists because the two halves of checkout drifted apart: sync-prices.sh
# wrote 77 prices into one Stripe account, while Vercel held a test-mode key
# for a different one, so every checkout died with "No such price". This
# script closes the gap without the key ever appearing on screen, in shell
# history, or in a chat transcript — the same handling rule as sync-prices.sh.
#
# The key is validated by USE, not by looks: it must be able to fetch a price
# id that the site actually sells. Passing that proves account and mode in one
# call — a key from the wrong account, or the right account's test mode,
# cannot see a live price that sync-prices.sh created.
set -euo pipefail
cd "$(dirname "$0")/.."

# Any synced price would do; this is rainbow-spirit/pet from src/lib/prices.ts.
CANARY_PRICE="price_1TzAe94JAWFfqt5JoliCAooG"

if [[ -n "${STRIPE_SECRET_KEY:-}" ]]; then
  KEY="$STRIPE_SECRET_KEY"
  SRC="environment"
elif grep -qs '^STRIPE_SECRET_KEY=' .env.local; then
  KEY="$(grep '^STRIPE_SECRET_KEY=' .env.local | head -1 | cut -d= -f2- | tr -d '"'"'"' \r')"
  SRC=".env.local"
else
  # -s: no echo. The key never appears on screen or in history.
  read -rsp "Paste the Stripe secret key the price sync used: " KEY; echo
  SRC="prompt"
fi
echo "key: ${KEY:0:8}… (${#KEY} chars, from $SRC)"

case "$KEY" in
  sk_live_*) ;;
  sk_test_*) echo "That is a TEST key. Checkout would only accept test cards." >&2
             echo "Use the live key from the account sync-prices.sh wrote to." >&2
             exit 1 ;;
  *)         echo "That does not look like a Stripe secret key (sk_live_...)." >&2
             exit 1 ;;
esac

echo -n "canary: fetching $CANARY_PRICE … "
HTTP="$(curl -s -o /tmp/stripe-canary.json -w '%{http_code}' \
  -u "$KEY:" "https://api.stripe.com/v1/prices/$CANARY_PRICE")"
if [[ "$HTTP" != "200" ]]; then
  echo "FAILED (HTTP $HTTP)"
  # Stripe error messages name the problem without leaking the key.
  grep -o '"message": *"[^"]*"' /tmp/stripe-canary.json | head -1 >&2
  echo "This key cannot see the site's prices — wrong account. Nothing changed." >&2
  rm -f /tmp/stripe-canary.json
  exit 1
fi
rm -f /tmp/stripe-canary.json
echo "ok — this key sees the site's live prices."

if [[ "${1:-}" == "--check" ]]; then
  echo "Check only; Vercel untouched."
  exit 0
fi

echo "Replacing STRIPE_SECRET_KEY on Vercel (production)…"
npx vercel env rm STRIPE_SECRET_KEY production -y >/dev/null 2>&1 || true
printf '%s' "$KEY" | npx vercel env add STRIPE_SECRET_KEY production --sensitive >/dev/null
echo "Redeploying so the running functions pick it up…"
npx vercel --prod --yes >/dev/null 2>&1 || npx vercel --prod --yes >/dev/null

echo -n "Live checkout test: "
CODE="$(curl -s -o /tmp/checkout-test.json -w '%{http_code}' \
  -X POST https://petscrystals.com/api/checkout \
  -H 'Content-Type: application/json' \
  -d '{"items":[{"productId":"rainbow-spirit","variant":"set","quantity":1}]}')"
if [[ "$CODE" == "200" ]] && grep -q '"url"' /tmp/checkout-test.json; then
  echo "HTTP 200, Stripe session created. Checkout works."
else
  echo "HTTP $CODE — still failing; response:"
  cat /tmp/checkout-test.json; echo
fi
rm -f /tmp/checkout-test.json
