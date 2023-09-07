import { useStoreBribes } from '@/store'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js'
import { formatEther } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, Colors)

const Chart = () => {
  const { bribes } = useStoreBribes.getState()
  const data = useMemo(() => {
    const labels = []
    const values = []

    for (let i = 0; i < bribes.length; i++) {
      const { votePercent, symbol } = bribes[i]

      const formatVotePercent = Number(formatEther(votePercent)).toFixed(2)
      labels.push(symbol)
      values.push(formatVotePercent)
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Votes',
          data: values,
        },
      ],
    }
  }, [bribes])
  return (
    <div className='relative m-auto lg:h-[250px] lg:w-[250px] h-[200px] w-[200px]'>
      <Pie
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            colors: {
              forceOverride: true,
            },
            tooltip: {
              callbacks: {
                label: function ({ label, raw }) {
                  let newLabel = label || ''
                  if (label) {
                    newLabel += ': '
                  }
                  const value = raw || ''
                  return newLabel + value + '%'
                },
              },
            },
          },
        }}
        data={data}
      />
    </div>
  )
}

export default Chart
