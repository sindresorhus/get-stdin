'use strict';
var test = require('ava');
var stdin = require('./');

test('get stdin as a promise', function (t) {
	t.plan(1);
	process.stdin.isTTY = false;

	stdin.promise()
		.then(function (data) {
			t.assert(data.toString().trim() === 'unicorns');
		});

		process.stdin.push(new Buffer('unicorns'));
		process.stdin.emit('end');
});

