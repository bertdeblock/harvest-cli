import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { join } from 'path';
import { env } from 'process';
import { fileURLToPath } from 'url';

dotenv.config({
  path: join(fileURLToPath(new URL('.', import.meta.url)), '..', '.env'),
});

export async function harvestFetch(endpoint, { body = {}, method = 'GET' } = {}) {
  const url = `https://api.harvestapp.com/v2${endpoint}`;

  const headers = {
    Authorization: `Bearer ${env.HARVEST_PAT}`,
    'Harvest-Account-Id': env.HARVEST_ACCOUNT_ID,
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

export function log(message) {
  console.log(`[Harvest CLI] ${message}`);
}
