import ErrorMessage from '@/components/ErrorMessage'
import ResetAction from '@/components/WebButtons/ResetAction'
import VoteAction from '@/components/WebButtons/VoteAction'
import { useStoreAccountStats, useStoreBribes } from '@/store'
import { UserVotes } from '@/ts/interfaces'
import { ERRORS, WEEK } from '@/utils/constants'
import React, { useCallback, useMemo, useState } from 'react'
import ListHeader from './ListHeader'
import ListRow from './ListRow'

const VoteList = () => {
  const { bribes } = useStoreBribes()
  const { accountIsLastVote } = useStoreAccountStats()
  const [userVotes, setUserVotes] = useState<UserVotes>({})
  const ONE_HUNDRED = 10000
  const getStatusLastVote = useCallback((): boolean => {
    const currentUnixTime = Math.floor(Date.now() / 1000)
    const lastEpochStartTime = Math.floor(currentUnixTime / WEEK) * WEEK
    const lastVote = Number(accountIsLastVote)

    return lastVote > lastEpochStartTime
  }, [accountIsLastVote])

  const updateUserVotes = (address: string, value: string) => {
    if (Number(value) > 0) {
      const parsedValue = Number(value) * ONE_HUNDRED
      setUserVotes((prevUserVotes) => ({
        ...prevUserVotes,
        [address]: parsedValue.toString(),
      }))
    } else {
      setUserVotes((prevUserVotes) => {
        const updatedUserVotes = { ...prevUserVotes }
        delete updatedUserVotes[address]
        return updatedUserVotes
      })
    }
  }

  const errorMessage: string = useMemo(() => {
    const total = Object.values(userVotes).reduce((acc, current) => Number(acc) + Number(current), 0)
    return total / ONE_HUNDRED > 100 ? ERRORS.votes : ''
  }, [userVotes])

  return (
    <div className='w-full flex flex-col gap-2 py-2'>
      <ListHeader />
      {bribes.map((bribe) => (
        <ListRow key={bribe.bribeAddress} bribe={bribe} updateVotes={updateUserVotes} />
      ))}

      <div className='w-full flex justify-end gap-2'>
        <ErrorMessage error={errorMessage} />
        <ResetAction isLastVote={getStatusLastVote()} />
        <VoteAction userVotes={userVotes} isLastVote={getStatusLastVote()} />
      </div>
    </div>
  )
}

export default VoteList
