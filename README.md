# esbuild-plugin-reserve-identifiers

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]

Just reserve some identifiers in your code.

## Why ?

When you want to use `esbuild` to bundle your code, but you want to keep some identifiers in your code, you can use this plugin to reserve them. [esbuild/issues/2338](https://github.com/evanw/esbuild/issues/2338)

Then you can set `minifyIdentifiers = false` and use other compression tools (such as swc)

Unfortunately, in this case the code output is like this, there is a file path for debugging, like this

```js
var init_chunk_YWDVZGFJ = __esm({
  ".../chunk-YWDVZGFJ.js": function() {

  }
});
```

Compression tools cannot remove this content.


## Usage

```js
import { reserveIdentifiersPlugin } from 'esbuild-plugin-reserve-identifiers';
esbuild.build({
  // ...
  plugins: [
    reserveIdentifiersPlugin({
      identifiers: ['ga', 't'],
    }),
  ],
})
```

[build-img]: https://github.com/noyobo/esbuild-plugin-reserve-identifiers/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/noyobo/esbuild-plugin-reserve-identifiers/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/esbuild-plugin-reserve-identifiers
[downloads-url]: https://www.npmtrends.com/esbuild-plugin-reserve-identifiers
[npm-img]: https://img.shields.io/npm/v/esbuild-plugin-reserve-identifiers
[npm-url]: https://www.npmjs.com/package/esbuild-plugin-reserve-identifiers
[issues-img]: https://img.shields.io/github/issues/noyobo/esbuild-plugin-reserve-identifiers
[issues-url]: https://github.com/noyobo/esbuild-plugin-reserve-identifiers/issues
[codecov-img]: https://codecov.io/gh/noyobo/esbuild-plugin-reserve-identifiers/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/noyobo/esbuild-plugin-reserve-identifiers
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
