import test from 'ava';
import fn from './';
process.stdin.isTTY = true;

test.beforeEach(() => {
	process.stdin.removeAllListeners();
});

test.serial('get stdin in TTY mode with ^d', async t => {
	setImmediate(() => {
		process.stdin.push('unicorn');
		process.stdin.push('\u0004\n');
	});

	t.is(await fn({tty: true}), 'unicorn');
});

test.serial('get stdin in TTY mode with ^z', async t => {
	setImmediate(() => {
		process.stdin.push('unicorn');
		process.stdin.push('\u001a\n');
	});

	t.is(await fn({tty: true}), 'unicorn');
});

test.serial('get stdin in TTY mode using global tty', async t => {
	setImmediate(() => {
		process.stdin.push('unicorn');
		process.stdin.push('\u0004\n');
	});

	fn.tty = true;
	t.is(await fn(), 'unicorn');
});

test.serial('get empty string in non-TTY mode with option override', async t => {
	setImmediate(() => {
		process.stdin.push('unicorn111');
		process.stdin.push('\u0004\n');
		process.stdin.emit('end');
	});

	fn.tty = true;
	t.is(await fn({tty: false}), '');
});
