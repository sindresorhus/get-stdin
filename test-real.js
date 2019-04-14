'use strict';
const getStdin = require('.');

getStdin().then(data => {
	process.exit(data ? 0 : 1); // eslint-disable-line unicorn/no-process-exit
});
