import '../styles/globals.css'
import React from 'react'
// import NextNProgress from "nextjs-progressbar";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      {/* <NextNProgress
        color="#3c55ff"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        spinner={false}
        showOnShallow={true}
       /> */}
        <Component {...pageProps} />
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}
