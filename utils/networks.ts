import { POLYGON } from './constants'

export const NETWORKS_LIST = [POLYGON]

export const NETWORK_RPC: { [key: number]: string[] } = {
  [POLYGON]: [
    'https://rpc.ankr.com/polygon_mumbai',
    'https://rpc-mumbai.maticvigil.com',
    'https://polygon-testnet.public.blastapi.io',
  ],
}

export const NETWORK_SCAN: { [key: number]: string } = {
  [POLYGON]: 'https://mumbai.polygonscan.com//tx/',
}
