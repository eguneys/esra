import { tt, mm, rr } from 'tamcher';

export function fReduceTurn(tpe: tt.OneMatcherType, nb: number): rr.StringReducer {
  let reducer = mm.oneMatcherNode(tpe);
  return function (_: Array<string>): tt.OneMatcherNode {
    let [turn] = _;
    let dTurn = parseInt(turn);
    let dPly = dTurn * 2 - nb;
    return reducer(dPly + '');
  }
}

export function fReduceSan(_: Array<string>): tt.OneMatcherNode {
  let [role,file,rank,capture,to,promotion,check,mate] = _;

  return mm.oneMatcherNode("san")([role,file,rank,capture,to,promotion,check,mate].join(' '));
}

export function fReduceMPOGlyphs(_: tt.Triple<tt.OneMatcherValue>): tt.OneMatcherValue {
  return mm.oneMatcherNode("glyphs")(_.filter(_ => _ !== mm.noneMatcherNode) as Array<tt.OneMatcherNode>);
  
}

export function fReduceMoves(_: tt.Triple<tt.OneMatcherValue>): tt.OneMatcherValue {
  let [s, ms, e] = _;

  let res: Array<tt.OneMatcherNode> = [];

  if (ms !== mm.noneMatcherNode) {
    res = res.concat(ms as Array<tt.OneMatcherNode>);    
  }
  if (s !== mm.noneMatcherNode) {
    res.push(s as tt.OneMatcherNode);
  }
  if (e !== mm.noneMatcherNode) {
    res.push(e as tt.OneMatcherNode);
  }

  return mm.oneMatcherNode("moves")(res);  

}

export const fReduceMove = rr.fSliceTriple("move", 0, 2);
