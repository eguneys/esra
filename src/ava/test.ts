import test from 'ava';
import * as m from '../matchers';
import { kgc1 } from './_fixture';

test.only('full', t => {
  t.like(m.mPGN(kgc1), { rest: '' });
});

test('full tag and move text', t => {
  let tags = `[Event "King's Gambit Introduction to 3...g5 Chapter 1 4.h4 g4 5.Ne5 Nf6 6.Bc4: Section 1: 7...Bg7 - Introduction"]
[Site "https://lichess.org/study/Wv6ppMmp/ao6SSAEh"]
[Result "*"]
[UTCDate "2021.04.11"]
[UTCTime "22:38:30"]
[Variant "Standard"]
[ECO "C39"]
[Opening "King's Gambit Accepted: Kieseritzky Gambit, Paulsen Defense Deferred"]
[Annotator "https://lichess.org/@/chesteditor"]
`;

  let moves = `1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Bc4 d5 7. exd5 Bg7 8. d4 O-O (8... Nxd5 9. Nc3! Nxc3 10. Bxf7+!? Kf8 11. bxc3 Bxe5 12. Bb3 Bd6 13. O-O Qxh4 14. Bxf4 Bxf4 15. Rxf4+ Ke8 $13) 9. O-O Nxd5 10. Nc3 Nb6! (10... Nxc3 11. bxc3 f3 12. Qe1! $14 Bxe5 13. Qxe5 Qxh4 14. Ba3 Nd7 15. Qf4 Nb6 16. Bxf8 Nxc4 17. Rxf3 Bf5 18. Bh6 Bg6 19. Rh3 Qe7 20. Qxg4) 11. Bxf4 Nxc4 12. Nxc4 Qxd4+ 13. Qxd4 Bxd4+ 14. Ne3`;

  let result = `*`;

  t.like(m.mTags(tags), { rest: '' });
  t.like(m.mMoveText(moves), { rest: '' });
  t.like(m.mPGN(tags + '\n' + moves + ' ' + result), { rest: ''});
  t.like(m.mResult(result), { rest: '' });
  t.like(m.mMoveTextAndResult(moves + ' ' + result), { rest: '' });
});

test('tag and movetext', t => {
  let tags = `[Event "King's Gambit Introduction to 3...g5 Chapter 1 4.h4 g4 5.Ne5 Nf6 6.Bc4: Section 1: 7...Bg7 - Introduction"]
`;
  let newline = `
`;
  let moveText = `1. e4 e5 2. f4 exf4`
  t.like(m.mPGN(tags + newline + moveText), { rest: '' });
});

test('tags', t => {
  let tags = `[Event "King's Gambit Introduction to 3...g5 Chapter 1 4.h4 g4 5.Ne5 Nf6 6.Bc4: Section 1: 7...Bg7 - Introduction"]
[Site "https://lichess.org/study/Wv6ppMmp/ao6SSAEh"]
[Result "*"]
[UTCDate "2021.04.11"]
[UTCTime "22:38:30"]
[Variant "Standard"]
[ECO "C39"]
[Opening "King's Gambit Accepted: Kieseritzky Gambit, Paulsen Defense Deferred"]
[Annotator "https://lichess.org/@/chesteditor"]
`;
  
  t.like(m.mTags(tags), { rest: '' });
});

test('tag', t => {

  let event = `[Event "King's Gambit Introduction to 3...g5 Chapter 1 4.h4 g4 5.Ne5 Nf6 6.Bc4: Section 1: 7...Bg7 - Introduction"]`;

  t.like(m.mTag(event), {rest: '', acc: { tpe: 'tag', value: { tpe: 'defaulttag' } } });

  let moves = `1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Bc4 d5 7. exd5 Bg7 8. d4 O-O (8... Nxd5 9. Nc3! Nxc3 10. Bxf7+!? Kf8 11. bxc3 Bxe5 12. Bb3 Bd6 13. O-O Qxh4 14. Bxf4 Bxf4 15. Rxf4+ Ke8) 9. O-O Nxd5 10. Nc3 Nb6! (10... Nxc3 11. bxc3 f3 12. Qe1! Bxe5 13. Qxe5 Qxh4 14. Ba3 Nd7 15. Qf4 Nb6 16. Bxf8 Nxc4 17. Rxf3 Bf5 18. Bh6 Bg6 19. Rh3 Qe7 20. Qxg4) 11. Bxf4 Nxc4 12. Nxc4 Qxd4+ 13. Qxd4 Bxd4+ 14. Ne3`;
  
  t.like(m.mMoveText(moves), { rest: '' });

  
});

test('moves with $13', t => {

  let moves = `1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Bc4 d5 7. exd5 Bg7 8. d4 O-O (8... Nxd5 9. Nc3! Nxc3 10. Bxf7+!? Kf8 11. bxc3 Bxe5 12. Bb3 Bd6 13. O-O Qxh4 14. Bxf4 Bxf4 15. Rxf4+ Ke8 $13) 9. O-O Nxd5 10. Nc3 Nb6! (10... Nxc3 11. bxc3 f3 12. Qe1! $14 Bxe5 13. Qxe5 Qxh4 14. Ba3 Nd7 15. Qf4 Nb6 16. Bxf8 Nxc4 17. Rxf3 Bf5 18. Bh6 Bg6 19. Rh3 Qe7 20. Qxg4) 11. Bxf4 Nxc4 12. Nxc4 Qxd4+ 13. Qxd4 Bxd4+ 14. Ne3`;
  
  t.like(m.mMoveText(moves), { rest: '' });
  
});
