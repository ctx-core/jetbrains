import { param_r_ } from '@ctx-core/cli-args'
import { last_ } from 'ctx-core/array'
import { queue_ } from 'ctx-core/queue'
import { readFile } from 'fs/promises'
import { globby } from 'globby'
import { dirname } from 'path'
/**
 * @returns {Promise<string[]>}
 */
export async function excludeFolder_a_() {
	/** @type {string[]} */
	const ideaexclude_path_a = await globby('**/.ideaexclude', {
		gitignore: true
	})
	const excludeFolder_a = []
	const param_r = param_r_(process.argv.slice(2), {
		indent_a: '-i, --indent'
	})
	const {
		indent_a = [
			''
		]
	} = param_r
	const queue = queue_(8)
	ideaexclude_path_a.map(($)=>{
		queue.add(async ()=>{
			const dir = dirname($)
			const buffer = await readFile($).then(($)=>$.toString())
			const txt = buffer.toString().trim()
			const entry_a = txt.split('\n').filter((v)=>!!v)
			entry_a.forEach((entry)=>{
				excludeFolder_a.push(dir === '.' ? `${last_(indent_a)}<excludeFolder url="file://$MODULE_DIR$/${entry}" />` : `${last_(indent_a)}<excludeFolder url="file://$MODULE_DIR$/${dir}/${entry}" />`)
			})
		})
	})
	await queue.close()
	return excludeFolder_a.sort()
}
export { excludeFolder_a_ as excludeFolder_a1_, }
