import React, { useState, useEffect } from "react";
import {
  useConfig,
  useEditorPanelConfig,
  useElementColumns,
  useElementData,
} from "@sigmacomputing/plugin";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import "./Polar.css";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Colors);

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
      defaultValue: "#e45740",
    },
    {
      name: "singleColor",
      type: "toggle",
      source: "colors",
      defaultValue: true,
    },
    {
      name: "backgroundColor",
      type: "color",
      source: "colors",
      allowMultiple: false,
      defaultValue: "#1D133D",
    },
    {
      name: "removeBackgroundColor",
      type: "toggle",
      source: "colors",
      defaultValue: true,
    },
    {
      name: "legendColor",
      type: "color",
      source: "colors",
      allowMultiple: false,
      defaultValue: "#666666",
    },

    { name: "options", type: "group" },
    {
      name: "showLabel",
      type: "toggle",
      source: "options",
      defaultValue: true,
    },
    {
      name: "showLegend",
      type: "toggle",
      source: "options",
      defaultValue: false,
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
    if (labels && values && labels.length > 0 && values.length > 0) {
      setDataPolar({
        labels: labels,
        datasets: [
          {
            data: values,
            borderWidth: 0,
            backgroundColor: config.singleColor
              ? [...Array(labels.length)].fill(config.chartColor)
              : null,
          },
        ],
      });
      setOptions({
        scales: {
          r: {
            backgroundColor: config.removeBackgroundColor
              ? "transparent"
              : config.backgroundColor,
            ticks: {
              display: false,
            },
            pointLabels: {
              display: config.showLabel,
              centerPointLabels: true,
              font: {
                size: 12,
                family: "CircularProBold-Regular",
              },
            },
          },
        },
        plugins: {
          legend: {
            display: config.showLegend,
            labels: {
              usePointStyle: true,
              color: config.legendColor,
              font: {
                family: "CircularProBold-Regular",
              },
            },
          },
          colors: {
            enabled: true,
          },
        },
      });
    }
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
    <div
      className="chart-container"
      style={{
        padding: "20px",
        width: "100%",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <PolarArea data={dataPolar} options={options} />
    </div>
  );
}
