import '../styles/globals.css'
import "../public/fonts/fonts.css"

import type { AppProps } from 'next/app'

import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fas } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false
library.add(fas)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
