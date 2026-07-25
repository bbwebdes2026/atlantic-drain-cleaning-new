#!/usr/bin/env bash
# Blocks git push if the build, typecheck, or lint fails.
set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0

LOG="$(mktemp)"
FAILED=""

run_step () {
  if ! npm run "$1" --if-present >>"$LOG" 2>&1; then
    FAILED="$1"
    return 1
  fi
}

run_step build     || true
[ -z "$FAILED" ] && { run_step typecheck || true; }
[ -z "$FAILED" ] && { run_step lint      || true; }

if [ -n "$FAILED" ]; then
  {
    echo "PUSH BLOCKED — '$FAILED' failed. Fix this before pushing."
    echo "--- last 40 lines ---"
    tail -n 40 "$LOG"
  } >&2
  exit 2
fi

exit 0
