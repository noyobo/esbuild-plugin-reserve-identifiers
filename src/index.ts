import { Loader, OnLoadResult, Plugin } from 'esbuild';
import fs from 'fs';
import path from 'path';

const loaderMap: Record<string, Loader> = {
  '.ts': 'ts',
  '.tsx': 'tsx',
  '.js': 'js',
  '.jsx': 'jsx',
  '.mjs': 'js',
};

export function reserveIdentifiersPlugin(options: { filter?: RegExp; reserveIdentifiers: string[] }) {
  return {
    name: 'reserve-identifiers',
    setup(build) {
      const reserveIdentifiersCode = `(${options.reserveIdentifiers.join(',')});\n`;

      build.onLoad({ filter: options?.filter || /\.([tj]sx?|mjs)$/ }, args => {
        return new Promise<OnLoadResult>(resolve => {
          const extname = path.extname(args.path);
          const content = fs.readFileSync(args.path, 'utf-8');
          resolve({
            contents: reserveIdentifiersCode + content,
            watchFiles: [args.path],
            loader: loaderMap[extname] || 'js',
          });
        });
      });
    },
  } as Plugin;
}
