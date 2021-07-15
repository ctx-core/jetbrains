import globby from 'globby'
import fs from 'fs'
import { dirname } from 'path'
import { param_r_ } from '@ctx-core/cli-args'
import { queue_ } from '@ctx-core/queue'
export async function excludeFolder_a_():Promise<string[]> {
	const ideaexclude_path_a = await globby(
		'**/.ideaexclude',
		{ gitignore: true }
	)
	const excludeFolder_a = [] as string[]
	const param_r = param_r_(process.argv.slice(2), {
		indent: '-i, --indent',
	})
	const { indent = '' } = param_r
	const queue = queue_(8)
	await Promise.all(
		ideaexclude_path_a.map(async ideaexclude_path=>{
			await queue.add(
				async ()=>{
					const dir = dirname(ideaexclude_path)
					const buffer = await fs.promises.readFile(ideaexclude_path)
					const txt = buffer.toString().trim()
					const entry_a = txt.split('\n').filter(v=>!!v)
					entry_a.forEach(entry=>{
						excludeFolder_a.push(
							dir === '.'
							? `${indent}<excludeFolder url="file://$MODULE_DIR$/${entry}" />`
							: `${indent}<excludeFolder url="file://$MODULE_DIR$/${dir}/${entry}" />`
						)
					})
				})
		})
	)
	return excludeFolder_a.sort()
}
export {
	excludeFolder_a_ as excludeFolder_a1_,
}
