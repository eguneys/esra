import test from 'ava';
import * as m from '../matchers';
import { london, hex1 } from './_fixture';

test('full', t => {
  t.like(m.mPGN(london), { rest: '' });
});

test.only('hex1', t => {
  let moves = `1. e4 e5 2. f4 (2. Nc3 { branch } 2... Nf6 (2... Bd6 { sibling })  (2... Be7) 3. Nd5 (3. d3 { some comments }))  (2. Na3 Nc6 (2... Na6)  (2... c6) 3. Nc4)`

  t.like(m.mMoveText(moves), { rest: '' });
});

test('commentary', t => {

  let simple = `(3... Qb6 4. Nc3 e6 (4... Qxb2?? { black's action with very bad moves } 5. Nxd5) 5. a5) `;

  t.like(m.mMoveText(simple), { rest: '' });
  
  let comments = `1. d4 d5 2. Bf4 c5 3. e3 cxd4 (3... Qb6 4. Nc3 e6 (4... Qxb2?? { black's action with very bad moves } 5. Nxd5) 5. Nb5 Na6 6. a4 Nf6) `;


  t.like(m.mMoveText(comments), { rest: '' });
});

test('nested', t => {
  let nested = `1. d4 d5 2. Bf4 c5 3. e3 cxd4 (3... Qb6 (4... Qxb2?? 5. Nxd5 e4) 4. Nc3 e6 5. Nb5 Na6 6. a4 Nf6) `;

  t.like(m.mMoveText(nested), { rest: '' });
});
