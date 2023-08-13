#!/usr/bin/env node

import 'reflect-metadata';
import yargs from 'yargs';
import CrawlerCommand from '@/commands/CrawlerCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <commands> [options]')
  .command(new CrawlerCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
