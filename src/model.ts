import { model } from 'tamcher';

export const ignores = ['space', 'newline'];

export type PGN = {
  pgn: [Array<Tag>, MoveTextAndResult]
}

export type Name = string
export type Value = string
export type Result = string

export type Tag = {
  tag: [Name, Value]
}

export type MoveTextAndResult = {
  mtr: [MoveText, Result]
}

export type MoveText = {
  movetext: Array<MovesOrSubMoves>
}

export type MovesOrSubMoves =
  Moves |
  SubMoves

export type SubMoves = {
  submoves: Moves
}

export type ZeroTurn = {
  zeroturn: string
}

export type OneTurn = {
  oneturn: string
}

export type MoveGlyph = string

export type PosGlyph = string

export type ObsGlyph = string

export type Ply = string

export type MPOGlyphs = {
  moveGlyph?: MoveGlyph,
  posGlyph?: PosGlyph,
  obsGlyph?: ObsGlyph
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
  move: [SanWithCastles, MPOGlyphs]
}

export type ContinueMove = {
  cmove: [OneTurn, Move]
}

export type OneMove = {
  onemove: [ZeroTurn, Move]
}

export type TwoMove = {
  twomove: [OneMove, Move]
}

export type Moves = Array<ContinueMove | TwoMove | OneMove>

export const isCMove = model.makeNarrower<any, ContinueMove>('cmove');
export const isTwoMove = model.makeNarrower<any, TwoMove>('tmove');
export const isOneMove = model.makeNarrower<any, OneMove>('omove');
