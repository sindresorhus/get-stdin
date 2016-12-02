import test from 'ava';
import m from './';

test.serial('get stdin', async t => {
	t.plan(2);
	process.stdin.isTTY = false;

	const promise = m.buffer();
	process.stdin.push(new Buffer('uni'));
	process.stdin.push(new Buffer('corns'));
	process.stdin.emit('end');
	const data = await promise;
	t.true(data.equals(new Buffer('unicorns')));
	t.is(data.toString(), 'unicorns');
});

test.serial('get empty buffer when no stdin', async t => {
	process.stdin.isTTY = true;
	t.true((await m.buffer()).equals(new Buffer('')));
});
