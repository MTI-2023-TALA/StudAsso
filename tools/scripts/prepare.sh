if [ "$NODE_ENV" = "production" ]; then
  echo "Production enable"
else
  if [ "$NODE_ENV" = "build-stage" ]; then
    echo "Build Stage enable"
  else
    echo "Development enable"
  fi
  husky install && npx ts-node ./tools/scripts/env-generator.ts
  ngcc --properties es2020 browser module main
fi
