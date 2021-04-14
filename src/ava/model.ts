import test from 'ava';
import esra from '../esra';
import { more, kgc1 } from './_fixture';

test('model', t => {
  console.log(esra(kgc1)?.[0].pgn[1].mtr[0].movetext[0]);
});

test.only('more', t => {
  console.log(esra(more));
});
