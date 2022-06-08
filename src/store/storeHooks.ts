import { StoreDispatch, StoreState } from '$/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;
