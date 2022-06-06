import {  spacingScales } from '$spacing';
import { Box, BoxProps, Select } from '@mantine/core';
import { useCallback } from 'react';
import { useStoreDispatch, useStoreSelector } from '$/logic';
const SpacingScaleSelection: React.FC<BoxProps<'div'>> = ({ ...props }) => {
	const selectedScale = useStoreSelector(s => s.spacing.selectedScale);
	const dispatch = useStoreDispatch();
	

	const onChange = useCallback(
		(newlySelectedId: string) => {
			const newSelection = spacingScales.find(
				({ id }) => id === newlySelectedId
			);
			if (!newSelection) {
				throw Error('No spacing scale found with id: ' + newlySelectedId);
			}
			dispatch.spacing.selectNewScale(newSelection);
		},
		[dispatch]
	);

	return (
		<Box {...props}>
			<Select
				label="Spacing Scale"
				value={selectedScale.id}
				data={spacingScales.map(({ id, name }) => ({ value: id, label: name }))}
				onChange={onChange}
			/>
		</Box>
	);
};

export default SpacingScaleSelection;
