if [ "$NODE_ENV" = "production" ]; then
  echo "Production enable"
else
  husky install && npx ts-node ./tools/scripts/env-generator.ts
  ngcc --properties es2020 browser module main
fi
