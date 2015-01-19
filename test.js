'use strict';
var test = require('ava');
var stdin = require('./');

test('get stdin', function (t) {
	t.plan(1);
	process.stdin.isTTY = false;

	stdin(function (data) {
		t.assert(data.trim() === 'unicorns');
	});

	process.stdin.push('unicorns');
	process.stdin.emit('end');
});

test('get empty string when no stdin', function (t) {
	t.plan(1);
	process.stdin.isTTY = true;

	stdin(function (data) {
		t.assert(data === '');
	});
});
