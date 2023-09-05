import React, { useState, useEffect } from "react";
import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";
import Chart from "chart.js/auto";
import { PolarArea } from "react-chartjs-2";

export default function Polar() {
  useEditorPanelConfig([
    { name: "source", type: "element" },
    { name: "name", type: "column", source: "source", allowMultiple: false },
    { name: "size", type: "column", source: "source", allowMultiple: false },

    { name: "colors", type: "group" },
    {
      name: "chartColor",
      type: "color",
      source: "colors",
      allowMultiple: false,
      defaultValue: "#8884d8",
    },
    {
      name: "singleColor",
      type: "toggle",
      source: "colors",
      defaultValue: false,
    },

    { name: "options", type: "group" },
    {
      name: "showLegend",
      type: "toggle",
      source: "options",
      defaultValue: true,
    },
  ]);

  const config = useConfig();
  const elementColumns = useElementColumns(config.source);
  const elementData = useElementData(config.source);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [dataPolar, setDataPolar] = useState(null);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const labels = elementData[config.name];
    const values = elementData[config.size];
    setLabels(labels);
    setValues(values);
    setDataPolar({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: config.singleColor
            ? [...Array(labels.length)].fill(config.chartColor)
            : null,
        },
      ],
    });
    setOptions({
      plugins: {
        legend: {
          display: config.showLegend,
        },
      },
    });
  }, [elementColumns, config, elementData]);

  const errorStyle = {
    padding: "20px",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
  };

  if (labels === undefined || dataPolar === null || dataPolar === undefined) {
    return (
      <div style={errorStyle} className="bg">
        <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
          <span style={{ color: "black", fontSize: "1.2rem" }}>
            Please Provide Data
          </span>
        </div>
      </div>
    );
  }

  if (values === undefined || dataPolar === null || dataPolar === undefined) {
    return (
      <div style={errorStyle}>
        <div style={{ border: "solid black 1px", padding: "20px 60px" }}>
          <span style={{ color: "black", fontSize: "1.2rem" }}>
            Please Provide size
          </span>
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: "100%" }}>
      <div style={{ padding: "20px", width: "900px", margin: "0 auto" }}>
        <PolarArea data={dataPolar} options={options} />
      </div>
    </div>
  );
}
