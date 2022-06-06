import { spacingScales, SpacingScale } from '$spacing';
import { action, Action } from 'easy-peasy';

export type SpacingStoreModel = {
	selectedScale: SpacingScale;
	selectNewScale: Action<SpacingStoreModel, SpacingScale>;
}

const spacingStore:SpacingStoreModel = {
	selectedScale: spacingScales[1],
	selectNewScale: action((state,payload) => {
		state.selectedScale = payload;
	})
};


export default spacingStore;