# PGN Parser ![test workflow](https://github.com/eguneys/esra/actions/workflows/test.yml/badge.svg)

Parse Chess PGN files in a type safe simple way.

## Install

`yarn add esra`

## Usage

You have a string of PGN separated by newlines:

`
let study = '
PGN
PGN
PGN
'
`

There are two alternative methods to consume:

Get a type safe json structure:

```

import esra, { em } from 'esra';

esra(study); // returns Array<em.PGN> | undefined

```

See [model.ts](./src/model.ts) for the data structure.

Or use `dis.Disect` to dissect the json structure into callbacks on data:

```
  import esra, { dis } from 'esra';

  // these hooks will be called as the pgn is traversed.
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

  
  let ds = new dis.Disect(d);

  let model = esra(study);

  if (model) {
    ds.study(model);
  } else {
    // couldn't parse study
  }

```


## PGN Format

Tags, Moves and Game Result is supported.

A Tag is `[TagName, TagValue]`.

San moves, glyphs, one NAG, commentary is supported.

Rest of the spec is incompatible and `esra` will return undefined.
