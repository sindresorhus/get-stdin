'use strict';
const m = require('.');

m().then(data => {
	process.exit(data ? 0 : 1); // eslint-disable-line unicorn/no-process-exit
});
