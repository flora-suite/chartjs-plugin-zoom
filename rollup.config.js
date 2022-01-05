const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const terser = require('rollup-plugin-terser').terser;

const pkg = require('./package.json');
const dependencies = Object.keys(pkg.dependencies);
const peerDependencies = Object.keys(pkg.peerDependencies);
const allDependencies = dependencies.concat(peerDependencies);

const banner = `/*!
 * @license
 * ${pkg.name}
 * http://chartjs.org/
 * Version: ${pkg.version}
 *
 * Copyright Foxglove Technologies Inc
 * Released under the MIT license
 * https://github.com/foxglove/chartjs-plugin-zoom/blob/master/LICENSE.md
 */`;

const name = 'ChartZoom';
const globals = {
  'chart.js': 'Chart',
  'chart.js/helpers': 'Chart.helpers',
  hammerjs: 'Hammer'
};
allDependencies.push('chart.js/helpers');

module.exports = [
  {
    input: 'src/index.js',
    output: {
      name,
      file: 'dist/chartjs-plugin-zoom.js',
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    plugins: [
      commonjs({
        include: 'node_modules/**',
      }),
      nodeResolve(),
    ],
    external: allDependencies
  },
  {
    input: 'src/index.js',
    output: {
      name,
      file: 'dist/chartjs-plugin-zoom.min.js',
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    plugins: [
      commonjs({
        include: 'node_modules/**',
      }),
      nodeResolve(),
      terser({output: {comments: 'some'}})
    ],
    external: allDependencies
  },
  {
    input: 'src/index.esm.js',
    plugins: [
      nodeResolve()
    ],
    output: {
      name,
      file: 'dist/chartjs-plugin-zoom.esm.js',
      banner,
      format: 'esm',
      indent: false
    },
    external: allDependencies
  },
];
