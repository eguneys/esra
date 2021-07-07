import test from 'ava';
import * as m from '../matchers'

test('commentary', t => {
  t.like(m.mComment('{ https://lichess.org/@/openingsexercise }'), { rest: '' });
});
