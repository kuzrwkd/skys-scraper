import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths';
import {build} from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: false,
  platform: 'node',
  target: 'node20',
  outfile: 'bin/index.js',
  plugins: [TsconfigPathsPlugin({tsconfig: './tsconfig.build.json'})],
}).catch(error => {
  console.error(error);
  process.exit(1);
});
