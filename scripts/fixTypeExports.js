const replace = require('replace-in-file');

replace({
	files: 'src/**/models/index.ts',
	from: 'export { default',
	to: 'export type { default',
});