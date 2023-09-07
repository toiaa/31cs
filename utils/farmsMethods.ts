import { GaugeCardData } from '@/ts/interfaces'
import { FarmsCardData, GaugeCardList, TransactionType } from '@/ts/types'
import base_abi from '@/utils/abis/base.json'
import abi from '@/utils/abis/bondingCurve.json'
import plugin_abi from '@/utils/abis/plugin.json'
import { BigNumber } from '@ethersproject/bignumber'
import { ExternalProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import gaugeAbi from './abis/gauge.json'
import { CONTRACTS } from './constants'
import { NETWORK_RPC } from './networks'

export const getFarmsData = async (address: string, chainId: number) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(NETWORK_RPC[chainId][0])
    const contract = new ethers.Contract(CONTRACTS[chainId].bondingCurve, abi, provider)
    const plugins: string[] = await contract.getPlugins()
    const pluginsLength = plugins.length.toString()
    const gaugeCards: FarmsCardData[] = await contract.getGaugeCards('0', pluginsLength, address)
    return gaugeCards
  } catch (error) {
    return []
  }
}

export const orderFarmsData = (data: FarmsCardData[]) => {
  const storeData: GaugeCardList = data.map((gauge) => {
    const [
      plugin,
      underlyingAddress,
      underlyingDecimals,
      gaugeAddress,
      isAlive,
      protocol,
      symbol,
      tokensInUnderlying,
      priceBase,
      priceOTOKEN,
      rewardPerToken,
      rewardPerTokenUSD,
      votingWeight,
      totalSupply,
      accountUnderlyingTokens,
      accountStakedTokens,
      accountEarnedOTOKEN,
    ] = gauge
    const gaugeCardData: GaugeCardData = {
      plugin,
      underlyingAddress,
      underlyingDecimals,
      gaugeAddress,
      isAlive,
      protocol,
      symbol,
      tokensInUnderlying,
      priceBase: BigNumber.from(priceBase),
      priceOTOKEN: BigNumber.from(priceOTOKEN),
      rewardPerToken: BigNumber.from(rewardPerToken),
      rewardPerTokenUSD: BigNumber.from(rewardPerTokenUSD),
      votingWeight: BigNumber.from(votingWeight),
      totalSupply: BigNumber.from(totalSupply),
      accountUnderlyingTokens: BigNumber.from(accountUnderlyingTokens),
      accountStakedTokens: BigNumber.from(accountStakedTokens),
      accountEarnedOTOKEN: BigNumber.from(accountEarnedOTOKEN),
    }
    return gaugeCardData
  })
  return storeData
}

export const getGaugeRewards = async (gaugeAddress: string, userAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(gaugeAddress, gaugeAbi, signer)
    const tx: TransactionType = await contract.getReward(userAddress)
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}

export const approvePlugin = async (underlyingAddress: string, pluginAddress: string, amount: BigNumber) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const underlyingContract = new ethers.Contract(underlyingAddress, base_abi, signer)
    const tx: TransactionType = await underlyingContract.approve(pluginAddress, amount)
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}

export const depositInPlugin = async (pluginAddress: string, amount: BigNumber, userAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const pluginContract = new ethers.Contract(pluginAddress, plugin_abi, signer)
    const tx: TransactionType = await pluginContract.depositFor(userAddress, amount)
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}
export const withdrawToPlugin = async (pluginAddress: string, amount: BigNumber, userAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const pluginContract = new ethers.Contract(pluginAddress, plugin_abi, signer)
    const tx: TransactionType = await pluginContract.withdrawTo(userAddress, amount)
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}
