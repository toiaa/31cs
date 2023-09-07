import Countdown from 'react-countdown'

const CountdownSection = () => {
  const daysUntilThursday = () => {
    const now = new Date()
    const currentDay = now.getDay()
    const daysRemaining = currentDay < 4 ? 4 - currentDay : 11 - currentDay
    return daysRemaining
  }

  const countdownDate = new Date()
  countdownDate.setDate(countdownDate.getDate() + daysUntilThursday())
  countdownDate.setHours(12, 0, 0, 0)

  return (
    <Countdown
      date={countdownDate}
      renderer={({ days, hours, minutes }) => <span>{`${days}d:${hours}h:${minutes}m`}</span>}
    />
  )
}

export default CountdownSection
