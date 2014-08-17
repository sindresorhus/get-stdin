'use strict';
var equal = require('buffer-equal');
var test = require('ava');
var stdin = require('./');

test('get stdin', function (t) {
	t.plan(1);

	stdin(function (data) {
		t.assert(data.trim() === 'unicorns');
	});

	process.stdin.emit('data', 'unicorns');
	process.stdin.emit('end');
});

test('get stdin as a buffer', function (t) {
	t.plan(2);

	stdin.buffer(function (data) {
		t.assert(equal(data, new Buffer('unicorns')));
		t.assert(data.toString().trim() === 'unicorns');
	});

	process.stdin.emit('data', new Buffer('unicorns'));
	process.stdin.emit('end');
});
