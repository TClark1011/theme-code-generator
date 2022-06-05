import type { NextPage } from 'next';
import { Box } from '@mantine/core';
import { SpacingMaxIndexSlider, SpacingScaleSelection, SpacingVisualization } from '$spacing';

const Home: NextPage = () => {
	return (
		<Box
			component="main"
			sx={{
				paddingLeft: '2rem',
				paddingRight: '2rem',
			}}
		>
			<SpacingVisualization  />
			<SpacingScaleSelection />
			<SpacingMaxIndexSlider />
		</Box>
	);
};

export default Home;
