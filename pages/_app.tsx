import '@/styles/globals.css'
import Layout from '@/components/Layout'
import DynamicWagmiProvider from '@/providers/dynamic'
import type { AppProps } from 'next/app'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicWagmiProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme='dark'
          transition={Slide}
        />
      </Layout>
    </DynamicWagmiProvider>
  )
}
