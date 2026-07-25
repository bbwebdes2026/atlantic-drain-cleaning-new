#!/usr/bin/env bash
# Blocks git push if the build, typecheck, or lint fails.
set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0

LOG="$(mktemp)"
FAILED=""

# stdin is redirected from /dev/null so a misconfigured tool that drops into an
# interactive prompt (e.g. `next lint` with no ESLint config) can't hang the hook.
run_step () {
  if ! npm run "$1" --if-present >>"$LOG" 2>&1 </dev/null; then
    FAILED="$1"
    return 1
  fi
}

# True only when ESLint is actually configured. Without a config, `next lint`
# launches its interactive setup wizard rather than failing — that's an absent
# linter, not a lint failure, so we skip it (same spirit as --if-present). Once
# an ESLint config lands, this returns true and lint gates for real.
has_eslint_config () {
  ls eslint.config.* .eslintrc .eslintrc.* >/dev/null 2>&1 && return 0
  grep -q '"eslintConfig"' package.json 2>/dev/null && return 0
  return 1
}

run_step build     || true
[ -z "$FAILED" ] && { run_step typecheck || true; }
if [ -z "$FAILED" ]; then
  if has_eslint_config; then
    run_step lint || true
  else
    echo "SKIP lint — no ESLint config (next lint would launch interactive setup)." >>"$LOG"
  fi
fi

if [ -n "$FAILED" ]; then
  {
    echo "PUSH BLOCKED — '$FAILED' failed. Fix this before pushing."
    echo "--- last 40 lines ---"
    tail -n 40 "$LOG"
  } >&2
  exit 2
fi

exit 0
