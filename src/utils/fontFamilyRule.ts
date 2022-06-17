import { Array } from '$/models/utilityTypes';
import { _surround } from '$/utils/surround';
import { A, flow } from '@mobily/ts-belt';

const fontFamilyRule: (p: Array<string>) => string = flow(A.map(_surround('"')), A.join(', '));

export default fontFamilyRule;
