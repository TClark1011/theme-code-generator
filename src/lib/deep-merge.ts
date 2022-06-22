/* ---------------------------------- */
/*                Types               */
/* ---------------------------------- */

/* ---------- Utility Types --------- */
type AnyDict = Record<string, any>;

type ValueOf<T extends AnyDict | any[]> = T[keyof T];
// This should probably be moved into a `utilityTypes`
// file

type DeepPartial<T> = T extends AnyDict
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
// This should probably be moved into a `utilityTypes`
// file

/* ----------- Merge Types ---------- */
type ShallowMergeRecords<A extends AnyDict, B extends AnyDict> = B & Omit<A, keyof B>;

type ShallowMerge<A, B> = A extends AnyDict
  ? B extends AnyDict
    ? ShallowMergeRecords<A, B>
    : B
  : B;

// Take the fields from two object types that are not shared
// between them
type ShallowDiff<A extends AnyDict, B extends AnyDict> = Omit<A, keyof B> & Omit<B, keyof A>;

// Take the fields from two object types that are shared
// between them
export type ShallowOverlap<T extends AnyDict, U extends AnyDict> = Omit<
  T | U,
  keyof ShallowDiff<T, U>
>;

export type DeepMerge<T extends AnyDict, U extends AnyDict> = ShallowDiff<T, U> & {
  [OverlappingKey in keyof ShallowOverlap<T, U>]: [T[OverlappingKey], U[OverlappingKey]] extends [
    AnyDict,
    AnyDict
  ]
    ? ValueOf<T[OverlappingKey]> | ValueOf<U[OverlappingKey]> extends AnyDict // If either of the objects contain nested objects, // perform a deep merge
      ? DeepMerge<T[OverlappingKey], U[OverlappingKey]> // If neither of the objects have nested objects, // do a shallow merge
      : ShallowMerge<T[OverlappingKey], U[OverlappingKey]>
    : U;
};

/* ---------------------------------- */
/*              Main Code             */
/* ---------------------------------- */

/* -------- Utility Functions ------- */
const isObjectLike = (item: any) =>
  typeof item === 'object' && item !== null && !(item instanceof Date);

const isPlainObject = (item: any): item is Record<string, any> =>
  isObjectLike(item) && !Array.isArray(item);

const isDate = (item: unknown): item is Date => item instanceof Date;
const copyDate = (date: Date): Date => new Date(date.getTime());

// Creates a copy of an object by recreating all
// values within it, must be done to avoid mutating
// during the merge
const deepCopy = <T>(item: T): T => {
  // If the object is primitive we just give it back
  if (isDate(item)) {
    return copyDate(item) as any as T;
  }
  if (!isObjectLike(item)) {
    return item;
  }

  const result: AnyDict = {};
  Object.entries(item as AnyDict).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      result[key] = deepCopy(value);
    } else {
      result[key] = value;
    }
  });
  return result as T;
};

/* ----------- Merge Code ----------- */

// NOTE: If your project already includes a merge
// function (eg; lodash's merge) you can use that
// as the untyped merge and adapt the `deepMerge`
// function to use that.

// Performs the actual merge, the 'deepMerge' function
// just runs this function and injects correct typing
const untypedMerge = (source: AnyDict, update: AnyDict): AnyDict => {
  // Use the source as the starting point for the result
  // We run source through `deepCopy` to prevent mutating it
  const result: AnyDict = deepCopy(source);

  Object.entries(update).forEach(([key, valueFromUpdate]) => {
    const valueFromSource = source[key];

    const bothValuesArePlainObjects = [valueFromSource, valueFromUpdate].every(isPlainObject);

    if (bothValuesArePlainObjects) {
      // Merge the values if they are both objects
      result[key] = untypedMerge(valueFromSource, valueFromUpdate);
    } else {
      // If only 1 or neither of them are objects, replace
      // with value from update
      result[key] = valueFromUpdate;
    }
  });

  return result;
};

// We have to use function keyword cus otherwise TS gives
// an error about having to infer the type of the variable.
// I guess we get around by declaring it with the `function`
// keyword
function deepMerge<Source extends AnyDict, Update extends AnyDict>(
  source: Source,
  update: Update
): DeepMerge<Source, Update> {
  return untypedMerge(source, update) as DeepMerge<Source, Update>;
}

// This functions identically to the `deepMerge` function,
// but with the type of the second parameter being a deep
// partial version of the first, and the return type
// being the type of the first param. This is useful for
// providing an 'update' of an object without changing it's
// type, eg; in a redux reducer.
export function deepUpdate<Source extends AnyDict>(source: Source, update: DeepPartial<Source>) {
  return deepMerge(source, update) as any as Source;
}

// NOTE: When importing this into a project, try out using
// an arrow function for the `deepMerge` functions. The
// `function` keyword is used here because that was the
// only way to get it to work when this was initially written
// in a `tsdx` template project.

export default deepMerge;
