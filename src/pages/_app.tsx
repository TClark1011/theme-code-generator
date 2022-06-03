import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { theme } from '$/constants';

function MyApp({ Component, pageProps }: AppProps) {
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
