import { Array } from '$/models/utilityTypes';

type GetMiddleElement = <Element>(arr: Array<Element>) => Element | undefined;
const getMiddleElement: GetMiddleElement = (arr) => {
  const middleIndex = Math.floor(arr.length / 2);
  return arr[middleIndex];
};

export default getMiddleElement;
