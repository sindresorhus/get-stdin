import test from 'ava';
import fn from './';

test.serial('get stdin', async t => {
	t.plan(1);
	process.stdin.isTTY = false;
	const promise = fn();
	process.stdin.push('uni');
	process.stdin.push('corns');
	process.stdin.emit('end');
	t.is((await promise).trim(), 'unicorns');
});

test.serial('get empty string when no stdin', async t => {
	process.stdin.isTTY = true;
	t.is(await fn(), '');
});
