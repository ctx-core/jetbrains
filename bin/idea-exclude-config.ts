#!/usr/bin/env node
require = require('esm')(module)
const { _excludeFolder_a1 } = require('../_excludeFolder_a1')
idea_exclude_config_bin().then()
async function idea_exclude_config_bin() {
	const excludeFolder_a1 = await _excludeFolder_a1()
	console.info(excludeFolder_a1.join('\n'))
}
