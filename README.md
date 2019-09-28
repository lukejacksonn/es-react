# es-react

> An ES6 module exposing the latest version of react and react-dom

Ever wanted to just import react into your project as a module **without** a build step or even script tags? It is 2019 now and native browser support for module [imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) is [pretty good](https://caniuse.com/#feat=es6-module) so this should be possible if we so wish! Alas, there has not been an ES6 module compatible build released yet.

This package allows you import `react` and `react-dom` as ES6 modules from a CDN like [`unpkg`](https://unpkg.com):

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react';

ReactDOM.render(
  React.createElement('h1', {}, 'Hello from es-react'),
  document.body
);
```

By default es-react exports the development build of react. For the production build use:

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react-production';
```

## Features

- All the latest react features (hooks, suspense, lazy, memo etc.)
- Use react directly from any javascript file (no build step required)
- Compatible with [`htm`](https://github.com/developit/htm) (for JSX compilation at runtime)

## Usage

Import `React` and `ReactDOM` directly from any script with `type="module"`. The package is intended to be available from [`unpkg`](https://unpkg.com) (without having to append `?module` to the package name).

```js
import { React, ReactDOM } from 'https://unpkg.com/es-react@16.8.60';
```

> The version of this package is set to match the version of react that it exposes **except with the patch version number multiplied by 10** – because I messed up a publish.

It is strongly advised that you specify a version when requesting the module – this speeds up the request time and helps with caching. If you don't specify a number then unpkg will redirect and serve up the latest available version.

## Example

Create a new file, copy the code below into it and then open the file in a browser – or [try online](https://codepen.io/lukejacksonn/pen/EMxVWM).

> If you would like the browser to reload when you update the code, then you can use a dev server like [servor](https://github.com/lukejacksonn/servor) dependency free by running `npx servor .`.

```js
<script type="module">

  import { React, ReactDOM } from 'https://unpkg.com/es-react@16.8.60';

  import htm from 'https://unpkg.com/htm?module'
  const html = htm.bind(React.createElement)

  const Counter = props => {
    const [count, setCount] = React.useState(parseInt(props.count))
    return html`
      <div>
        <h1>${count}</h1>
        <button onClick=${e => setCount(count - 1)}>Decrement</button>
        <button onClick=${e => setCount(count + 1)}>Increment</button>
      </div>
    `
  }

  ReactDOM.render(
    html`
      <h1>Look Ma! No script tags, no build step</h1>
      <${Counter} count=0 />
    `,
    document.body
  )

</script>
```

## Implementation

The latest (development) umd builds of [`react`](https://unpkg.com/react@16.8.6/umd/react.development.js) and [`react-dom`](https://unpkg.com/react-dom@16.8.6/umd/react-dom.development.js) were taken and edited by hand in order to be compatible for distribution as an ES module. Nothing more than that.

This is currently an experiment but if it proves popular (and providing the react team don't decide to output a similar build themselves) then perhaps I might try to automate this process in order to keep up to date with official releases.

## Acknowledgements

Barely any of the code in this repo is written by myself. It is just a wrapper for React that is written and maintained by the team at Facebook. Thanks to my employer [Formidable](https://github.com/formidablelabs) for allowing me the time to think about and work on fun and experimental projects like this.
