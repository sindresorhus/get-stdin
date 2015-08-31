'use strict';
var stdin = require('./');

stdin().then(function (data) {
	process.exit(data ? 0 : 1);
});
