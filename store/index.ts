import {
  StoreAccountType,
  StoreActionType,
  StoreInputType,
  StoreSettingType,
  StoreStatsType,
  StoreAccountStatsType,
  StoreSwapType,
  StoreTokenRewardsType,
  StoreTokensType,
  StoreTxType,
  StoreStatusContractsType,
} from '@/ts/types'
import { APPROVAL_TABS, CONTRACT_ZERO, DEFAULT_NETWORK, SLIPPAGE_TABS, TRANSACTION_SPEED_TABS } from '@/utils/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const DEFAULT_VALUE = BigNumber.from('0')

/* Store for tracking token prices */
export const useStoreTokensPrice = create<StoreTokensType>(() => ({
  wrapped: DEFAULT_VALUE, // Wrapped token price
  token: DEFAULT_VALUE, // Token price
  otoken: DEFAULT_VALUE, // Otoken price
  vtoken: DEFAULT_VALUE, // Vtoken price
  credit: DEFAULT_VALUE, // Credit token price
  debt: DEFAULT_VALUE, // Debt token price
  votingPower: DEFAULT_VALUE, // Voting power price
}))

/* Store for tracking token balances */
export const useStoreBalance = create<StoreTokensType>(() => ({
  wrapped: DEFAULT_VALUE, // Wrapped token balance
  token: DEFAULT_VALUE, // Token balance
  otoken: DEFAULT_VALUE, // Otoken balance
  vtoken: DEFAULT_VALUE, // Vtoken balance
  credit: DEFAULT_VALUE, // Credit token balance
  debt: DEFAULT_VALUE, // Debt token balance
  votingPower: DEFAULT_VALUE, // Voting power balance
}))

/* Store for tracking token rewards */
export const useStoreRewards = create<StoreTokenRewardsType>(() => ({
  wrapped: DEFAULT_VALUE, // wrapped token rewards
  token: DEFAULT_VALUE, // Token rewards
  otoken: DEFAULT_VALUE, // Otoken rewards
  totalRewards: DEFAULT_VALUE, // Total rewards
  stakingRewards: DEFAULT_VALUE, // Staking rewards
  farmingRewards: DEFAULT_VALUE, // Farming rewards
}))

export const useStoreAccountStats = create<StoreAccountStatsType>(() => ({
  accountVotingPower: DEFAULT_VALUE, // Account voting power
  accountUsedWeights: DEFAULT_VALUE, // Account used weights
  accountMaxWidthdraw: DEFAULT_VALUE, // Account max withdraw
  accountIsLastVote: DEFAULT_VALUE, // Account last Vote timestamp
}))

/* Store for tracking statistics */
export const useStoreStats = create<StoreStatsType>(() => ({
  tvl: DEFAULT_VALUE, // Total Value Locked
  circulatingTOKEN: DEFAULT_VALUE, // Supply of token tokens
  stakedTOKEN: DEFAULT_VALUE, // Supply of Vtoken tokens
  apr: DEFAULT_VALUE, // Annual Percentage Rate
  ltv: DEFAULT_VALUE, // Loan-to-Value ratio
  marketCap: DEFAULT_VALUE, // Market Capitalization
  emission: DEFAULT_VALUE, // Emission OTOKEN per week value
  maxMarketSell: DEFAULT_VALUE, // Max Market Sell to use on the Swap
}))

/* Store for tracking inputs */
export const useStoreInput = create<StoreInputType>(() => ({
  inputValue: '0',
  craftValue: '0',
  outputValue: '0',
  activeValue: null,
}))

/* Store for tracking Swap Panel */
export const useStoreSwap = create<StoreSwapType>(() => ({
  isDisabled: false,
  message: '',
}))

/* Store for tracking Settings */
export const useStoreSettings = create<StoreSettingType>()(
  persist(
    () => ({
      unlimitedApproval: APPROVAL_TABS[0],
      slippage: SLIPPAGE_TABS[0],
      customSlippage: '',
      slippageToletance: '0',

      txSpeed: TRANSACTION_SPEED_TABS[3],
      deadline: '30',
    }),
    {
      name: 'setting-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => !['slippageToletance'].includes(key))),
    },
  ),
)

/* Store for Smart Contract action */
export const useStoreAction = create<StoreActionType>(() => ({
  actionSelected: null,
  tokens: null,
  minAmount: DEFAULT_VALUE,
  autoMinOutput: DEFAULT_VALUE,
  isBuy: true,
}))

/* Store for tracking Account */
export const useStoreAccount = create<StoreAccountType>(() => ({
  address: CONTRACT_ZERO,
  isConnected: false,
  chainId: DEFAULT_NETWORK,
  whitelistedNetwork: false,
}))

/* Store for tracking Transaction */
export const useStoreTx = create<StoreTxType>(() => ({
  txPrepared: false,
  txLoading: false,
  txSuccess: false,
  txError: false,
  hash: null,
}))

/* Store for tracking inputs */
export const useStatusContracts = create<StoreStatusContractsType>(() => ({
  loadingBonding: true,
}))
