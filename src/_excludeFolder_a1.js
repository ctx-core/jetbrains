import globby from 'globby';
import fs from 'fs';
import { dirname } from 'path';
import { _param_h } from '@ctx-core/cli-args';
import { _queue } from '@ctx-core/queue';
export async function _excludeFolder_a1() {
    const ideaexclude_path_a1 = await globby('**/.ideaexclude', { gitignore: true });
    const excludeFolder_a1 = [];
    const param_h = _param_h(process.argv.slice(2), {
        indent: '-i, --indent',
    });
    const { indent = '' } = param_h;
    const queue = _queue(8);
    await Promise.all(ideaexclude_path_a1.map(async (ideaexclude_path) => {
        await queue.add(async () => {
            const dir = dirname(ideaexclude_path);
            const buffer = await fs.promises.readFile(ideaexclude_path);
            const txt = buffer.toString().trim();
            const entry_a1 = txt.split('\n').filter(v => !!v);
            entry_a1.forEach(entry => {
                excludeFolder_a1.push(dir === '.'
                    ? `${indent}<excludeFolder url="file://$MODULE_DIR$/${entry}" />`
                    : `${indent}<excludeFolder url="file://$MODULE_DIR$/${dir}/${entry}" />`);
            });
        });
    }));
    return excludeFolder_a1.sort();
}
