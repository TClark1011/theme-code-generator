import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { theme } from '$/constants';
import { Chart } from 'chart.js';
import { useReducedMotion } from '@mantine/hooks';
import { useMountEffect } from '$/hooks';
import { StoreProvider } from 'easy-peasy';
import {store} from '$/logic';
import {ComponentProps} from 'react';
import { WithChildren } from '$/models';

type ProviderProps = ComponentProps<typeof StoreProvider>;
const StoreProviderOverride = StoreProvider as unknown as React.FC<ProviderProps & WithChildren>;

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
			<StoreProviderOverride store={store}>
				<Component {...pageProps} />
			</StoreProviderOverride>
		</MantineProvider>
	);
}

export default MyApp;
