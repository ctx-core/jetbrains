#!/usr/bin/env node
'use strict'
require = require('esm')(module)
const { exclude_folder_a_ } = require('../dist')
idea_exclude_config_bin().then()
async function idea_exclude_config_bin() {
	const excludeFolder_a = await exclude_folder_a_()
	console.info(excludeFolder_a.join('\n'))
}
