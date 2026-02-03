import {expectType} from 'tsd';
import getStdin, {type Options} from './index.js';

expectType<Promise<string>>(getStdin());
expectType<Promise<string>>(getStdin({allowTTY: true}));
expectType<Promise<string>>(getStdin({stdin: process.stdin}));
expectType<Promise<Buffer>>(getStdin.buffer());
expectType<Promise<Buffer>>(getStdin.buffer({allowTTY: true}));
expectType<Promise<Buffer>>(getStdin.buffer({stdin: process.stdin}));
expectType<Options>({allowTTY: true});
expectType<Options>({stdin: process.stdin});
