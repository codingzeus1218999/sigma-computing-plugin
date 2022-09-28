import React, { useState, useEffect } from 'react'
import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";
import { CartesianGrid, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, } from 'recharts';

// const data01 = [
//   {
//     "x": 100,
//     "y": 200,
//     "z": 200
//   },
//   {
//     "x": 120,
//     "y": 100,
//     "z": 260
//   },
//   {
//     "x": 170,
//     "y": 300,
//     "z": 400
//   },
//   {
//     "x": 140,
//     "y": 250,
//     "z": 280
//   },
//   {
//     "x": 150,
//     "y": 400,
//     "z": 500
//   },
//   {
//     "x": 110,
//     "y": 280,
//     "z": 200
//   }
// ];


function Bubble() {
  useEditorPanelConfig([
    { name: "source", type: "element" },
    { name: "x", type: "column", source: "source", allowMultiple: false },
    { name: "y", type: "column", source: "source", allowMultiple: false },
    { name: "z", type: "column", source: "source", allowMultiple: false },
    { name: "name", type: "text", allowMultiple: false, defaultValue: "UnKnow" },
    { name: "baseColor", type: "color", allowMultiple: false, defaultValue: "#8884d8" },

  ]);

  const config = useConfig();
  const columnInfo = useElementColumns(config.source);
  const data = useElementData(config.source);
  const [parseDate, setParseDate] = useState([])

  useEffect(() => {

    const PropColumns = [
      "x",
      "y",
      "z",

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
    return <div style={mystyel} className="bg">
      <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
        <span style={{ color: 'black', fontSize: "1.2rem" }}>
          Please Provide Data
        </span>
      </div>
    </div>

  }

  return (

    <div >
      {parseDate.length}
      <ScatterChart width={730} height={400} style={{
        background: 'white',
        border: '1px solid black',
        margin: '50px auto',
      }}
        padding={{ top: 20, bottom: 10, left: 10, right: 20 }}
        margin={{ top: 20, bottom: 10, left: 10, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <ZAxis dataKey="z" range={[64, 500]} />

        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter data={parseDate} name={config.name ?? "UnKnow"} fill={config.baseColor ? config.baseColor : "#8884d8"} />

      </ScatterChart >
    </div>
  )
}

export default Bubble