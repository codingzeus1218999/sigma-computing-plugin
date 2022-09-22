import React, { useState, useEffect } from 'react'
import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";
import { RadialBarChart, RadialBar, Legend, Tooltip, } from 'recharts';


// const data = [
//   {
//     "name": "18-24",
//     "uv": 31.47,
//     "pv": 2400,
//     "fill": "#8884d8"
//   },
//   {
//     "name": "25-29",
//     "uv": 26.69,
//     "pv": 4567,
//     "fill": "#83a6ed"
//   },
//   {
//     "name": "30-34",
//     "uv": -15.69,
//     "pv": 1398,
//     "fill": "#8dd1e1"
//   },
//   {
//     "name": "35-39",
//     "uv": 8.22,
//     "pv": 9800,
//     "fill": "#82ca9d"
//   },
//   {
//     "name": "40-49",
//     "uv": 85,
//     "pv": 3908,
//     "fill": "#a4de6c"
//   },
//   {
//     "name": "50+",
//     "uv": -2.63,
//     "pv": 4800,
//     "fill": "#d0ed57"
//   },
//   {
//     "name": "unknow",
//     "uv": 6.67,
//     "pv": 4800,
//     "fill": "#ffc658"
//   }
// ]


function Radical() {

  useEditorPanelConfig([
    { name: "source", type: "element" },
    { name: "name", type: "column", source: "source", allowMultiple: false },
    { name: "value", type: "column", source: "source", allowMultiple: false },
    { name: "fill", type: "column", source: "source", allowMultiple: false },
  ]);

  const config = useConfig();
  const columnInfo = useElementColumns(config.source);
  const data = useElementData(config.source);
  const [parseDate, setParseDate] = useState([])

  useEffect(() => {

    const PropColumns = [
      "name",
      "value",
      "fill",

    ]

    const dataSourceColumns = PropColumns.map((x) => {
      return config[x];
    })

    const dataSourceValues = dataSourceColumns.map((x, i) => {
      const colValue = data[x]
      return colValue
    })

    // const mycols = mycolsArray

    // console.log("#########################################3");
    // console.log(PropColumns);
    // console.log(dataSourceColumns);
    // console.log(dataSourceValues);
    // console.log("#########################################3");

    const displayData = []

    if (dataSourceValues[0]) {

      dataSourceValues[0].forEach((title, i) => {
        const k = {}
        PropColumns.forEach((col, j) => {

          if (dataSourceColumns[j]) {
            // console.log(j, i, dataSourceColumns[j], dataSourceValues[j][i])
            if (dataSourceValues[j] && dataSourceValues[j][i]) {
              k[col] = dataSourceValues[j][i] ?? null
            }
          }
        })
        displayData.push(k)
      })
      console.log(displayData);

      setParseDate(displayData)
    } else {
      setParseDate([])
    }

  }, [columnInfo, config, data]);

  const mystyel = {
    padding: "20px",

    display: "flex",
    flexWrap: "wrap",
    gap: "20px",

    justifyContent: "center",
    alignItems: "center"

  }
  if (!parseDate || parseDate.length === 0) {
    return <div style={mystyel}>
      <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
        <span style={{ color: 'black', fontSize: "1.2rem" }}>
          Please Provide Data
        </span>
      </div>
    </div>

  }
  return (
    <RadialBarChart

      margin={{ top: 20, bottom: 20, left: 10, right: 20 }}
      width={750}
      height={400}
      innerRadius="10%"
      outerRadius="80%"
      data={parseDate}
      startAngle={180}
      endAngle={0}

      style={{
        background: 'white',
        border: '1px solid black',
        margin: '50px auto',
      }}
    >
      <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='value' />
      <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
      <Tooltip />
    </ RadialBarChart>
  )
}

export default Radical