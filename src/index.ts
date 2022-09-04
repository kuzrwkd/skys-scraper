#!/usr/bin/env node

import 'reflect-metadata';
import yargs from 'yargs';

import NikkeiCrawlerCommand from '@/command/NikkeiCrawlerCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(new NikkeiCrawlerCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
