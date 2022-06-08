import { Array, WithId } from '$/models';

/* -------- Find Item With Id ------- */
export const findItemWithId = <T extends WithId>(arr: Array<T>, id: string): T | undefined =>
  arr.find((item) => item.id === id);

export const _findItemWithId =
  <T extends WithId>(id: string) =>
  (arr: Array<T>): T | undefined =>
    findItemWithId(arr, id);
