import test from 'ava';
import * as m from '../matchers';
import { result10, tarrasch, antisic } from './_fixture';

test.only('result 1-0', t => {
  t.like(m.mPGN(result10), { rest: '' });
});

test('antisic', t => {
  t.like(m.mPGN(antisic), { rest: '' });
});

test('tarrasch', t => {
  t.like(m.mPGN(tarrasch), { rest: '' });
});
