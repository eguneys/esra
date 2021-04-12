import test from 'ava';
import * as m from '../matchers';
import { london, hex1, kgc1 } from './_fixture';

test('full', t => {
  [kgc1,
   hex1,
   london].forEach(_ =>
     t.like(m.mPGN(_), { rest: '' }));
});

test('movetext', t => {
  let movetext = '1. e4 e5 2. f4 (2. Nc3 { branch } 2... Nf6 (2... Bd6 { sibling })  (2... Be7) 3. Nd5 (3. d3 { some comments }))  (2. Na3 Nc6 (2... Na6)  (2... c6) 3. Nc4) *'
  t.like(m.mMoveTextAndResult(movetext), { rest: ''} );
});
