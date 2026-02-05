'use strict';

const DEFAULT_BASE_URL = 'https://api.trendsagi.com';

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token || !token.startsWith('--')) {
      continue;
    }
    const key = token.slice(2);
    let value = true;
    if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
      value = argv[i + 1];
      i += 1;
    }
    if (args[key] === undefined) {
      args[key] = value;
    } else if (Array.isArray(args[key])) {
      args[key].push(value);
    } else {
      args[key] = [args[key], value];
    }
  }
  return args;
}

function parseBoolean(value) {
  if (value === true) return true;
  if (value === false) return false;
  if (value === undefined || value === null) return false;
  const normalized = String(value).trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['false', '0', 'no', 'n', 'off'].includes(normalized)) return false;
  return Boolean(normalized);
}

function buildUrl(path, queryParams) {
  const baseUrl = process.env.TRENDSAGI_BASE_URL || DEFAULT_BASE_URL;
  const normalizedPath = path.startsWith('http') ? path : (path.startsWith('/') ? path : `/${path}`);
  const url = new URL(normalizedPath, baseUrl);

  if (queryParams && typeof queryParams === 'object') {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, String(item)));
      } else {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url;
}

async function requestJson({ method = 'GET', path, query, body }) {
  const apiKey = process.env.TRENDSAGI_API_KEY;
  if (!apiKey) {
    throw new Error('TRENDSAGI_API_KEY is missing. Set it in your environment before running this script.');
  }

  if (!path) {
    throw new Error('Request path is required.');
  }

  const url = buildUrl(path, query);
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/json'
  };

  const options = { method, headers };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (err) {
      data = text;
    }
  }

  if (!response.ok) {
    const detail = (data && typeof data === 'object' && data.detail) ? data.detail : text;
    const error = new Error(`Request failed (${response.status}): ${detail || 'Unknown error'}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function printJson(data, pretty = true) {
  if (typeof data === 'string') {
    console.log(data);
    return;
  }
  const indent = pretty ? 2 : 0;
  console.log(JSON.stringify(data, null, indent));
}

function parseQueryArgs(queryArgs) {
  const query = {};
  if (!queryArgs) return query;
  const list = Array.isArray(queryArgs) ? queryArgs : [queryArgs];
  list.forEach((pair) => {
    const [rawKey, ...rest] = String(pair).split('=');
    const key = rawKey.trim();
    const value = rest.join('=').trim();
    if (!key) return;
    if (query[key] === undefined) {
      query[key] = value;
    } else if (Array.isArray(query[key])) {
      query[key].push(value);
    } else {
      query[key] = [query[key], value];
    }
  });
  return query;
}

module.exports = {
  parseArgs,
  parseBoolean,
  parseQueryArgs,
  requestJson,
  printJson
};
