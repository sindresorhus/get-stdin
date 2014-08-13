'use strict';
module.exports = function (cb) {
	var ret = [];

	process.stdin.on('data', function (data) {
		ret.push(data);
	});

	process.stdin.on('end', function () {
		cb(Buffer.concat(ret));
	});
};
