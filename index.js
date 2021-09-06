#!/usr/bin/env node
const { program } = require('commander');
const { helpOptions } = require('./lib/core/helper')
const createCommands = require('./lib/core/create')

program.version(require('./package.json').version);

// 增加自己options
helpOptions()
// create commands
createCommands()

program.parse(process.argv)
const options = program.opts()