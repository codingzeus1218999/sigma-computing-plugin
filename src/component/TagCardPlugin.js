import React, { useState, useEffect } from 'react'

import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";


import TagCard from "./TagCard";

const emptyValue = [{
  Post_Title: "Your first insight from Boldlens",
  Category_id: "3",
  Tag: "hash,tag, hash,tag",
  Draft: "",
  Description: "",
  Tag_Icon_URL: '',
  First_name: "Millan",
  Last_name: "Lakhani",
  Person_title: "Lead Developer",
  Post_Create_time: "",
}]
// const emptyValue = [{
//   Post_Title: "",
//   Category_id: "",
//   Tag: "",
//   Draft: "",
//   Description: "",
//   First_name: "",
//   Last_name: "",
//   Person_title: "",
//   Post_Create_time: "",
// }]

export default function ProductCardPlugin() {
  useEditorPanelConfig([
    { name: "source", type: "element" },
    { name: 'Color', type: 'group' },
    {
      name: "CardColor",
      type: "color",
      allowMultiple: false, source: 'Color',
      defaultValue: "white",
    },
    {
      name: "BackgroundColor",
      type: "color",
      allowMultiple: false, source: 'Color',
      defaultValue: "#D3B348",
    },
    {
      name: "RemoveBackground",
      type: "toggle", source: 'Color',
      defaultValue: false,
    },
    { name: "Post_Title", type: "column", source: "source", allowMultiple: false },
    // { name: "Category_id", type: "column", source: "source", allowMultiple: false },
    { name: "Tag", type: "column", source: "source", allowMultiple: false },
    // { name: "Draft", type: "column", source: "source", allowMultiple: false },
    { name: "Tag_Icon_URL", type: "column", source: "source", allowMultiple: false },
    { name: "Description", type: "column", source: "source", allowMultiple: false },
    { name: "First_name", type: "column", source: "source", allowMultiple: false },
    { name: "Last_name", type: "column", source: "source", allowMultiple: false },
    { name: "Person_title", type: "column", source: "source", allowMultiple: false },
    { name: "Post_Create_time", type: "column", source: "source", allowMultiple: false },
  ]);

  const config = useConfig();
  const columnInfo = useElementColumns(config.source);
  const data = useElementData(config.source);


  const [parseDate, setParseDate] = useState(emptyValue)

  useEffect(() => {

    const PropColumns = [
      "Post_Title",
      // "Category_id",
      "Tag",
      // "Draft",
      "Description",
      "First_name",
      "Tag_Icon_URL",
      "Last_name",
      "Person_title",
      "Post_Create_time",
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
    alignItems: "flex-start"
  }

  if (!parseDate || parseDate[0].title === "") {
    return <div style={mystyel} className="bg">
      <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
        <span style={{ color: 'black', fontSize: "1.2rem" }}>
          Please Provide Title
        </span>
      </div>
    </div>

  }

  return <div className="app-outer" style={{
    padding: "20px",

    display: "flex",
    flexWrap: "wrap",
    gap: "20px",

    justifyContent: "center",
    alignItems: "center",
    // fontFamily: "'Frutiger LT Std', sans-serif",
    background: config.RemoveBackground
      ? "transparent"
      : config.BackgroundColor,
  }}>

    {
      parseDate.map((x, i) => {
        return <TagCard bg={config.CardColor} key={i} {...x} />
      })
    }


  </div>;
}
