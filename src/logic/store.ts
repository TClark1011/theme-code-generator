import {spacingStore, SpacingStoreModel} from '$spacing';
import { createStore, createTypedHooks } from 'easy-peasy';

export type StoreModel = {
	spacing: SpacingStoreModel;
}

const store = createStore<StoreModel>({
	spacing: spacingStore,
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreSelector = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;

export default store;