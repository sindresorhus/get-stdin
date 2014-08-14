'use strict';
var equal = require('buffer-equal');
var test = require('ava');
var stdin = require('./');

test('should get stdin', function (t) {
	t.plan(2);

	stdin(function (data) {
		t.assert(equal(data, new Buffer('unicorns\n')));
		t.assert(data.toString().trim() === 'unicorns');
	});
});
