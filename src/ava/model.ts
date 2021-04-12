import test from 'ava';
import esra from '../esra';
import { kgc1 } from './_fixture';

test('model', t => {
  console.log(esra(kgc1)?.pgn[1].mtr[0].movetext[0]);
});
