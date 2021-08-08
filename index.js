const {stdin} = process;

const getStdinBuffer = async () => {
	if (stdin.isTTY) {
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

export default async function getStdin() {
	const buffer = await getStdinBuffer();
	return buffer.toString('utf8');
}

getStdin.buffer = getStdinBuffer;
