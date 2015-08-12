'use strict';

var main = function (cb) {
	var stdin = process.stdin;
	var ret = '';

	if (stdin.isTTY) {
		setImmediate(cb, ret);
		return;
	}

	stdin.setEncoding('utf8');

	stdin.on('readable', function () {
		var chunk;

		while (chunk = stdin.read()) {
			ret += chunk;
		}
	});

	stdin.on('end', function () {
		cb(ret);
	});
};

module.exports = main

module.exports.buffer = function (cb) {
	var stdin = process.stdin;
	var ret = [];
	var len = 0;

	if (stdin.isTTY) {
		setImmediate(cb, new Buffer(''));
		return;
	}

	stdin.on('readable', function () {
		var chunk;

		while (chunk = stdin.read()) {
			ret.push(chunk);
			len += chunk.length;
		}
	});

	stdin.on('end', function () {
		cb(Buffer.concat(ret, len));
	});
};

module.exports.promise = function () {
	return new Promise(function (_resolve, _reject) {
		main(function (data) {
			_resolve(data)
		})
	})
	.catch(function (err) {
		_reject(err)
	})
};
