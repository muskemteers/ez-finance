import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "./StockChart.css";

const StockChart = (props) => {
	const options = {
		chart: {
			background: "#f4f4f4",
			foreColor: "#333",
			toolbar: {
				autoSelected: "pan",
			},
		},
	};
	const [series, setSeries] = useState([]);
	useEffect(() => {
		if (props.selectedStockIndex !== -1) {
			const env = "prod";
			if (env === "dev") {
				const candleData = [
					{ x: "14-10", y: [2, 4, 1, 3] },
					{ x: "15-10", y: [6, 8, 5, 7] },
					{ x: "16-10", y: [7, 8, 5, 6] },
					{ x: "17-10", y: [3, 4, 1, 2] },
				];
				const movingAvgData = [
					{ x: "14-10", y: 2 },
					{ x: "15-10", y: 4 },
					{ x: "16-10", y: 3 },
					{ x: "17-10", y: 2 },
				];
				setSeries([
					{
						name: "daily stock change",
						type: "candlestick",
						data: candleData,
					},
					{ name: "Moving Avg.(44)", type: "line", data: movingAvgData },
				]);
			} else if (env === "prod") {
				fetch(
					`http://localhost:9000/stocks/${
						props.symbolList[props.selectedStockIndex].stock_symbol
					}`
				)
					.then((res) => res.json())
					.then(
						(result) => {
							const candleData = [];
							const movingAvgData = [];
							let movingAvg44 = 0;
							if (result.historical_data.length > 43) {
								for (let i = 0; i < 44; i++) {
									movingAvg44 += result.historical_data[i].c;
									movingAvgData.push({
										x: result.historical_data[i].date.substr(5, 5),
										y: result.historical_data[i].c,
									});
								}
								for (let i = 44; i < result.historical_data.length; i++) {
									movingAvg44 -= result.historical_data[i - 44].c;
									movingAvg44 += result.historical_data[i].c;
									movingAvgData.push({
										x: result.historical_data[i].date.substr(5, 5),
										y: (movingAvg44 * 1.0) / 44.0,
									});
								}
							}
							result.historical_data.forEach((historicalData) => {
								candleData.push({
									x: historicalData.date.substr(5, 5),
									y: [
										historicalData.o,
										historicalData.h,
										historicalData.l,
										historicalData.c,
									],
								});
							});
							setSeries([
								{
									name: "daily stock change",
									type: "candlestick",
									data: candleData,
								},
								{ name: "Moving Avg.(44)", type: "line", data: movingAvgData },
							]);
						},
						(error) => {
							console.log(error);
							setSeries([]);
						}
					);
			}
		}
	}, [props.selectedStockIndex]);
	if (props.selectedStockIndex === -1)
		return (
			<div className="StockChart" style={{ textAlign: "center" }}>
				<h2>
					Chart for 44 Moving Average will shown here.
					<br />
					Please select a stock from sidebar.
				</h2>
			</div>
		);
	else if (series.length === 0) {
		return (
			<div className="StockChart" style={{ textAlign: "center" }}>
				<h2>No data found for this stock.</h2>
			</div>
		);
	} else {
		return (
			<div className="StockChart">
				<h1
					style={{
						textAlign: "center",
						margin: "5px 0px",
					}}>
					{props.symbolList.length > 0
						? props.symbolList[props.selectedStockIndex].stock_name
						: "No Stock Selected"}
				</h1>
				<Chart
					className="apexchart"
					options={options}
					series={series}
					type="candlestick"
				/>
			</div>
		);
	}
};
export default StockChart;
