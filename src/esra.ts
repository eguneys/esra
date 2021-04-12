import * as mm from './matchers';
import * as mt from './model';
import tamcher from 'tamcher';
import nodeToModelReducer from './nodetomodel';

export default function esra(str: string): mt.PGN | undefined {

  let met = mm.mPGN(str);

  if (met) {
    return tamcher(met, nodeToModelReducer);
  }
  
}
