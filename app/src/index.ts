#!/usr/bin/env node

import 'reflect-metadata';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import StartNewsfeedCrawlerCommand from '@/commands/StartNewsfeedCrawlerCommand';

const y = yargs(hideBin(process.argv));

y
  .locale('en')
  .usage('Usage: $0 <commands> [options]')
  .command(new StartNewsfeedCrawlerCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
