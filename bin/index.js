#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import cancel from '../lib/commands/cancel.js';
import last from '../lib/commands/last.js';
import open from '../lib/commands/open.js';
import start from '../lib/commands/start.js';
import stop from '../lib/commands/stop.js';

yargs(hideBin(process.argv))
  .command({
    command: 'cancel',
    handler: cancel,
  })
  .command({
    command: 'last [amount]',
    handler: last,
    builder: (yargs) =>
      yargs.positional('amount', {
        default: 1,
        type: 'number',
      }),
  })
  .command({
    command: 'open',
    handler: open,
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
