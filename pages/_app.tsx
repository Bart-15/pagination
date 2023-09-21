import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ThemeRegistry from '@/theme/ThemeRegistry'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeRegistry>
      <Component {...pageProps} />
    </ThemeRegistry>
  ) 
}

export default MyApp
