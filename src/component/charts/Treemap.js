import React, { useState, useEffect } from 'react'

import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";
import { Treemap, Tooltip, Legend } from "recharts";
const mydata = [
  { name: "Axis", size: 2593, shades: 500 },
  { shades: 500, name: "AnchorControl", size: 2138 },
  { shades: 500, name: "ClickControl", size: 3824 },
  { shades: 870, name: "Data", size: 20544 },
  { shades: 500, name: "DataList", size: 19788 },
  { shades: 500, name: "ArrowType", size: 698 },
  { shades: 500, name: "EdgeRenderer", size: 5569 },
  { shades: 500, name: "ScaleBinding", size: 28275 },
  { shades: 500, name: "Tree", size: 7147 },
  { shades: 500, name: "TreeBuilder", size: 9930 },
  {
    shades: 500,
    name: "operator",
    size: 4461,
  },
];


const CustomizedContent = ({

  depth,
  x,
  y,
  width,
  height,


  name,
  shades, start, end, color
}) => {


  const pertage = ((shades - end) * 100) / (start - end)

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color ? color : `rgb(122, 111, 155)`,
          opacity: pertage > 60 ? pertage / 100 : 0.4,
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      <text
        x={x + 14}
        y={y + 28}
        fill="#fff"
        fontSize={14}
        fillOpacity={0.9}
      >
        {name}
      </text>
    </g >
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {

    return (
      <div
        className="custom-tooltip"
        style={{
          borderRadius: "3px",
          border: "none",
          borderColor: "transparent",
          background: "white",
          padding: "10px 50px",
          outline: "none",
          outlineStyle: "none",
        }}
      >
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

function TreeMap() {

  useEditorPanelConfig([
    { name: "source", type: "element" },
    { name: "name", type: "column", source: "source", allowMultiple: false },
    { name: "size", type: "column", source: "source", allowMultiple: false },
    { name: "shades", type: "column", source: "source", allowMultiple: false },
    { name: "baseColor", type: "color", allowMultiple: false },
  ]);

  const config = useConfig();
  const columnInfo = useElementColumns(config.source);
  const data = useElementData(config.source);
  const [parseDate, setParseDate] = useState([])
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0)

  useEffect(() => {

    const PropColumns = [
      "name",
      "size",
      "shades"
    ]

    const dataSourceColumns = PropColumns.map((x) => config[x])

    const dataSourceValues = dataSourceColumns.map((x, i) => data[x])

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
      console.log("displayData");
      console.log(displayData);

      setParseDate(displayData)

      // console.log({ dataSourceValues })

      const myscale = displayData.map(x => x.shades)

      setStart(Math.max(...myscale))
      setEnd(Math.min(...myscale))


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
    <div
      style={{
        position: "fixed",
        display: "flex",
        background: "white",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid black",
        }}
      >
        <Treemap
          width={750}
          height={400}
          margin={{ top: 20, bottom: 10, left: 10, right: 20 }}
          // data={mydata}
          data={parseDate}
          // data={parseDate.sort((b, a) => a.size - b.size)}
          dataKey="size"
          ratio={4 / 3}

          stroke="#fff"
          nameKey="name"
          fill="#8884d8"

          content={<CustomizedContent start={start} color={config.baseColor} end={end} />}
        >
          <Legend />
          <Tooltip content={CustomTooltip} />
        </Treemap>
      </div>
    </div>
  );
}

export default TreeMap;
