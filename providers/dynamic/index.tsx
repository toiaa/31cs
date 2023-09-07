import { WrapperInterface } from '@/ts/interfaces'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum-all'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'

const DynamicWagmiProvider = ({ children }: WrapperInterface) => {
  return (
    <DynamicContextProvider
      theme='dark'
      settings={{
        initialAuthenticationMode: 'connect-only',
        walletConnectors: [EthereumWalletConnectors],
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
      }}>
      {children}
    </DynamicContextProvider>
  )
}
export default DynamicWagmiProvider
