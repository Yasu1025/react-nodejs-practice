import { VFC, memo, useEffect } from 'react'
import { AWrapper } from '../components/layouts/AWrapper'
import * as c3 from 'c3'
import axios from 'axios'

export const Dashboard: VFC = memo(() => {
  useEffect(() => {
    const getChart = async () => {
      const { data } = await axios.get('/api/orders/chart')
      chart.load({
        columns: [
          ['x', ...data.map((c: any) => c.date)],
          ['sales', ...data.map((c: any) => c.sum)],
        ],
      })
    }

    const chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x', 1, 2, 3],
          ['sales', '2021-1-1', '2021-2-3'],
        ],
        types: { sales: 'bar' },
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
          },
        },
      },
    })

    getChart()
  }, [])

  return (
    <AWrapper>
      <h2>daily Sales</h2>
      <div id="chart"></div>
    </AWrapper>
  )
})
