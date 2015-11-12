'use strict';
var fn = require('./');

fn().then(function (data) {
	process.exit(data ? 0 : 1);
});
