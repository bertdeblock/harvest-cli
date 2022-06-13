import openURL from 'open';
import config from '../config.js';

export default async function open() {
  await openURL(`${config.HARVEST_URL}time`);
}
