import * as path from 'path';
import esbuild, { BuildResult } from 'esbuild';
import { reserveIdentifiersPlugin } from '../src/index';

const createBuild = async (files: string[]) => {
  files = files.map((file) => {
    return path.join(__dirname, file);
  });

  await esbuild
    .build({
      entryPoints: files,
      plugins: [
        reserveIdentifiersPlugin({
          identifiers: [
            'ty',
            'wx',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            '_',
            '$',
          ],
        }),
      ],
      write: false,
      bundle: true,
      target: 'es6',
      sourcemap: false,
      outbase: __dirname,
      outdir: 'dist',
      minify: true,
      external: ['react', 'react-dom'],
    })
    .then((result) => {
      expect(result.errors.length).toBe(0);
      expect(result.outputFiles.map((f) => f.text)).toMatchSnapshot();
    })
    .catch((error: BuildResult) => {
      expect(error.errors.length).toBe(1);
      expect(error.errors[0].text).toContain('Expected ")" but found ";"');
    });
};

describe('index', () => {
  describe('esbuild-plugin-reserve-identifiers', () => {
    it('basic', async () => {
      await createBuild(['./fixtures/basic/index.ts']);
    });

    it('react', async () => {
      await createBuild(['./fixtures/react/index.tsx']);
    });

    it('react-jsx', async () => {
      await createBuild(['./fixtures/react-jsx/index.jsx']);
    });

    it('async', async () => {
      await createBuild(['./fixtures/async/index.ts']);
    });

    it('error', async () => {
      await createBuild(['./fixtures/error/index.ts']);
    });
  });
});
