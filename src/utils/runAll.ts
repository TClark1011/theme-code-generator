import { Array } from '$/models/utilityTypes';

const runAll = <Param>(value: Param, callbacks: Array<(value: Param) => void>): void => {
  callbacks.forEach((callback) => callback(value));
};

export const _runAll =
  <Param>(...callbacks: Array<(value: Param) => void>) =>
  (value: Param) =>
    runAll(value, callbacks);

export default runAll;
