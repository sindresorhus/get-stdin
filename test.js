'use strict';
var test = require('ava');
var bufferEqual = require('buffer-equal');
var stdin = require('./');

test('get stdin', function (t) {
	t.plan(1);
	process.stdin.isTTY = false;

	stdin(function (data) {
		t.assert(data.trim() === 'unicorns');
	});

	process.stdin.emit('data', 'unicorns');
	process.stdin.emit('end');
});

test('get stdin as a buffer', function (t) {
	t.plan(2);
	process.stdin.isTTY = false;

	stdin.buffer(function (data) {
		t.assert(bufferEqual(data, new Buffer('unicorns')));
		t.assert(data.toString().trim() === 'unicorns');
	});

	process.stdin.emit('data', new Buffer('unicorns'));
	process.stdin.emit('end');
});

test('get empty string when no stdin', function (t) {
	t.plan(1);
	process.stdin.isTTY = true;

	stdin(function (data) {
		t.assert(data === '');
	});
});

test('get empty buffer when no stdin', function (t) {
	t.plan(1);
	process.stdin.isTTY = true;

	stdin.buffer(function (data) {
		t.assert(bufferEqual(data, new Buffer('')));
	});
});

