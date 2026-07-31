#!/usr/bin/env bash
# Run the Stripe sync without the secret key ever touching your shell history,
# the process list, or a file on disk.
#
#   ./scripts/sync-prices.sh --dry     # show what would change
#   ./scripts/sync-prices.sh           # write it
#
# Why not `STRIPE_SECRET_KEY=sk_live_... node scripts/stripe-sync.mjs`?
# That line lands in ~/.zsh_history, and while it runs the key is visible to
# any other process on the machine via `ps eww`. Reading it into a variable
# and exporting it only for the child process avoids both.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -n "${STRIPE_SECRET_KEY:-}" ]]; then
  echo "Using STRIPE_SECRET_KEY already in the environment."
else
  # -s: do not echo. The key never appears on screen or in history.
  read -rsp "Stripe secret key (input hidden, then press return): " STRIPE_SECRET_KEY
  echo
  export STRIPE_SECRET_KEY
fi

if [[ -z "${STRIPE_SECRET_KEY}" ]]; then
  echo "No key given — nothing to do." >&2
  exit 1
fi

if [[ "${STRIPE_SECRET_KEY}" == sk_live_* ]]; then
  echo
  echo "  This is a LIVE key. Real prices on the real store."
  read -rp "  Type 'live' to continue: " confirm
  [[ "${confirm}" == "live" ]] || { echo "Cancelled."; exit 1; }
  echo
fi

node scripts/stripe-sync.mjs "$@"
