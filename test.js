import {PassThrough} from 'node:stream';
import test from 'ava';
import delay from 'delay';
import getStdin from './index.js';

test('get stdin', async t => {
	const stdin = new PassThrough();
	const promise = getStdin({stdin});
	stdin.write('uni');
	stdin.end('corns');

	t.is((await promise).trim(), 'unicorns');
});

test('get stdin resolves empty for TTY by default', async t => {
	const stdin = new PassThrough();
	stdin.isTTY = true;

	const outcome = await Promise.race([
		getStdin({stdin}).then(value => ({status: 'resolved', value})),
		delay(50).then(() => ({status: 'timeout'})),
	]);

	t.is(outcome.status, 'resolved');
	t.is(outcome.value, '');
});

test('get stdin reads from TTY when allowTTY is true', async t => {
	const stdin = new PassThrough();
	stdin.isTTY = true;

	const promise = getStdin({stdin, allowTTY: true});
	stdin.write('uni');
	stdin.end('corns');

	t.is((await promise).trim(), 'unicorns');
});
