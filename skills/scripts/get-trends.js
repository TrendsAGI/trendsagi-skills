'use strict';

const {
  parseArgs,
  requestJson,
  printJson
} = require('./_client');

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const query = {};
  if (args.limit) query.limit = args.limit;
  if (args.period) query.period = args.period;
  if (args['sort-by']) query.sort_by = args['sort-by'];
  if (args['sort-dir']) query.sort_dir = args['sort-dir'];
  if (args.interests) query.interests = args.interests;

  const data = await requestJson({
    method: 'GET',
    path: '/api/trends',
    query
  });

  printJson(data, true);
}

main().catch((err) => {
  console.error(err.message || String(err));
  process.exit(1);
});
