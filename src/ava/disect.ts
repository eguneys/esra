import test from 'ava';
import { plies, more } from './_fixture';
import { Disect } from '../disect';
import esra from '../esra';


let d = {
  branchSubMoves() {
  },
  endBranchSubMoves() {
  },
  pgn(pgn: any) {
    return pgn;
  },
  tag(name: string, value: string) {
    return name;
  },
  move(ply: number, move: any) {
    return {
      move,
      ply
    };
  },
  twomove(ply: number, move: any, move2: any) {
    return {
      ply,
      move,
      move2
    }
  },
  san(san: string) {
    return san;
  },
  sanWithExtra(san: string, extra: any) {
    return { san, extra };
  }
};
  
test.only('plies', t => {
  let ds = new Disect(d);

  t.deepEqual(ds.study(esra(plies)!)[0][1][1].ply, 3);
});

test.failing('disect', t => {
  let ds = new Disect(d);

  console.log(ds.study(esra(more)!)[0][1]);
});
