import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { theme } from '$/constants'

function MyApp({ Component, pageProps }: AppProps) {
  const preferredColorScheme = useColorScheme()
  return (
    <MantineProvider
      theme={{
        ...theme,
        colorScheme: preferredColorScheme,
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
