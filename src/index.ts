import fs from 'fs';
import path from 'path';
import { Loader, Plugin } from 'esbuild';

const loaderMap: Record<string, Loader> = {
  '.ts': 'ts',
  '.tsx': 'tsx',
  '.js': 'js',
  '.jsx': 'jsx',
  '.mjs': 'js',
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function slash(path: string) {
  const isExtendedLengthPath = path.startsWith('\\\\?\\');

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
}

export function reserveIdentifiersPlugin(
  options:
    | { filter?: RegExp; identifiers: string[] }
    | {
        filter?: RegExp;
        /**
         * @deprecated Use `identifiers` instead
         */
        reserveIdentifiers: string[];
      }
) {
  return {
    name: 'reserve-identifiers',
    setup(build) {
      const identifiers = 'reserveIdentifiers' in options ? options.reserveIdentifiers : options.identifiers;
      const reserveIdentifiersCode = `(${identifiers.map((key) => `typeof ${key}`).join(',')});\n`;

      const initialOptions = build.initialOptions;
      const entryPoints = initialOptions.entryPoints;

      function isEntryPoint(filePath: string) {
        if (isObject(entryPoints)) {
          return Object.values(entryPoints).some((entryPoint) => {
            if (isString(entryPoint)) {
              return slash(path.resolve(entryPoint)) === slash(filePath);
            }
            return false;
          });
        }
        if (isArray(entryPoints)) {
          return entryPoints.some((entryPoint) => {
            if (isString(entryPoint)) {
              return slash(path.resolve(entryPoint)) === slash(filePath);
            }
            if (isObject(entryPoint)) {
              const inputPath = entryPoint.in;
              return slash(path.resolve(inputPath)) === slash(filePath);
            }
            return false;
          });
        }
      }

      build.onLoad({ filter: options?.filter || /\.([tj]sx?|mjs)$/ }, async (args) => {
        if (isEntryPoint(args.path)) {
          const extname = path.extname(args.path);
          const content = fs.readFileSync(args.path, 'utf-8');

          const code = reserveIdentifiersCode + content;
          return { contents: code, watchFiles: [args.path], loader: loaderMap[extname] || 'js' };
        }
        return null;
      });
    },
  } as Plugin;
}
