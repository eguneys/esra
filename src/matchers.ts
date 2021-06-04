import { moveSymbols,
         posSymbols,
         obsSymbols } from 'sfilg';
import { mm, rr } from 'tamcher';
import * as srr from './reducers';

function byLength(a: string, b: string) {
  return b.length - a.length;
}

export const mSpaceStar = mm.mr(/^( +)(.*)$/s, 'space');
export const mSpace = mm.mr(/^( )(.*)$/s, 'space');
export const mNewline = mm.mr(/^(\n)(.*)$/s, 'newline');
export const mText = mm.mr(/^([^}]*)(.*)$/s, 'text');

export const mDefaultTag = mm.mseq3([
  mm.mr(/^([A-Za-z]*)(.*)$/s, 'tagname'),
  mSpace,
  mm.mr(/^([^\]]*)(.*)$/s, 'tagvalue')
], rr.fOneAndThree('tag'));

export const mTag =
  mm.mseq3([
    mm.mr(/^(\[)(.*)$/s, "tbegin"),
    mm.meither([
      mDefaultTag
    ]),
    mm.mr(/^(\])(.*)$/s, "tend"),
  ], mm.fSecond);

export const mResult =
  mm.mr(/^(\*)(.*)$/s, "result");

export const mComment = mm.mseq3([
  mm.mr(/^(\s\{)(.*)$/s, "pbegin"),
  mText,
  mm.mr(/^(\})(.*)$/s, "pend"),  
], _ => _[1]);

export const mMoreCommentary = mm.mgroup(mm.mstar(mComment), mm.oneMatcherNode('commentary'));

export const mZeroTurn = mm.mrplus(/^([1-9]\d*)\.([^\.].*)/s, 
                                   1, srr.fReduceTurn("zeroturn", 1));

export const mOneTurn = mm.mrplus(/^([1-9]\d*)\.\.\.(.*)/s, 
                                  1, srr.fReduceTurn("oneturn", 0));


export const mMoveGlyph = mm.mmap(moveSymbols.sort(byLength),
                                  'mglyph');

export const mPosGlyph = mm.mmap(posSymbols.sort(byLength),
                                 'pglyph');

export const mObsGlyph = mm.mmap(obsSymbols.sort(byLength),
                                 'oglyph');

export const mMPOGlyphs = mm.mseq3([
  mm.mOpt(mMoveGlyph),
  mm.mOpt(mPosGlyph),
  mm.mOpt(mObsGlyph)
], srr.fReduceMPOGlyphs);

export const mSan = mm.mrplus(/^(N|B|R|Q|K|)([a-h]?)([1-8]?)(x?)([a-h][0-9])(=?[NBRQ]?)(\+?(?!-))(\#?)(.*)$/s, 
                              8, srr.fReduceSan);

export const mShortCastles = mm.mmap(['o-o', 'O-O', '0-0'], 'shortcastles');
export const mLongCastles = mm.mmap(['o-o-o', 'O-O-O', '0-0-0'], 'longcastles');

export const mSanWithCastles = mm.meither([
  mLongCastles,
  mShortCastles,
  mSan
]);

export const mNAG = mm.mseq3([
  mm.mr(/^(\s)(.*)$/s, "space"),
  mm.mr(/^(\$)(.*)$/s, "nagbegin"),
  mm.mr(/^(\d\d?\d?)(.*)$/s, "nag"),
], _ => _[2]);

export const mMove = mm.mseq3([
  mSanWithCastles,
  mm.mpass,
  mm.mseq3([
    mMPOGlyphs,
    mm.mseq3([
      mm.mOpt(mNAG),
      mm.mOpt(mNAG),
      mm.mpass
    ], rr.fAll('nags')),
    mm.mOpt(mMoreCommentary),
  ], rr.fAll('extra'))
], rr.fOneAndThree('move'));

export const mOneMove = mm.mseq3([
  mZeroTurn,
  mSpace,
  mMove,
], rr.fOneAndThree("onemove"));

export const mContinueMove = mm.mseq3([
  mOneTurn,
  mSpace,
  mMove  
], rr.fOneAndThree("cmove"));

export const mTwoMove = mm.mseq3([
  mOneMove,
  mSpace,
  mMove,
], rr.fOneAndThree("twomove"));
  

export const mMoves = mm.mstar(mm.meither([
  mTwoMove,
  mOneMove,
  mContinueMove,
  mSpace
]));

export const mSubMoves = mm.mseq3([
  mm.mr(/^(\()(.*)$/s, "pbegin"),
  mm.mrec(() => mMovesOrSub),
  mm.mr(/^(\))(.*)$/s, "pend"),
], rr.fSecond('submoves'));

export const mMovesOrSub = mm.mstar(mm.meither([
  mSubMoves,
  mMoves,
  mSpaceStar
]));

export const mMoveText = mm.mgroup(mMovesOrSub,
                                   mm.oneMatcherNode('movetext'));

export const mTags = mm.mgroup(mm.mstar(mm.mseq3([
  mTag,
  mNewline,
  mm.mpass
], _ => _[0])), mm.oneMatcherNode('tags'));

export const mMoveTextAndResult = mm.mseq3([
  mMoveText,
  mm.mpass,
  mResult,
], rr.fOneAndThree('mtr'));

export const mPGNTrimmed = mm.mseq3([
  mTags,
  mNewline,
  mMoveTextAndResult
], rr.fOneAndThree('pgn'))

export const mPGN = mm.mseq3([
  mm.mOpt(mNewline),
  mPGNTrimmed,
  mm.mOpt(mNewline)
], _ => _[1]);


export const mStudy = mm.mstar(mm.meither([
  mNewline,
  mPGN
]));
