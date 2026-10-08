#!/usr/bin/env bash
# Run a command inside a pinned Node container — the host's Node may be older
# than Vite/Tailwind require (>= 20.19), so Docker is the only toolchain needed.
# Files are written as the host user so the repo stays owned by you, and the
# npm cache persists in .cache/npm between runs.
#
# Usage: scripts/node.sh npm ci
#        scripts/node.sh npm run build
set -euo pipefail
cd "$(dirname "$0")/.."

NODE_IMAGE="${NODE_IMAGE:-node:22-bookworm-slim}"
mkdir -p .cache/npm

port_args=()
if [[ -n "${NODE_PUBLISH:-}" ]]; then
  port_args=(-p "$NODE_PUBLISH")
fi

# Forward VITE_* variables (deploy.sh injects the hashed CV filenames).
env_args=()
while IFS= read -r name; do
  case "$name" in
    VITE_*) env_args+=(-e "$name") ;;
  esac
done < <(compgen -e)

exec docker run --rm \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -e npm_config_cache=/cache/npm \
  -e npm_config_update_notifier=false \
  -v "$PWD":/work \
  -v "$PWD/.cache/npm":/cache/npm \
  -w /work \
  "${port_args[@]}" \
  "${env_args[@]}" \
  "$NODE_IMAGE" "$@"
