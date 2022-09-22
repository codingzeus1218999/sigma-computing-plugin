import React from 'react'
import { RadialBarChart, RadialBar, Legend, Tooltip, } from 'recharts';


const data = [
  {
    "name": "18-24",
    "uv": 31.47,
    "pv": 2400,
    "fill": "#8884d8"
  },
  {
    "name": "25-29",
    "uv": 26.69,
    "pv": 4567,
    "fill": "#83a6ed"
  },
  {
    "name": "30-34",
    "uv": -15.69,
    "pv": 1398,
    "fill": "#8dd1e1"
  },
  {
    "name": "35-39",
    "uv": 8.22,
    "pv": 9800,
    "fill": "#82ca9d"
  },
  {
    "name": "40-49",
    "uv": 85,
    "pv": 3908,
    "fill": "#a4de6c"
  },
  {
    "name": "50+",
    "uv": -2.63,
    "pv": 4800,
    "fill": "#d0ed57"
  },
  {
    "name": "unknow",
    "uv": 6.67,
    "pv": 4800,
    "fill": "#ffc658"
  }
]


function Radical() {
  return (
    <RadialBarChart

      margin={{ top: 20, bottom: 20, left: 10, right: 20 }}
      width={750}
      height={400}
      innerRadius="10%"
      outerRadius="80%"
      data={data}
      startAngle={180}
      endAngle={0}

      style={{
        background: 'white',
        border: '1px solid black',
        margin: '50px auto',
      }}
    >
      <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
      <Tooltip />
    </ RadialBarChart>
  )
}

export default Radical