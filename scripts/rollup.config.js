import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

import expandExportsPlugin from './expand-exports-plugin';
import replaceAssignPlugin from './replace-object-assign';

const exportsMap = (isProduction = false) => ({
  react: `react/cjs/react.${isProduction ? 'production.min' : 'development'}.js`,
  'react-dom': `react-dom/cjs/react-dom.${isProduction ? 'production.min' : 'development'}.js`,
  'prop-types': 'prop-types/index.js',
});

const config = (isProduction = false) => ({
  input: {
    index: './src/index.js',
    react: './src/react.js',
    'react-dom': './src/react-dom.js',
    'prop-types': './src/prop-types.js'
  },
  plugins: [
    babel({
      babelrc: false,
      plugins: [
        // This expands all our exports
        [expandExportsPlugin, {
          map: exportsMap(isProduction)
        }],
        // This replaces object-assign with native Object.assign
        replaceAssignPlugin
      ],
    }),
    nodeResolve({
      mainFields: ['module', 'jsnext', 'main'],
      browser: true,
    }),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        react: Object.keys(require('react')),
        'react-dom': Object.keys(require('react-dom')),
        'prop-types': Object.keys(require('prop-types')),
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development'
      )
    })
  ],
  onwarn: () => {},
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false
  }
});

export default [
  {
    ...config(true),
    output: {
      dir: './',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      format: 'esm'
    }
  },
  {
    ...config(false),
    output: {
      dir: './dev',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      format: 'esm'
    }
  }
];
