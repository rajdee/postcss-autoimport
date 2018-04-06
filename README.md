# PostCSS Autoimport [![Build Status][ci-img]][ci]

[PostCSS] plugin for automatically import global dependencies.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/rajdee/postcss-autoimport.svg
[ci]:      https://travis-ci.org/rajdee/postcss-autoimport

## Installation

```console
$ npm install -D postcss-autoimport
```

## Usage

```js
postcss([ require('postcss-autoimport')({
    paths: [
        './css/common/_variables.css',
        './css/common/functions/',
        ...
    ]
}) ])
```

### Options

#### `paths`

Type: `Array`
Default: `[]`

An array of paths to directories or files which should be imported

#### `root`

Type: `String`
Default: process.cwd()

Define the root where to resolve path.



See [PostCSS] docs for examples for your environment.
