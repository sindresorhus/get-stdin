import {serial as test} from 'ava';
import delay from 'delay';
import getStdin from '.';

test('get stdin', async t => {
	process.stdin.isTTY = false;

	const promise = getStdin.buffer();
	process.stdin.push(Buffer.from('uni'));
	process.stdin.push(Buffer.from('corns'));
	await delay(1);
	process.stdin.emit('end');

	const data = await promise;
	t.true(data.equals(Buffer.from('unicorns')));
	t.is(data.toString(), 'unicorns');
});

test('get empty buffer when no stdin', async t => {
	process.stdin.isTTY = true;
	t.true((await getStdin.buffer()).equals(Buffer.from('')));
});
