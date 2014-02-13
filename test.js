'use strict';
var assert = require('assert');
var stdin = require('./index');

it('should get stdin', function (cb) {
	stdin(function (data) {
		assert.equal(data.trim(), 'unicorns');
		cb();
	});
});
