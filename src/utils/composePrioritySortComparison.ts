import { F } from '@mobily/ts-belt';

const composePrioritySortComparison =
  <ItemType, Derivation>(priorityValue: Derivation, deriver: (p: ItemType) => Derivation) =>
  (a: ItemType, b: ItemType): -1 | 0 | 1 => {
    const derivedB = deriver(b);

    if (F.equals(priorityValue, derivedB)) return 1;
    return 0;
  };

export default composePrioritySortComparison;
