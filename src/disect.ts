import * as em from './model';

export type DisectMap = {
  pgn: (pgn: any) => any,
  tag: (name: string, value: string) => any,
  move: (ply: number, move: any) => any,
  twomove: (ply: number, move: any, move2: any) => any,
  san: (san: string) => any,
  sanWithExtra: (san: any, extra: any) => any,
  branchSubMoves: () => void
  endBranchSubMoves: () => void
};

export class Disect {

  d: DisectMap
  
  constructor(d: DisectMap) {
    this.d = d;
  }
  
  study(study: Array<em.PGN>) {
    return study.map(this.pgn.bind(this));
  }

  pgn({pgn}: em.PGN) {
    return this.d.pgn([pgn[0].tags.map(this.tag.bind(this)),
                       this.mtr(pgn[1].mtr)]);
  }

  tag({tag: [name, value]}: em.Tag) {
    return this.d.tag(name, value);
  }

  mtr([movetext, result]: em.MoveTextAndResult) {
    return this.movetext(movetext);
  }

  movetext({movetext}: em.MoveText) {
    return movetext.map(this.movesOrSubmoves.bind(this));
  }

  movesOrSubmoves(_: em.MoveTurnOrSubMoves): any {
    if (em.isSubMoves(_)) {
      this.d.branchSubMoves();
      let res = _.submoves.map(this.movesOrSubmoves.bind(this));
      this.d.endBranchSubMoves();
      return res;
    } else {
      return this.moveTurn(_);
    }
  }

  moveTurn(moveturn: em.MoveTurn) {
    if (em.isCMove(moveturn)) {
      return this.cMove(moveturn);
    } else if (em.isTwoMove(moveturn)) {
      return this.tMove(moveturn);
    } else if (em.isOneMove(moveturn)) {
      return this.oneMove(moveturn);
    }
  }

  cMove({cmove: [oneturn, move]}: em.ContinueMove) {
    return this.d.move(this.oneTurn(oneturn),
                       this.move(move));
  }

  tMove({twomove: [{onemove: [zeroturn, move] }, move2]}: em.TwoMove) {
    return this.d.twomove(this.zeroTurn(zeroturn),
                          this.move(move),
                          this.move(move2));
  }

  oneMove({onemove: [zeroturn, move]}: em.OneMove) {
    return this.d.move(this.zeroTurn(zeroturn),
                this.move(move));
  }

  zeroTurn({zeroturn}: em.ZeroTurn) {
    return parseInt(zeroturn);
  }

  oneTurn({oneturn}: em.OneTurn) {
    return parseInt(oneturn);
  }

  move({move: [sanwc, extra]}: em.Move) {
    let san = typeof sanwc !== 'string'?this.d.san(sanwc.san):this.d.san(sanwc),
    dextra = this.extra(extra);
    return this.d.sanWithExtra(san, dextra);
  }

  extra({ extra: [{glyphs}, mnag, mcommentary] }: em.MoveExtra) {
    return [glyphs.map(this.glyph.bind(this)),
            this.maybeNag(mnag),
            this.maybeCommentary(mcommentary)];
  }

  maybeNag(mnag: em.MaybeNag) {
    if (em.isNag(mnag)) {
      return mnag.nag;
    }
  }

  maybeCommentary(mcommentary: em.MaybeCommentary) {
    if (em.isCommentary(mcommentary)) {
      return mcommentary.commentary;
    }
  }

  glyph(glyph: em.MPOGlyph) {
    if (em.isMGlyph(glyph)) {
      return glyph.mglyph;
    } else if (em.isPGlyph(glyph)) {
      return glyph.pglyph;
    } else if (em.isOGlyph(glyph)) {
      return glyph.oglyph;
    }
  }

  

}
