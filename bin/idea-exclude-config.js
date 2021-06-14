#!/usr/bin/env node
'use strict'
require = require('esm')(module)
const { excludeFolder_a_ } = require('../src')
idea_exclude_config_bin().then()
async function idea_exclude_config_bin() {
	const excludeFolder_a = await excludeFolder_a_()
	console.info(excludeFolder_a.join('\n'))
}
