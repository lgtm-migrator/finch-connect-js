import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/finch-connect.min.js',
      format: 'iife',
      name: 'FinchConnect',
      globals: {
        window: 'window'
      }
    },
    plugins: [
      typescript(),
      terser()
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'es'
    },
    plugins: [
      typescript(),
    ]
  },
  {
    input: 'dist/dts/index.d.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',

    },
    plugins: [
      dts()
    ]
  }
]
