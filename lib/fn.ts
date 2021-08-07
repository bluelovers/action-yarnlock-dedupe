import { join } from 'path';
import { yarnDedupe } from '@yarn-tool/yarnlock-dedupe';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { findRootLazy } from '@yarn-tool/find-root';

export async function autoDeduplication(cwd?: string)
{
	const rootData = findRootLazy({
		cwd,
	});
	if (rootData?.root)
	{
		const file = join(rootData.root, 'yarn.lock');

		if (existsSync(file))
		{
			const data = readFileSync(file, 'utf-8');

			let ret = yarnDedupe(data);

			if (ret.yarnlock_changed)
			{
				writeFileSync(file, ret.yarnlock_new);
			}

			return {
				...ret,
				rootData,
				file,
			}
		}

		return {
			rootData,
		} as null
	}
}

