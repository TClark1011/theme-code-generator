import { RootStoreModel } from '$/logic';
import { spacingScales, SpacingScale } from '$spacing';
import { createModel } from '@rematch/core';

export type SpacingStoreModel = {
	selectedScale: SpacingScale;
}

const spacingStore = createModel<RootStoreModel>()({
	state: {
		selectedScale: spacingScales[0]
	} as SpacingStoreModel,
	reducers: {
		selectNewScale: (state, payload: SpacingScale) => {
			state.selectedScale = payload;
		}
	}
});

export default spacingStore;