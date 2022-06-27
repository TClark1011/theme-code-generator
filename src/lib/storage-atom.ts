/**
 * The idea behind a "storage atom" is to invert the
 * way we use the JS storage APIs. Rather than using
 * the base storage controller and accessing specific
 * elements every time we use it, we instead create a
 * new controller (the "atom") which then interfaces
 * with the base API for us.
 **/

export type StorageType = 'local' | 'session';

export const getControllerForStorageMode = (mode: StorageType) =>
  mode === 'local' ? localStorage : sessionStorage;

export type StorageAtom<Value> = {
  set: (p: Value) => void;
  get: () => Value;
  remove: () => void;
  reset: () => Value;
  defaultValue: Value;
  _meta: {
    initializedAt: Date;
    type: StorageType;
    key: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const INTERNAL_stubFn = () => {};

const INTERNAL_createDummyStorageAtom = <Value>(
  type: StorageType,
  key: string,
  defaultValue: Value
): StorageAtom<Value> => ({
  remove: INTERNAL_stubFn,
  get: () => defaultValue,
  reset: () => defaultValue,
  set: INTERNAL_stubFn,
  defaultValue: defaultValue,
  _meta: {
    type,
    initializedAt: new Date(),
    key,
  },
});

export type Stringifier = (p: unknown) => string;
export type Parser = (p: string) => unknown;

export type SerializationController = {
  stringify: Stringifier;
  parse: Parser;
};

const INTERNAL_defaultSerializationController: SerializationController = {
  stringify: JSON.stringify,
  parse: JSON.parse,
};

const createStorageAtom = <Value>(
  type: StorageType,
  key: string,
  defaultValue: Value,
  { parse, stringify } = INTERNAL_defaultSerializationController
): StorageAtom<Value> => {
  try {
    const storageController = getControllerForStorageMode(type);

    const get = (): Value => {
      const rawValue = storageController.getItem(key);

      if (!rawValue) {
        return defaultValue;
      }

      try {
        const parsed = parse(rawValue) as Value;
        return parsed;
      } catch (e) {
        throw Error(`An error occurred while trying to parse the value stored with key "${key}"`);
      }
    };

    const set = (newValue: Value) => {
      const stringified = stringify(newValue);
      storageController.setItem(key, stringified);
    };

    const remove = () => {
      storageController.removeItem(key);
    };

    const reset = () => {
      const stringified = stringify(defaultValue);
      storageController.setItem(key, stringified);
      return defaultValue;
    };

    return {
      get,
      set,
      defaultValue,
      remove,
      reset,
      _meta: {
        initializedAt: new Date(),
        key,
        type,
      },
    };
  } catch (e) {
    //$ Server side rendering will most likely throw an error when
    //$ accessing storage APIs, in that instance we return a dummy
    //$ atom. The atom must get re-initialized on the client in
    //$ order to work
    return INTERNAL_createDummyStorageAtom(type, key, defaultValue);
  }
};

export default createStorageAtom;
