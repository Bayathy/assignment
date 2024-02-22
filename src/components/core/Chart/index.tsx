import type { FC } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
  populations: {
    label: string
    data: {
      year: number
      value: number
    }[]
  }[]
}

export const Chart: FC<Props> = ({ populations }) => {
  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart width={600} height={300}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="year" tickFormatter={val => `${val}年`} allowDuplicatedCategory={false} />
        <YAxis tickFormatter={val => `${val / 10000}万`} />
        <Tooltip />
        {populations.map(population => (
          <Line dataKey="value" data={population.data} name={population.label} key={population.label} />
        ))}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}
