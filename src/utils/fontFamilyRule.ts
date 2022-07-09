import { Array } from '$/models/utilityTypes';
import { _surround } from '$/utils/surround';
import { A, F, flow, S } from '@mobily/ts-belt';

const wrapInQuotes = _surround('"');
const hasSpace = S.includes(' ');
const wrapInQuotesIfNeeded = F.when(hasSpace, wrapInQuotes);

const fontFamilyRule: (p: Array<string>) => string = flow(
  A.map(wrapInQuotesIfNeeded),
  A.join(', ')
);

export default fontFamilyRule;
