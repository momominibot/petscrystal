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

# Find node without depending on the caller's PATH.
#
# node here comes from fnm, which puts it in a per-shell directory
# (~/.local/state/fnm_multishells/<pid>_<ts>/bin). That path only exists in a
# shell where fnm has initialised, so a fresh Terminal tab — or any script run
# from an editor or a GUI — gets "node: command not found". Fall back to fnm's
# default alias, then to Homebrew.
find_node() {
  if command -v node >/dev/null 2>&1; then command -v node; return; fi
  local d="$HOME/.local/share/fnm/aliases/default/bin/node"
  if [[ -x "$d" ]]; then echo "$d"; return; fi
  local newest
  newest="$(ls -d "$HOME"/.local/share/fnm/node-versions/*/installation/bin/node 2>/dev/null | sort -V | tail -1)"
  if [[ -n "$newest" && -x "$newest" ]]; then echo "$newest"; return; fi
  for p in /opt/homebrew/bin/node /usr/local/bin/node; do
    [[ -x "$p" ]] && { echo "$p"; return; }
  done
  return 1
}

NODE="$(find_node)" || {
  echo "Could not find node on this machine." >&2
  echo "  Install it, or open a Terminal where 'node -v' works and retry." >&2
  exit 1
}
echo "node: $NODE ($("$NODE" -v))"

DRY=false
for a in "$@"; do [[ "$a" == "--dry" ]] && DRY=true; done

if [[ "$DRY" == true ]]; then
  # A dry run never calls Stripe, so do not ask for a secret it will not use.
  echo "Dry run — no key needed."
  exec "$NODE" scripts/stripe-sync.mjs "$@"
fi

if [[ -n "${STRIPE_SECRET_KEY:-}" ]]; then
  echo "Using STRIPE_SECRET_KEY already in the environment."
elif grep -qs '^STRIPE_SECRET_KEY=' .env.local; then
  # .env.local is gitignored (.env*), so the key stays on this machine and
  # never reaches a commit. Read, don't print.
  STRIPE_SECRET_KEY="$(grep '^STRIPE_SECRET_KEY=' .env.local | head -1 | cut -d= -f2- | tr -d '"'"'"' \r')"
  export STRIPE_SECRET_KEY
  echo "Using STRIPE_SECRET_KEY from .env.local (${#STRIPE_SECRET_KEY} chars, ${STRIPE_SECRET_KEY:0:8}…)."
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

"$NODE" scripts/stripe-sync.mjs "$@"
