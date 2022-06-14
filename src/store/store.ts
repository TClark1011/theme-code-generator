import { spacingReducer } from '$spacing';
import generalReducer from '$/store/generalReducer';
import { codeGenerationReducer } from '$code-generation';
import { configureStore } from '@reduxjs/toolkit';
import { colorReducer } from '$color';

const store = configureStore({
  reducer: {
    spacing: spacingReducer,
    codeGeneration: codeGenerationReducer,
    general: generalReducer,
    color: colorReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export type StoreSelector<T> = (p: StoreState) => T;

export default store;
