import test from 'ava';
import delay from 'delay';
import getStdin from './index.js';

test.serial('get stdin', async t => {
	process.stdin.isTTY = false;
	const promise = getStdin();

	process.stdin.push('uni');
	process.stdin.push('corns'); // eslint-disable-line unicorn/no-array-push-push
	await delay(1);
	process.stdin.emit('end');

	t.is((await promise).trim(), 'unicorns');
});

test.serial('get empty string when no stdin', async t => {
	process.stdin.isTTY = true;
	t.is(await getStdin(), '');
});
