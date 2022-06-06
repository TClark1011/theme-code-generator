import { RootStoreModel, Selector } from '$/logic';
import { D, F, flow } from '@mobily/ts-belt';
import { createModel } from '@rematch/core';

export type ThemeScaleType = 'spacing';

export type GeneralStoreModel = {
  selectedScaleType: ThemeScaleType;
};

const generalStore = createModel<RootStoreModel>()({
  state: {
    selectedScaleType: 'spacing',
  } as GeneralStoreModel,
  reducers: {
    selectNewType: (state, payload: ThemeScaleType) => {
      state.selectedScaleType = payload;
    },
  },
});

export const selectScaleValues: Selector<string[]> = (state) => {
  switch (state.general.selectedScaleType) {
    case 'spacing':
      return state.spacing.selectedScale.values.map(flow(D.getUnsafe('value'), String));
  }
};

export default generalStore;
