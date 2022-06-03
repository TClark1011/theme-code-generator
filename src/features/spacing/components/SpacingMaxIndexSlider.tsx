import { spacingSettingsAtom } from '$/features/spacing/store';
import { Box, BoxProps, InputWrapper, Slider } from '@mantine/core';
import { D } from '@mobily/ts-belt';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { useCallback } from 'react';

const maxIndexAtom = selectAtom(spacingSettingsAtom, D.getUnsafe('maxIndex'));

const SpacingMaxIndexSlider: React.FC<BoxProps<'div'>> = (props) => {
	const maxIndex = useAtomValue(maxIndexAtom);
	const dispatch = useSetAtom(spacingSettingsAtom);

	const onChange = useCallback(
		(newlySelectedIndex: number) => {
			dispatch({ type: 'setMaxIndex', payload: newlySelectedIndex });
		},
		[dispatch]
	);

	return (
		<Box {...props}>
			<InputWrapper label="Maximum Value">
				<Slider
					value={maxIndex}
					min={4}
					max={16}
					onChange={onChange}
				/>
			</InputWrapper>
		</Box>
	);
};

export default SpacingMaxIndexSlider;