'use strict';

const {
  parseArgs,
  parseBoolean,
  requestJson,
  printJson
} = require('./_client');

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const trendId = args['trend-id'];

  if (!trendId) {
    throw new Error('Missing required argument: --trend-id');
  }

  const forceRefresh = args['force-refresh'] !== undefined
    ? parseBoolean(args['force-refresh'])
    : false;

  const data = await requestJson({
    method: 'POST',
    path: `/api/trends/${encodeURIComponent(trendId)}/analyze`,
    body: { force_refresh: forceRefresh }
  });

  printJson(data, true);
}

main().catch((err) => {
  console.error(err.message || String(err));
  process.exit(1);
});
