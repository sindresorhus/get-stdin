'use strict';
var test = require('ava');
var stdin = require('./');

test('get stdin', function (t) {
	process.stdin.isTTY = false;

	var promise = stdin(function (data) {
		t.is(data.trim(), 'unicorns');
	});

	process.stdin.push('unicorns');
	process.stdin.emit('end');

	return promise;
});

test('get empty string when no stdin', function (t) {
	process.stdin.isTTY = true;

	return stdin(function (data) {
		t.is(data, '');
	});
});
