import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { theme } from '$/constants';
import { Chart } from 'chart.js';
import { useReducedMotion } from '@mantine/hooks';
import { useMountEffect } from '$/hooks';

function MyApp({ Component, pageProps }: AppProps) {
	const clientPrefersReducedMotion = useReducedMotion();

	useMountEffect(() => {
		if (clientPrefersReducedMotion) {
			Chart.defaults.animation = false;
		}
	});

	return (
		<MantineProvider
			theme={{
				...theme,
			}}
			withGlobalStyles
			withNormalizeCSS
		>
			<Component {...pageProps} />
		</MantineProvider>
	);
}

export default MyApp;
