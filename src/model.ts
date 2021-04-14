import { model } from 'tamcher';

export const ignores = ['space', 'newline'];
export const ids = ['tagname', 'tagvalue', 'comment', 'text', 'shortcastles', 'longcastles'];

export type PGN = { 
  pgn: [Tags, Mtr]
}

export type Name = string
export type Value = string
export type Result = string

export type Mtr = {
  mtr: MoveTextAndResult
};

export type Tags = {
  tags: Array<Tag>
};

export type Tag = {
  tag: [Name, Value]
}

export type MoveTextAndResult = [MoveText, Result]

export type MoveText = {
  movetext: MovesOrSubMoves
}

export type MovesOrSubMoves =
  Array<MoveTurnOrSubMoves>

export type MoveTurnOrSubMoves =
  MoveTurn | SubMoves

export type SubMoves = {
  submoves: MovesOrSubMoves
}

export type ZeroTurn = {
  zeroturn: string
}

export type OneTurn = {
  oneturn: string
}

export type MoveGlyph = {
  mglyph: string
}

export type PosGlyph = {
  pglyph: string
}

export type ObsGlyph = {
  oglyph: string
}

export type Ply = string

export type MPOGlyph = 
  | MoveGlyph
  | PosGlyph
  | ObsGlyph

export type MPOGlyphs = {
  glyphs: Array<MPOGlyph>
}

export type San = {
  san: string
}

export type ShortCastles = "o-o" | "O-O" | "0-0"

export type LongCastles = "o-o-o" | "O-O-O" | "0-0-0"

export type SanWithCastles = 
  | LongCastles
  | ShortCastles
  | San

export type Move = {
  move: [SanWithCastles, MoveExtra]
}

export type MoveExtra = {
  extra: [MPOGlyphs, MaybeNag, MaybeCommentary]
}

export type None = { none: '' }

export type MaybeNag =
  | Nag
  | None

export type MaybeCommentary =
  | Commentary
  | None

export type Nag = {
  nag: string
}

export type Commentary = {
  commentary: Array<Comment>
}

export type Comment = string

export type ContinueMove = {
  cmove: [OneTurn, Move]
}

export type OneMove = {
  onemove: [ZeroTurn, Move]
}

export type TwoMove = {
  twomove: [OneMove, Move]
}

export type MoveTurn = ContinueMove | TwoMove | OneMove

export const isCMove = model.makeNarrower<any, ContinueMove>('cmove');
export const isTwoMove = model.makeNarrower<any, TwoMove>('twomove');
export const isOneMove = model.makeNarrower<any, OneMove>('onemove');

export const isSubMoves = model.makeNarrower<MoveTurnOrSubMoves, SubMoves>('submoves');

export const isMGlyph = model.makeNarrower<MPOGlyph, MoveGlyph>('mglyph');
export const isPGlyph = model.makeNarrower<MPOGlyph, PosGlyph>('pglyph');
export const isOGlyph = model.makeNarrower<MPOGlyph, ObsGlyph>('oglyph');
export const isCommentary = model.makeNarrower<MaybeCommentary, Commentary>('commentary');
export const isNag = model.makeNarrower<MaybeNag, Nag>('nag');
