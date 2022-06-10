#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import cancel from '../lib/commands/cancel.js';
import last from '../lib/commands/last.js';
import start from '../lib/commands/start.js';
import stop from '../lib/commands/stop.js';

yargs(hideBin(process.argv))
  .command({
    command: 'cancel',
    handler: cancel,
  })
  .command({
    command: 'last',
    handler: last,
  })
  .command({
    command: 'start',
    handler: start,
  })
  .command({
    command: 'stop',
    handler: stop,
  })
  .demandCommand()
  .strict().argv;
