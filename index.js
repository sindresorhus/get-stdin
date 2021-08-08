const {stdin} = process;

const getStdinBuffer = async () => {
	const result = [];
	let length = 0;

	if (stdin.isTTY) {
		return Buffer.concat([]);
	}

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
