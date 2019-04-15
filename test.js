import {serial as test} from 'ava';
import delay from 'delay';
import getStdin from '.';

test('get stdin', async t => {
	process.stdin.isTTY = false;
	const promise = getStdin();

	process.stdin.push('uni');
	process.stdin.push('corns');
	await delay(1);
	process.stdin.emit('end');

	t.is((await promise).trim(), 'unicorns');
});

test('get empty string when no stdin', async t => {
	process.stdin.isTTY = true;
	t.is(await getStdin(), '');
});
