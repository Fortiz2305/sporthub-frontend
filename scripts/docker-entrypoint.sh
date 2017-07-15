#!/bin/bash

export PATH="/app/node_modules/.bin:$PATH"

if [ ! -d "/app/node_modules" ]; then
  npm install
fi

exec "$@"


