import fetch from 'node-fetch';
import config from './config.js';

export async function harvestFetch(endpoint, { body = {}, method = 'GET' } = {}) {
  const url = `https://api.harvestapp.com/v2${endpoint}`;

  const headers = {
    Authorization: `Bearer ${config.HARVEST_PAT}`,
    'Harvest-Account-Id': config.HARVEST_ACCOUNT_ID,
  };

  const options = {
    headers,
    method,
  };

  if (method === 'POST') {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, options);

  return response.json();
}

export function error(message) {
  log(`❗ ${message}`);
}

export function log(message = '') {
  console.log(`[Harvest CLI] ${message}`);
}
