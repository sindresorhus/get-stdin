'use strict';
var stdin = process.stdin;

module.exports = function (opt) {
	var ret = '';
	var tty = (opt && 'tty' in opt) ? opt.tty : module.exports.tty;

	return new Promise(function (resolve) {
		if (stdin.isTTY && !tty) {
			resolve(ret);
			return;
		}
		tty = stdin.isTTY && tty;
		stdin.setEncoding('utf8');

		stdin.on('readable', function () {
			var chunk;
			while ((chunk = stdin.read())) {
				if (stdin.isTTY && tty && handleTTY(chunk)) {
					return;
				}
				ret += chunk;
			}
		});

		stdin.on('end', function () {
			resolve(ret);
		});
	});
};

module.exports.buffer = function () {
	var ret = [];
	var len = 0;

	return new Promise(function (resolve) {
		if (stdin.isTTY) {
			resolve(new Buffer(''));
			return;
		}

		stdin.on('readable', function () {
			var chunk;

			while ((chunk = stdin.read())) {
				ret.push(new Buffer(chunk));
				len += chunk.length;
			}
		});

		stdin.on('end', function () {
			resolve(Buffer.concat(ret, len));
		});
	});
};

// disable tty for backward compatibility
module.exports.tty = false;

// in TTY mode, handle line beginning with ^z or ^d
function handleTTY(chunk) {
	var c = chunk.charCodeAt(0);
	return (c === 4 || c === 26) && stdin.emit('end');
}

