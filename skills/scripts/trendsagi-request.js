'use strict';

const {
  parseArgs,
  parseBoolean,
  parseQueryArgs,
  requestJson,
  printJson
} = require('./_client');

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const method = String(args.method || 'GET').toUpperCase();
  const path = args.path;
  const query = parseQueryArgs(args.query);

  let body;
  if (args['body-json']) {
    try {
      body = JSON.parse(args['body-json']);
    } catch (err) {
      throw new Error('Invalid JSON supplied to --body-json');
    }
  }

  const pretty = args.pretty === undefined ? true : parseBoolean(args.pretty);
  const data = await requestJson({ method, path, query, body });
  printJson(data, pretty);
}

main().catch((err) => {
  console.error(err.message || String(err));
  process.exit(1);
});
