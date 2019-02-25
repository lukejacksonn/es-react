# es-react
> an es module exposing the latest version of react and react-dom

Ever wanted to just import [React](https://github.com/facebook/react) into your project as a module **without** a build step or even script tags? It is 2019 now and browser support for native module imports is [pretty good](https://caniuse.com/#feat=es6-module) so this should be possible but the react team – for one reason or another – haven't decided to provide a build that will let you do this yet.

This package however allows you import `react` and `react-dom` straight from a CDN:

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react';

ReactDOM.render(
  React.createElement('h1', {}, 'Hello from es-react'),
  document.body
)
```

## Features

- All the latest react features (hooks, suspense, lazy, memo etc.)
- Use react directly from any javascript file (no build step required)

## Usage

Import `React` and `ReactDOM` directly from any script with `type="module"`. The package is intended to be available from [`unpkg`](https://unpkg.com) (without having to append `?module` to the package name).

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react@16.8.3';
```

The version of this package is set to match the version of react that it exposes. It is strongly advised that you specify a version when requesting the module – this speeds up the request time and helps with caching. If you don't specify a number then unpkg will redirect and serve up the latest available version.

## Implementation

The latest (development) umd builds of `react` and `react-dom` – which you can find [here](https://unpkg.com/react@16.8.3/umd/react.development.js) and [here](https://unpkg.com/react-dom@16.8.3/) respectively – were taken and edited by hand in order to suitable for distribution as an ES module.

This is currently an experiment but if it proves popular (and the react team don't decide to output a similar build) then perhaps I might decide to automate this process in order to keep this package up to date with latest releases.

## Acknowledgements

Barely any of the code in this repo is written by myself. It is just a wrapper for React that is written and maintained by the team at Facebook. Thanks to my employer [Formidable Labs](https://github.com/formidablelabs) for allowing me the time to think about and work on fun and experimental projects like this.
