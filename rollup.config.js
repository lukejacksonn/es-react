import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const external = ['dns', 'fs', 'path', 'url'];
const externalPredicate = new RegExp(`^(${external.join('|')})($|/)`);
const externalTest = id => externalPredicate.test(id);

const config = (isProduction = false) => ({
  onwarn: () => {},
  treeshake: { propertyReadSideEffects: false },
  external: externalTest,
  plugins: [
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
      },
    }),
    babel({
      babelrc: false,
      plugins: [
        'babel-plugin-macros'
      ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development'
      )
    })
  ]
});

export default [
  {
    ...config(true),
    input: './src/codegen.js',
    output: {
      file: './index.js',
      format: 'esm'
    }
  },
  {
    ...config(false),
    input: './src/codegen.dev.js',
    output: {
      file: './dev.js',
      format: 'esm'
    }
  }
];
