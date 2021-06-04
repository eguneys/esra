import test from 'ava';
import * as m from '../matchers';
import { tarrasch, antisic } from './_fixture';

test.only('antisic', t => {
  t.like(m.mPGN(antisic), { rest: '' });
});

test('tarrasch', t => {
  t.like(m.mPGN(tarrasch), { rest: '' });
});
