import test from 'ava';
import bufferEquals from 'buffer-equals';
import fn from './';

test.beforeEach(() => {
	process.stdin.removeAllListeners();
});

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
	t.plan(2);
	process.stdin.isTTY = false;
	const promise = fn.buffer().then(data => {
		t.true(bufferEquals(data, new Buffer('unicorns-foobar')));
		t.is(data.toString().trim(), 'unicorns-foobar');
	});

	process.stdin.push('unicorns');
	process.stdin.push(new Buffer('-foobar'));
	process.stdin.emit('end');

	return promise;
});

test.serial('get empty buffer when no stdin', async t => {
	process.stdin.isTTY = true;

	t.true(bufferEquals(await fn.buffer(), new Buffer('')));
});
