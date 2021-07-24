import { readFileSync } from 'fs';
import { join } from 'path';
import { yarnDedupe } from '@yarn-tool/yarnlock-dedupe';
import { readFile, writeFile } from 'fs/promises';
import { findRootLazy } from '@yarn-tool/find-root';

export async function autoDeduplication(cwd?: string)
{
	const rootData = findRootLazy({
		cwd,
	});
	if (rootData?.root)
	{
		const file = join(rootData.root, 'yarn.lock');

		return readFile(file, 'utf-8')
			.then(async (data) => {

				let ret = yarnDedupe(data);

				if (ret.yarnlock_changed)
				{
					await writeFile(file, ret.yarnlock_new);
				}

				return {
					...ret,
					rootData,
					file,
				}
			})
	}
}

