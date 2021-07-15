#!/usr/bin/env node
'use strict'
import { exclude_folder_a_ } from '../dist/index.js'
await idea_exclude_config_bin()
async function idea_exclude_config_bin() {
	const excludeFolder_a = await exclude_folder_a_()
	console.info(excludeFolder_a.join('\n'))
}
