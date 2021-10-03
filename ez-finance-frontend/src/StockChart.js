import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "./StockChart.css";

const StockChart = (props) => {
	const options = {
		chart: {
			background: "#f4f4f4",
			foreColor: "#333",
		},
	};
	const [series, setSeries] = useState([]);
	useEffect(() => {
		if (props.symbolName !== "") {
			const env = "dev";
			if (env == "dev") {
				const candleData = [];
				const movingAvgData = [];
				candleData = [{ x: "02-01", y: [] }];
			} else if (env == "prod") {
				fetch(`http://localhost:9000/stocks/${props.symbolName}`)
					.then((res) => res.json())
					.then(
						(result) => {
							const candleData = [];
							const movingAvgData = [];
							let movingAvg44 = 0;
							if (result.historical_data.length > 43) {
								for (let i = 0; i < 44; i++) {
									movingAvg44 += result.historical_data[i].c;
									if (i !== 0) {
										movingAvgData.push({
											x: result.historical_data[i].date.substr(5, 5),
											y: result.historical_data[i].c,
										});
									}
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
	}, [props.symbolName]);

	if (props.symbolName === "")
		return (
			<div className="StockChart" style={{ textAlign: "center" }}>
				<h2>
					Chart for 44 Moving Average will shown here.
					<br />
					Please select a stock from sidebar.
				</h2>
			</div>
		);
	// else if (.length === 0) {
	// 	return (
	// 		<div className="StockChart" style={{ textAlign: "center" }}>
	// 			<h2>No data found for this stock.</h2>
	// 		</div>
	// 	);
	// }
	else {
		return (
			<div className="StockChart">
				<Chart
					options={options}
					series={series}
					type="candlestick"
					width="95%"
				/>
			</div>
		);
	}
};
export default StockChart;
