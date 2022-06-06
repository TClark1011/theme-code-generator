import {codeGenerationStore} from '$code-generation';
import {generalStore} from '$/logic';
import { spacingStore,  } from '$spacing';
import { init as initialiseStore, Models, RematchDispatch, RematchRootState } from '@rematch/core';
import immerPlugin from '@rematch/immer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export type RootStoreModel = Models<RootStoreModel> & {
	spacing: typeof spacingStore;
	general: typeof generalStore;
	codeGeneration: typeof codeGenerationStore;
}


const models: RootStoreModel = {
	spacing: spacingStore,
	general: generalStore,
	codeGeneration: codeGenerationStore
};

const store = initialiseStore({
	models,
	plugins: [immerPlugin<RootStoreModel>()]
});

export type RootState = RematchRootState<RootStoreModel>;
export type Dispatch = RematchDispatch<RootStoreModel>

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
// eslint-disable-next-line prettier/prettier
export const useStoreDispatch = useDispatch<Dispatch>;

export type Selector<T> = (state: RootState) => T;


export default store;