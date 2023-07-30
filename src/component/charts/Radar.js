import React, { useState, useEffect } from 'react'

import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";
import { Radar, RadarChart, PolarGrid, Tooltip, PolarAngleAxis, PolarRadiusAxis, } from 'recharts';


// const mydata = [
//   {
//     subject: 'Math',
//     A: 120,
//     B: 110,
//     fullMark: 150,
//   },
//   {
//     subject: 'Chinese',
//     A: 98,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: 'English',
//     A: 86,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: 'Geography',
//     A: 99,
//     B: 100,
//     fullMark: 150,
//   },
//   {
//     subject: 'Physics',
//     A: 85,
//     B: 90,
//     fullMark: 150,
//   },
//   {
//     subject: 'History',
//     A: 65,
//     B: 85,
//     fullMark: 150,
//   },
// ];



function MyRadarChart() {

  useEditorPanelConfig([
    { name: "source", type: "element" },
    { name: "name", type: "column", source: "source", allowMultiple: false },
    { name: "size", type: "column", source: "source", allowMultiple: false },
    // { name: "MaxValue", type: "text", allowedTypes: ['number', 'integer'] },


    { name: 'Color', type: 'group' },
    { name: "baseColor", type: "color", source: 'Color', allowMultiple: false, defaultValue: "#8884d8" },

    {
      name: "BackgroundColor",
      type: "color",
      allowMultiple: false, source: 'Color',
      defaultValue: "#F1EAE5",
    },
    {
      name: "RemoveBackground",
      type: "toggle", source: 'Color',
      defaultValue: true,
    },
  ]);

  const config = useConfig();
  const columnInfo = useElementColumns(config.source);
  const data = useElementData(config.source);
  const [parseDate, setParseDate] = useState([])


  useEffect(() => {

    const PropColumns = [
      "name",
      "size",
      // "shades"
    ]

    const dataSourceColumns = PropColumns.map((x) => config[x])
    const dataSourceValues = dataSourceColumns.map((x, i) => data[x])
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
      console.log("displayData");
      console.table(displayData);

      setParseDate(displayData)

      // console.log({ dataSourceValues })

      // const myscale = displayData.map(x => x.shades)

      // setStart(Math.max(...myscale))
      // setEnd(Math.min(...myscale))


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

  if (!parseDate[0].size) {
    return <div style={mystyel}>
      <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
        <span style={{ color: 'black', fontSize: "1.2rem" }}>
          Please Provide size
        </span>
      </div>
    </div>
  }

  return (

    <RadarChart
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",

        background: config.RemoveBackground
          ? "transparent"
          : config.BackgroundColor,
      }}
      margin={{ top: 20, bottom: 10, left: 50, right: 50 }}
      width={500} height={300} outerRadius="80%" data={parseDate}>
      {/* <PolarGrid /> */}
      <PolarAngleAxis dataKey="name" />
      {/* <PolarRadiusAxis /> */}
      <Tooltip />
      <Radar dataKey="size" stroke="#201449" fill={config.baseColor ? config.baseColor : "#201449"} fillOpacity={0.6} />
    </RadarChart>

  );
}

export default MyRadarChart;
