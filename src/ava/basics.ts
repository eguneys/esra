import test from 'ava';
import * as m from '../matchers';
import { london, hex1 } from './_fixture';

let moves = `1. e4 e5 2. f4 (2. Nc3 { branch } 2... Nf6 (2... Bd6 { sibling })  (2... Be7) 3. Nd5 (3. d3 { some comments }))  (2. Na3 Nc6 (2... Na6)  (2... c6) 3. Nc4)`

const moveText = (t: any) => (move: string) => {
  t.like(m.mMoveText(move), { rest: '' });
};

test('single', t => {
  ['1. e4',
   '1. e4 e5',
   '1... e4'
  ].forEach(moveText(t));
});

test('more', t => {
  ['1. e4 e5 2. Nf3 2... Nf6',
   '1... e4 2. Nf3'
  ].forEach(moveText(t));
});

test('move and comment', t => {
  ['2... Bd6 { sibling }',
   '2. Nc3 { branch }',
   '3. d3 { some comments }'
  ].forEach(moveText(t));
});

test('moves and comment', t => {
  ['2. Nc3 { branch } 2... Nf6'].forEach(moveText(t));
});

test('one move variations', t => {
  ['(2... Na6)',
   '(2... Bd6 { sibling })'].forEach(moveText(t));
});

test('nested variations', t => {
  ['(2. Na3 Nc6 (2... Na6)  (2... c6) 3. Nc4)',
   '(2. Nc3 { branch } 2... Nf6 (2... Bd6 { sibling })  (2... Be7) 3. Nd5 (3. d3 { some comments }))'].forEach(moveText(t));
});

test('full', t => {
  ['1. e4 e5 2. f4 (2. Nc3 { branch } 2... Nf6 (2... Bd6 { sibling })  (2... Be7) 3. Nd5 (3. d3 { some comments }))  (2. Na3 Nc6 (2... Na6)  (2... c6) 3. Nc4)'].forEach(moveText(t));
});
