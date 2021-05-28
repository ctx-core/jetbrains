#!/usr/bin/env node
'use strict'
require = require('esm')(module)
const { _excludeFolder_a1 } = require('../dist')
idea_exclude_config_bin().then()
async function idea_exclude_config_bin() {
	const excludeFolder_a1 = await _excludeFolder_a1()
	console.info(excludeFolder_a1.join('\n'))
}
