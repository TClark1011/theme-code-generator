/* eslint-disable @typescript-eslint/no-var-requires */
import { replaceInFileSync } from 'replace-in-file';

try {
  // We update any index file that re-exports a default from a file in
  // `models` file so that it uses `export type`
  replaceInFileSync({
    files: 'src/**/models/index.ts',
    from: new RegExp('export { default', 'g'),
    to: 'export type { default',
    allowEmptyPaths: true,
  });
} catch (err) {
  console.error('An error occurred while attempting to fix type exports: ', err);
}
