import '../styles/globals.css'
import React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar'
import Nav from '../components/Nav'
import { SessionProvider } from 'next-auth/react'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function MyApp({ Component, pageProps}) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <SessionProvider session={pageProps.session}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NextNProgress/>
          <Nav />
          <Component {...pageProps} />
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
    </SessionProvider>
  )
}
