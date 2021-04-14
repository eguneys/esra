import test from 'ava';
import { more } from './_fixture';
import Disect from '../disect';
import esra from '../esra';

test('disect', t => {

  let d = {
    tag(name: string, value: string) {
      return name;
    },
    move(ply: number, move: any) {
      return {
        move,
        ply
      };
    },
    twomove(onemove: any, move: any) {
      return {
        onemove,
        move
      }
    },
    san(san: string) {
      return san;
    },
    sanWithExtra(san: string, extra: any) {
      return { san, extra };
    }
  };

  
  let ds = new Disect(d);

  console.log(ds.study(esra(more)!)[0][1]);
});
