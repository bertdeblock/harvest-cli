import dotenv from 'dotenv';
import { join } from 'path';
import { env } from 'process';
import { fileURLToPath } from 'url';

dotenv.config({
  path: join(fileURLToPath(new URL('.', import.meta.url)), '..', '.env'),
});

export default {
  HARVEST_ACCOUNT_ID: env.HARVEST_ACCOUNT_ID,
  HARVEST_PAT: env.HARVEST_PAT,
  HARVEST_URL: env.HARVEST_URL,
};
