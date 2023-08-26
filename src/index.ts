#!/usr/bin/env node

import 'reflect-metadata';
import yargs from 'yargs';
import NewsfeedJobCommand from '@/commands/NewsfeedJobCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <commands> [options]')
  .command(new NewsfeedJobCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
