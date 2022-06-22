import { Array } from '$/models/utilityTypes';
import { _surround } from '$/utils/surround';
import { A, flow } from '@mobily/ts-belt';

const wrapInQuotes = _surround('"');

const fontFamilyRule: (p: Array<string>) => string = flow(A.map(wrapInQuotes), A.join(', '));

export default fontFamilyRule;
