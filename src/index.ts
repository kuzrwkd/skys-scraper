#!/usr/bin/env node

import 'reflect-metadata';
import yargs from 'yargs';

import NewsfeedCrawlerCommand from '@/command/NewsfeedCrawlerCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(new NewsfeedCrawlerCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
