import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import $ from "jquery";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
