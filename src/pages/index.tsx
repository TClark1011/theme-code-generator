import type { NextPage } from 'next';
import { Box, Text } from '@mantine/core';
import { SpacingMaxIndexSlider, SpacingVisualization } from '$spacing';

const Home: NextPage = () => {
	return (
		<Box
			component="main"
			sx={{
				paddingLeft: '2rem',
				paddingRight: '2rem',
			}}
		>
			<Text>Hi</Text>
			<SpacingVisualization  />
			<SpacingMaxIndexSlider />
		</Box>
	);
};

export default Home;
