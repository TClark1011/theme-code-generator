import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Chart } from 'chart.js';
import { useReducedMotion } from '@mantine/hooks';
import { Provider as StoreProvider } from 'react-redux';
import store from '$/store/store';
import theme from '$/constants/theme';
import useMountEffect from '$/hooks/useMountEffect';

function MyApp({ Component, pageProps }: AppProps) {
  const clientPrefersReducedMotion = useReducedMotion();

  useMountEffect(() => {
    if (clientPrefersReducedMotion) {
      Chart.defaults.animation = false;
    }
  });

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </MantineProvider>
  );
}

export default MyApp;
