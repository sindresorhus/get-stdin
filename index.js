'use strict';
const stdin = process.stdin;

module.exports = () => {
	let ret = '';

	return new Promise(resolve => {
		if (stdin.isTTY) {
			resolve(ret);
			return;
		}

		const timeout = setTimeout(() => {
			resolve(ret);
		}, 100);

		stdin.unref();
		stdin.setEncoding('utf8');

		stdin.on('readable', () => {
			clearTimeout(timeout);
			stdin.ref();

			let chunk;

			while ((chunk = stdin.read())) {
				ret += chunk;
			}
		});

		stdin.on('end', () => {
			resolve(ret);
		});
	});
};

module.exports.buffer = () => {
	const ret = [];
	let len = 0;

	return new Promise(resolve => {
		if (stdin.isTTY) {
			resolve(new Buffer(''));
			return;
		}

		const timeout = setTimeout(() => {
			resolve(new Buffer(''));
		}, 100);

		stdin.unref();

		stdin.on('readable', () => {
			clearTimeout(timeout);
			stdin.ref();

			let chunk;

			while ((chunk = stdin.read())) {
				ret.push(chunk);
				len += chunk.length;
			}
		});

		stdin.on('end', () => {
			resolve(Buffer.concat(ret, len));
		});
	});
};
