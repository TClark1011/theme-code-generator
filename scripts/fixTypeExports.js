/* eslint-disable @typescript-eslint/no-var-requires */
const replace = require('replace-in-file');

replace({
  files: 'src/**/models/index.ts',
  from: new RegExp('export { default', 'g'),
  to: 'export type { default',
  allowEmptyPaths: true,
});
