import * as mt from './model';
import { tt, model } from 'tamcher';

function mrLeaf(rmv: tt.OneMatcherNode, mv: string): tt.Maybe<model.ModelRef> {
  if (mt.ignores.includes(rmv.tpe)) {
    return;
  }
  if (mt.ids.includes(rmv.tpe)) {
    return mv;
  }
  return {
    [rmv.tpe]: mv
  };
  // return mt.leafRefs[rmv.tpe as mt.LeafMatcherType]?.(mv);
}

function mrBranch(rmv: tt.OneMatcherNode, children: Array<model.ModelRef>): tt.Maybe<model.ModelRef> {
  return {
    [rmv.tpe]: children
  };
  //return mt.branchRefs[rmv.tpe as mt.BranchMatcherType]?.(children);
}

export default function nodeToModelReducer(rmv: tt.OneMatcherValue,
                 mv: tt.OneMatcherValue,
                 children: Array<model.ModelRef>): tt.Maybe<model.ModelRef> {

  let cFlat = children.filter(Boolean) as Array<model.ModelRef>;

  if (rmv === 'rootroot') {
    return cFlat;
  }
  
  if (typeof mv === 'string') {
    if (typeof rmv === 'string') {
    } else if (Array.isArray(rmv)) {
      return cFlat;
    } else {
      return mrLeaf(rmv, mv);
    }
  } else if (Array.isArray(mv)) {
    if (typeof rmv === 'string') {
      return cFlat;
    } else if (Array.isArray(rmv)) {
      return cFlat;
    } else {
      return mrBranch(rmv, cFlat);
    }
  } else {
    if (typeof rmv === 'string') {
      return cFlat[0];
    } else if (Array.isArray(rmv)) {
      return cFlat[0];
    } else {
      return mrBranch(rmv, cFlat);
    }
  }
}
