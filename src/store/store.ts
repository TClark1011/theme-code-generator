import { generalReducer } from '$/store';
import { codeGenerationReducer } from '$code-generation';
import { spacingReducer } from '$spacing';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    spacing: spacingReducer,
    codeGeneration: codeGenerationReducer,
    general: generalReducer,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
