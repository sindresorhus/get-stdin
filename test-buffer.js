'use strict';
var equal = require('buffer-equal');
var test = require('ava');
var stdin = require('./');

test('get stdin as a buffer', function (t) {
	t.plan(2);

	stdin.buffer(function (data) {
		t.assert(equal(data, new Buffer('unicorns\n')));
		t.assert(data.toString().trim() === 'unicorns');
	});
});
