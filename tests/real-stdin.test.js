import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import test from 'node:test';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const fixtureUrl = new URL('fixtures/real-stdin.js', import.meta.url);
const fixturePath = fileURLToPath(fixtureUrl);

test('get stdin reads from a real process', async () => {
	const childProcess = spawn(process.execPath, [fixturePath], {
		stdio: ['pipe', 'ignore', 'ignore'],
	});

	childProcess.stdin.write('unicorns');
	childProcess.stdin.end();

	const exitCode = await new Promise((resolve, reject) => {
		childProcess.on('error', reject);
		childProcess.on('exit', resolve);
	});

	assert.equal(exitCode, 0);
});
