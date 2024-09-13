import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/cowsay.ts',
  output: {
    file: 'cowsay.js',
    format: 'es',
    sourcemap: false,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    nodeResolve(),
  ],
};