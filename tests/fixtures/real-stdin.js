import process from 'node:process';
import getStdin from '../../index.js';

const input = await getStdin();
process.exit(input ? 0 : 1); // eslint-disable-line unicorn/no-process-exit
