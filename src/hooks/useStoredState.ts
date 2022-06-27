import createStorageAtom, { StorageAtom, StorageType } from '$storage-atom';
import { useEffect, useRef, useState } from 'react';

const useStoredState = <Value>(type: StorageType, key: string, defaultValue: Value) => {
  const storageAtomRef = useRef<StorageAtom<Value>>(createStorageAtom(type, key, defaultValue));

  const [state, setState] = useState(storageAtomRef.current.get);

  useEffect(() => {
    storageAtomRef.current.set(state);
  }, [state]);

  return [state, setState] as const;
};

export default useStoredState;
