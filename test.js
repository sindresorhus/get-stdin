'use strict';
var test = require('ava');
var stdin = require('./');

test('should get stdin', function (t) {
	t.plan(1);

	stdin(function (data) {
		t.assert(data.trim() === 'unicorns');
	});
});
