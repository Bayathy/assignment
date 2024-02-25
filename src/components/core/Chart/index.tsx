import type { FC } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Population } from '../../../model/population'
import { generateRandomColor } from '../../../lib/generateRandomColor'

interface Props {
  populationList: Population[]
  mode: 'total' | 'juniors' | 'working' | 'old'
}

export const Chart: FC<Props> = ({ mode, populationList }) => {
  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart width={600} height={300}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="year" range={[1960, 2045]} tickFormatter={val => `${val}年`} allowDuplicatedCategory={false} />
        <YAxis tickFormatter={val => `${val / 10000}万`} />
        <Tooltip formatter={val => `${val}人`} />
        { populationList
        && populationList.map((population, index) => {
          return (
            <Line
              key={index}
              type="monotone"
              dataKey="value"
              stroke={generateRandomColor()}
              name={population.prefName}
              data={population.data[mode === 'total' ? 0 : mode === 'juniors' ? 1 : mode === 'working' ? 2 : 3].data}
            />
          )
        })}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}
