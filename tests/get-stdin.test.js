import {PassThrough} from 'node:stream';
import assert from 'node:assert/strict';
import test from 'node:test';
import delay from 'delay';
import getStdin from '../index.js';

const textEncoder = new TextEncoder();

test('get stdin', async () => {
	const inputStream = new PassThrough();
	const promise = getStdin({stdin: inputStream});
	inputStream.write('uni');
	inputStream.end('corns');

	const value = await promise;
	assert.equal(value.trim(), 'unicorns');
});

test('get stdin resolves empty for TTY by default', async () => {
	const inputStream = new PassThrough();
	inputStream.isTTY = true;

	const outcome = await Promise.race([
		(async () => {
			const value = await getStdin({stdin: inputStream});
			return {status: 'resolved', value};
		})(),
		(async () => {
			await delay(50);
			return {status: 'timeout'};
		})(),
	]);

	assert.equal(outcome.status, 'resolved');
	assert.equal(outcome.value, '');
});

test('get stdin reads from TTY when allowTTY is true', async () => {
	const inputStream = new PassThrough();
	inputStream.isTTY = true;

	const promise = getStdin({stdin: inputStream, allowTTY: true});
	inputStream.write('uni');
	inputStream.end('corns');

	const value = await promise;
	assert.equal(value.trim(), 'unicorns');
});

test('get stdin ignores UTF-8 BOM in string streams', async () => {
	const inputStream = new PassThrough();
	const promise = getStdin({stdin: inputStream});
	inputStream.end('\uFEFFunicorns');

	const value = await promise;
	assert.equal(value, 'unicorns');
});

test('get stdin ignores UTF-8 BOM in byte streams', async () => {
	const inputStream = new PassThrough();
	const promise = getStdin({stdin: inputStream});
	inputStream.end(textEncoder.encode('\uFEFFunicorns'));

	const value = await promise;
	assert.equal(value, 'unicorns');
});

test('get stdin as Uint8Array', async () => {
	const inputStream = new PassThrough();
	const promise = getStdin.buffer({stdin: inputStream});
	inputStream.write(textEncoder.encode('uni'));
	inputStream.end(textEncoder.encode('corns'));

	const data = await promise;
	const expected = textEncoder.encode('unicorns');

	assert.equal(data.constructor, Uint8Array);
	assert.deepEqual(data, expected);
});

test('get stdin Uint8Array reads from TTY when allowTTY is true', async () => {
	const inputStream = new PassThrough();
	inputStream.isTTY = true;

	const promise = getStdin.buffer({stdin: inputStream, allowTTY: true});
	inputStream.write(textEncoder.encode('uni'));
	inputStream.end(textEncoder.encode('corns'));

	const data = await promise;
	const expected = textEncoder.encode('unicorns');

	assert.equal(data.constructor, Uint8Array);
	assert.deepEqual(data, expected);
});

test('get stdin Uint8Array preserves UTF-8 BOM', async () => {
	const inputStream = new PassThrough();
	const promise = getStdin.buffer({stdin: inputStream});
	const expected = textEncoder.encode('\uFEFFunicorns');
	inputStream.end(expected);

	const data = await promise;

	assert.equal(data.constructor, Uint8Array);
	assert.deepEqual(data, expected);
});
