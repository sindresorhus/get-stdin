import test from 'ava';
import bufferEquals from 'buffer-equals';
import fn from './';

test.serial('get stdin', async t => {
	process.stdin.isTTY = false;

	setImmediate(() => {
		process.stdin.push('unicorns');
		process.stdin.emit('end');
	});

	t.is((await fn()).trim(), 'unicorns');
});

test.serial('get empty string when no stdin', async t => {
	process.stdin.isTTY = true;
	t.is(await fn(), '');
});

test.serial('get stdin as a buffer', t => {
	process.stdin.isTTY = false;

	const promise = fn.buffer(data => {
		t.true(bufferEquals(data, new Buffer('unicorns')));
		t.is(data.toString().trim(), 'unicorns');
	});

	process.stdin.push(new Buffer('unicorns'));
	process.stdin.emit('end');

	return promise;
});

test.serial('get empty buffer when no stdin', async t => {
	process.stdin.isTTY = true;

	t.true(bufferEquals(await fn.buffer(), new Buffer('')));
});
