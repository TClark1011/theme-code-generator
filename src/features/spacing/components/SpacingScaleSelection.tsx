import { useAtom } from 'jotai';
import { spacingSettingsAtom, spacingScales } from '$spacing';
import { Box, BoxProps, Select } from '@mantine/core';
import { useCallback } from 'react';

const SpacingScaleSelection: React.FC<BoxProps<'div'>> = ({ ...props }) => {
	const [spacingSystemState, dispatch] = useAtom(spacingSettingsAtom);

	const onChange = useCallback(
		(newlySelectedId: string) => {
			const newSelection = spacingScales.find(
				({ id }) => id === newlySelectedId
			);
			if (!newSelection) {
				throw Error('No spacing scale found with id: ' + newlySelectedId);
			}
			dispatch({ type: 'selectScale', payload: newSelection });
		},
		[dispatch]
	);

	return (
		<Box {...props}>
			<Select
				label="Spacing Scale"
				value={spacingSystemState.selectedScale.id}
				data={spacingScales.map(({ id, name }) => ({ value: id, label: name }))}
				onChange={onChange}
			/>
		</Box>
	);
};

export default SpacingScaleSelection;
