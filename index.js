'use strict';
const stdin = process.stdin;

function getStdin(serializer) {
	return () => {
		const ret = [];
		let len = 0;

		return new Promise(resolve => {
			if (stdin.isTTY) {
				const buffer = Buffer.from('');
				resolve(serializer(buffer));
				return;
			}

			stdin.on('readable', () => {
				let chunk;

				while ((chunk = stdin.read())) {
					ret.push(chunk);
					len += chunk.length;
				}
			});

			stdin.on('end', () => {
				const buffer = Buffer.concat(ret, len);
				resolve(serializer(buffer));
			});
		});
	};
}

module.exports = getStdin(buffer => buffer.toString());
module.exports.buffer = getStdin(buffer => buffer);
