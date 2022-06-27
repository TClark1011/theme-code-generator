import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Chart } from 'chart.js';
import { useReducedMotion } from '@mantine/hooks';
import { Provider as StoreProvider } from 'react-redux';
import store from '$/store/store';
import theme, { defaultStyles } from '$/constants/theme';
import useMountEffect from '$/hooks/useMountEffect';
import StoreSideEffects from '$/store/StoreSideEffects';
import { AnalyticsProvider } from '$analytics';
import { APP_DOMAIN } from '$/constants/branding';
import { ANALYTICS_ENABLED } from '$/constants/env';

function MyApp({ Component, pageProps }: AppProps) {
  const clientPrefersReducedMotion = useReducedMotion();

  useMountEffect(() => {
    if (clientPrefersReducedMotion) {
      Chart.defaults.animation = false;
    }
  });

  return (
    <AnalyticsProvider domain={APP_DOMAIN} enabled={ANALYTICS_ENABLED}>
      <MantineProvider theme={theme} styles={defaultStyles} withGlobalStyles withNormalizeCSS>
        <StoreProvider store={store}>
          <StoreSideEffects />
          <Component {...pageProps} />
        </StoreProvider>
      </MantineProvider>
    </AnalyticsProvider>
  );
}

export default MyApp;
