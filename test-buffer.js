import {PassThrough} from 'node:stream';
import test from 'ava';
import getStdin from './index.js';

test('get stdin as buffer', async t => {
	const stdin = new PassThrough();
	const promise = getStdin.buffer({stdin});
	stdin.write(Buffer.from('uni'));
	stdin.end(Buffer.from('corns'));

	const data = await promise;
	t.true(data.equals(Buffer.from('unicorns')));
	t.is(data.toString(), 'unicorns');
});

test('get stdin buffer reads from TTY when allowTTY is true', async t => {
	const stdin = new PassThrough();
	stdin.isTTY = true;

	const promise = getStdin.buffer({stdin, allowTTY: true});
	stdin.write(Buffer.from('uni'));
	stdin.end(Buffer.from('corns'));

	const data = await promise;
	t.true(data.equals(Buffer.from('unicorns')));
});
