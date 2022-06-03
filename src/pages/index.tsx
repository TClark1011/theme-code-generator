import type { NextPage } from 'next';
import { Box, Text } from '@mantine/core';
import { spacingScales, SpacingVisualization } from '$spacing';

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
			<SpacingVisualization maxIndex={10} scale={spacingScales[0]} />
		</Box>
	);
};

export default Home;
