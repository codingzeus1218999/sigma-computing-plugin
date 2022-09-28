import React, { useState, useEffect } from "react";
import {
	useConfig,
	useEditorPanelConfig,
	useElementColumns,
	useElementData,
} from "@sigmacomputing/plugin";
import {
	AreaChart,
	Tooltip,
	Area,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     "name": "Page A",
//     "uv": 4000,
//     "pv": 2400,
//     "amt": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398,
//     "amt": 2210
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800,
//     "amt": 2290
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908,
//     "amt": 2000
//   },
//   {
//     "name": "Page E",
//     "uv": 1890,
//     "pv": 4800,
//     "amt": 2181
//   },
//   {
//     "name": "Page F",
//     "uv": 2390,
//     "pv": 3800,
//     "amt": 2500
//   },
//   {
//     "name": "Page G",
//     "uv": 3490,
//     "pv": 4300,
//     "amt": 2100
//   }
// ]

const green = "#59CD90";
const red = "#e04141";

function getPercentageChange(baseValue, latestValue) {
	const change = baseValue - latestValue;
	if (change == 0) return [null, 0];
	// const sign = change > 0 ? '-' : '+'
	const sign = change > 0 ? red : green;
	const percentage = (Math.abs(change) * 100) / baseValue;

	return [sign, percentage];
}

export default function AreaChartPlugin() {
	useEditorPanelConfig([
		{ name: "source", type: "element" },
		{
			name: "timeSeries",
			type: "column",
			source: "source",
			allowedTypes: "",
			allowMultiple: false,
		},
		{ name: "values", type: "column", source: "source", allowMultiple: false },
		{
			name: "title",
			type: "text",
			allowMultiple: false,
			defaultValue: "Total Session",
		},
		{
			name: "label",
			type: "text",
			allowMultiple: false,
			defaultValue: "Vs Last Change",
		},
	]);

	const config = useConfig();
	const columnInfo = useElementColumns(config.source);
	const data = useElementData(config.source);
	const [parseDate, setParseDate] = useState([]);
	const [color, setColor] = useState("#59CD90");
	const [sum, setSum] = useState(0);
	const [lastChange, setLastChange] = useState(0);

	useEffect(() => {
		const PropColumns = ["timeSeries", "values"];

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
		console.log(dataSourceValues);
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
				timeSeries: new Date(parseInt(x.timeSeries)).toLocaleDateString(),
			}));
			console.table(transformData);
			console.log(transformData[0].timeSeries);
			setParseDate(transformData);
			setSum(transformData.reduce((s, x) => s + x.values, 0));

			const lastTwo = transformData
				.slice(transformData.length - 2)
				.map((x) => x.values);
			const [changeColor, percentageChange] = getPercentageChange(...lastTwo);
			console.log(lastTwo);

			if (changeColor) setColor(changeColor);
			setLastChange(percentageChange);
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
			<div style={mystyel}>
				<div style={{ border: "solid black 1px", padding: "20px 60px" }}>
					<span style={{ color: "black", fontSize: "1.2rem" }}>
						Please Provide Data
					</span>
				</div>
			</div>
		);
	}

	return (
		<div style={{ width: "100%", height: 300 }}>
			<div
				style={{
					background: "white",
					border: "1px solid black",
					width: "100%",
					// margin: '50px auto',
				}}
			>
				<p
					style={{
						fontSize: "16px",
						fontFamily: "sans-serif",
						fontWeight: "300",
						margin: "30px 40px 10px ",
					}}
				>
					{config.title}
					<br />
					<span
						style={{
							fontSize: "22px",
							fontWeight: "600",
							marginLeft: "0px",
						}}
					>
						{" "}
						{sum}
					</span>
				</p>

				<ResponsiveContainer width="100%" height={220}>
					<AreaChart
						data={parseDate}
						style={{ background: "white" }}
						margin={{ top: 20, right: 80, left: -20, bottom: -20 }}
					>
						<defs>
							<linearGradient id="values" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={color}
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor={color}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis tick={false} dataKey="timeSeries" />
						<YAxis tick={false} />

						<Tooltip />
						<Area
							type="linear"
							dataKey="values"
							stroke={color}
							fillOpacity={1}
							fill="url(#values)"
						/>
					</AreaChart>
				</ResponsiveContainer>
				<div
					style={{
						fontSize: "14px",

						margin: "10px 40px 30px ",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							fontSize: "20px",
						}}
					>
						<span
							style={{ color: color, marginRight: "10px" }}
							dangerouslySetInnerHTML={{
								__html: color === green ? "&#9650" : "&#9660",
							}}
						/>
						{lastChange.toFixed(2) + "%"}
					</div>
					<span>{config.label}</span>
				</div>
			</div>{" "}
		</div>
	);
}
