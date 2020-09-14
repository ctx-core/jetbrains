#!/usr/bin/env node
require = require('esm')(module)
const { promisify } = require('util')
const globby = require('globby')
const fs = require('fs')
const { dirname } = require('path')
const { _param_h } = require('@ctx-core/cli-args')
const readFile = promisify(fs.readFile)
main().then()
async function main() {
	const ideaexclude_path_a1 = await globby('**/.ideaexclude', { gitignore: true })
	const excludeFolder_a1 = []
	const param_h = _param_h(process.argv.slice(2), {
		indent: '-i, --indent',
	})
	const { indent = '' } = param_h
	await Promise.all(
		ideaexclude_path_a1.map(async ideaexclude_path => {
			const dir = dirname(ideaexclude_path)
			const buffer = await readFile(ideaexclude_path)
			const txt = buffer.toString().trim()
			const entry_a1 = txt.split('\n').filter(v => !!v)
			entry_a1.forEach(entry => {
				excludeFolder_a1.push(
					dir === '.'
					? `${indent}<excludeFolder url="file://$MODULE_DIR$/${entry}" />`
					: `${indent}<excludeFolder url="file://$MODULE_DIR$/${dir}/${entry}" />`
				)
			})
		})
	)
	console.info(excludeFolder_a1.sort().join('\n'))
}
