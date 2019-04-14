import {expectType} from 'tsd';
import getStdin = require('.');

expectType<Promise<string>>(getStdin());
expectType<Promise<Buffer>>(getStdin.buffer());
