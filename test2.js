'use strict';
var stdin = require('./');

stdin(function (data) {
	process.exit(data ? 0 : 1);
});
