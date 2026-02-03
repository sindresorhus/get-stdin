const {stdin: processStdin} = process;

const getStdinBuffer = async (options = {}) => {
	const {stdin = processStdin, allowTTY = false} = options;
	if (stdin.isTTY && !allowTTY) {
		return Buffer.alloc(0);
	}

	const result = [];
	let length = 0;

	for await (const chunk of stdin) {
		result.push(chunk);
		length += chunk.length;
	}

	return Buffer.concat(result, length);
};

export default async function getStdin(options) {
	const buffer = await getStdinBuffer(options);
	return buffer.toString();
}

getStdin.buffer = getStdinBuffer;
