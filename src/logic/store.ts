import { spacingStore,  } from '$spacing';
import { init as initialiseStore, Models, RematchDispatch, RematchRootState } from '@rematch/core';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type RootStoreModel = Models<RootStoreModel> & {
	spacing: typeof spacingStore;
}


const models: RootStoreModel = {
	spacing: spacingStore
};

const store = initialiseStore({
	models
});

export type RootState = RematchRootState<RootStoreModel>;
export type Dispatch = RematchDispatch<RootStoreModel>

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useStoreDispatch = useDispatch<Dispatch>;

export default store;