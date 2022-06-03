import { Action } from '$/models';
import { SpacingScale, spacingScales } from '$spacing';
import { N } from '@mobily/ts-belt';
import { atomWithReducer } from 'jotai/utils';
import { match } from 'ts-pattern';

export type SpacingSettingsAtomProps = {
  selectedScale: SpacingScale
  maxIndex: number
}

export type SpacingSettingsAtomAction =
  | Action<'selectScale', SpacingScale>
  | Action<'setMaxIndex', number>

const initialSpacingScale: SpacingScale = spacingScales?.[0] ?? {
	id: 'grid4',
	name: 'Grid (4px)',
	generator: N.multiply(4)
};

const spacingSettingsAtom = atomWithReducer<
  SpacingSettingsAtomProps,
  SpacingSettingsAtomAction
>(
	{
		selectedScale: initialSpacingScale,
		maxIndex: 8,
	},
	(state, action: SpacingSettingsAtomAction) =>
		match<SpacingSettingsAtomAction, SpacingSettingsAtomProps>(action)
			.with({ type: 'selectScale' }, ({ payload }) => ({
				...state,
				selectedScale: payload,
			}))
			.with({ type: 'setMaxIndex' }, ({ payload }) => ({
				...state,
				maxIndex: payload,
			}))
			.exhaustive()
);

export default spacingSettingsAtom;
