import {expectType} from 'tsd';
import getStdin from './index.js';

expectType<Promise<string>>(getStdin());
expectType<Promise<Buffer>>(getStdin.buffer());
