import * as core from '@actions/core'
import { autoDeduplication } from './fn';
import yarnLockDiff from '@yarn-tool/yarnlock-diff';

async function run(): Promise<void>
{
	try
	{
		core.debug(new Date().toTimeString())
		await autoDeduplication()
			.then(data => {
				if (data?.yarnlock_changed)
				{
					core.info('\n' + yarnLockDiff(data.yarnlock_old, data.yarnlock_new))
				}
				else if (!data?.file)
				{
					core.error(`yarn.lock not exists`)
				}

				core.setOutput('yarnlock_changed', !!data?.yarnlock_changed)
			})
		;
		core.debug(new Date().toTimeString())

		core.setOutput('time', new Date().toTimeString())
	}
	catch (error)
	{
		core.setFailed(error.message)
	}
}

export default run()