import React, { useState, useEffect } from 'react'

import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";


import ProductCard from "./ProductCard";

const emptyValue = [{
  title: "",
  title_icon: "",
  des: "",
  small_icon: "",
  small_text: ""
}]

export default function ProductCardPlugin() {
  useEditorPanelConfig([
    { name: "source", type: "element" },
    { name: "title", type: "column", source: "source", allowMultiple: false },
    { name: "title_icon", type: "column", source: "source", allowMultiple: false },
    { name: "des", type: "column", source: "source", allowMultiple: false, placeholder: "Max Length 90" },
    { name: "small_icon", type: "column", source: "source", allowMultiple: false },
    { name: "small_text", type: "column", source: "source", allowMultiple: false },


  ]);

  const config = useConfig();
  const columnInfo = useElementColumns(config.source);
  const data = useElementData(config.source);


  const [parseDate, setParseDate] = useState(emptyValue)

  useEffect(() => {

    const PropColumns = [
      "title",
      "title_icon",
      "des",
      "small_icon",
      "small_text",
    ]

    const dataSourceColumns = PropColumns.map((x) => {
      return config[x];
    })

    const dataSourceValues = dataSourceColumns.map((x, i) => {
      const colValue = data[x]
      return colValue
    })

    // const mycols = mycolsArray

    console.log("#########################################3");
    console.log(PropColumns);
    console.log(dataSourceColumns);
    console.log(dataSourceValues);
    console.log("#########################################3");

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
      setParseDate(emptyValue)
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

  if (!parseDate || parseDate[0].title === "") {
    return <div style={mystyel}>
      <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
        <span style={{ color: 'black', fontSize: "1.2rem" }}>
          Please Provide Title
        </span>
      </div>
    </div>

  }

  return <div style={mystyel}>
    {/* <pre>

      {JSON.stringify(parseDate, null, 2)}
    </pre> */}

    {parseDate.map((x, i) => {

      return <ProductCard key={i} {...x} />
    })


    }
    {/* <ProductCard key="i" title="Good" />
    <ProductCard key="i" title="Good" />
    <ProductCard key="i" title="Good" />
    <ProductCard key="i" title="Good" />
    <ProductCard key="i" title="Good" />
    <ProductCard key="i" title="Good" />
    <ProductCard key="i" title="Good" />
    <ProductCard key="i" title="Good" /> */}

  </div>;
}
