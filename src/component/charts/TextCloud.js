import React, { useState, useEffect } from "react";
import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";

import WordCloud from 'react-d3-cloud';
import "../../textCloud.css";

// import * as d3 from "d3"
// const styles = {
//   large: {
//     fontSize: 60,
//     fontWeight: 'bold'
//   },
//   small: {
//     opacity: 0.7,
//     fontSize: 16
//   }
// };


// const data = [
//   { text: 'Hey', value: 1000 },
//   { text: 'lol', value: 200 },
//   { text: 'first impression', value: 800 },
//   { text: 'very cool', value: 20000 },
//   { text: 'duck', value: 700 },
// ];


export default function TextCloud() {


  useEditorPanelConfig([
    { name: "source", type: "element" },
    {
      name: "name",
      type: "column",
      source: "source",
      allowTypes: "datetime",
      allowMultiple: false,
    },
    {
      name: "value",
      type: "column",
      allowTypes: "number | integer",
      source: "source",
      allowMultiple: false,
    },
    {
      name: "TextColor",
      type: "color",
      allowMultiple: false,
      defaultValue: "#866578",
    },
    {
      name: "BackgroundColor",
      type: "color",
      allowMultiple: false,
      defaultValue: "#D3B348",
    },
    {
      name: "RemoveBackground",
      type: "checkbox",
      defaultValue: false,
    },
  ]);

  const config = useConfig();
  const columnInfo = useElementColumns(config.source);
  const data = useElementData(config.source);
  const [parseDate, setParseDate] = useState([]);


  useEffect(() => {
    const PropColumns = ["name", "value"];

    const dataSourceColumns = PropColumns.map((x) => {
      return config[x];
    });

    const dataSourceValues = dataSourceColumns.map((x, i) => {
      const colValue = data[x];
      return colValue;
    });

    // const mycols = mycolsArray

    // console.log("#########################################3");
    // console.log(PropColumns);
    // console.log(dataSourceColumns);
    // console.log(dataSourceValues);
    // console.log("#########################################3");

    const displayData = [];

    if (dataSourceValues[0]) {
      dataSourceValues[0].forEach((title, i) => {
        const k = {};
        PropColumns.forEach((col, j) => {
          if (dataSourceColumns[j]) {
            // console.log(j, i, dataSourceColumns[j], dataSourceValues[j][i])
            if (dataSourceValues[j] && dataSourceValues[j][i]) {
              k[col] = dataSourceValues[j][i] ?? null;
            }
          }
        });
        displayData.push(k);
      });

      const transformData = displayData.map((x) => ({
        ...x,
        text: x.name,

      }));
      console.table(transformData);
      console.log(transformData[0].timeSeries);
      setParseDate(transformData);




    } else {
      setParseDate([]);
    }
  }, [columnInfo, config, data]);
  const mystyel = {
    padding: "20px",

    display: "flex",
    flexWrap: "wrap",
    gap: "20px",

    justifyContent: "center",
    alignItems: "center",
  };
  if (!parseDate || parseDate.length === 0) {
    return (
      <div style={mystyel} className="bg">
        <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
          <span style={{ color: "black", fontSize: "1.2rem" }}>
            Please Provide Data
          </span>
        </div>
      </div>
    );
  }



  const minFont = 14, maxFont = 72
  // var fontSizeScale = d3.scalePow().exponent(5).domain([0, 1]).range([minFont, maxFont]);
  // var maxSize = d3.max(parseDate, (d) => d.value);

  return (
    <div className="app-outer" style={{
      // fontFamily: "'Frutiger LT Std', sans-serif",
      background: config.RemoveBackground
        ? "transparent"
        : config.BackgroundColor,
    }}>

      <div >
        <WordCloud
          data={parseDate}
          style={{
            width: "300px",
            height: "150px"
          }}
          padding={5}
          fill={config.TextColor}
          font={() => '"Circular Medium", sans-serif'}
          random={(d) => 0}
          rotate={(d) => d.text.length > 8 ? 0 : ~~(Math.random() * 2) * 90}
        /></div>

    </div>
  );
}
