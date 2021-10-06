import { useEffect } from "react";
import StockItem from "./StockItem";
import "./StockList.css";

const StockList = (props) => {
	useEffect(() => {
		const env = "prod";
		if (env === "dev") {
			props.updateSymbolList([
				{ stock_name: "Stock 01", stock_symbol: "ST01" },
				{ stock_name: "Stock 02", stock_symbol: "ST02" },
				{ stock_name: "Stock 03", stock_symbol: "ST03" },
				{ stock_name: "Stock 04", stock_symbol: "ST04" },
				{ stock_name: "Stock 05", stock_symbol: "ST05" },
				{ stock_name: "Stock 06", stock_symbol: "ST06" },
				{ stock_name: "Stock 07", stock_symbol: "ST07" },
				{ stock_name: "Stock 08", stock_symbol: "ST08" },
				{ stock_name: "Stock 09", stock_symbol: "ST09" },
				{ stock_name: "Stock 11", stock_symbol: "ST11" },
				{ stock_name: "Stock 12", stock_symbol: "ST12" },
				{ stock_name: "Stock 13", stock_symbol: "ST13" },
				{ stock_name: "Stock 14", stock_symbol: "ST14" },
				{ stock_name: "Stock 15", stock_symbol: "ST15" },
				{ stock_name: "Stock 16", stock_symbol: "ST16" },
				{ stock_name: "Stock 17", stock_symbol: "ST17" },
				{ stock_name: "Stock 18", stock_symbol: "ST18" },
				{ stock_name: "Stock 19", stock_symbol: "ST19" },
				{ stock_name: "Stock 21", stock_symbol: "ST21" },
				{ stock_name: "Stock 22", stock_symbol: "ST22" },
				{ stock_name: "Stock 23", stock_symbol: "ST23" },
				{ stock_name: "Stock 24", stock_symbol: "ST24" },
				{ stock_name: "Stock 25", stock_symbol: "ST25" },
				{ stock_name: "Stock 26", stock_symbol: "ST26" },
				{ stock_name: "Stock 27", stock_symbol: "ST27" },
				{ stock_name: "Stock 28", stock_symbol: "ST28" },
				{ stock_name: "Stock 29", stock_symbol: "ST29" },
				{ stock_name: "Stock 31", stock_symbol: "ST31" },
				{ stock_name: "Stock 32", stock_symbol: "ST32" },
				{ stock_name: "Stock 33", stock_symbol: "ST33" },
				{ stock_name: "Stock 34", stock_symbol: "ST34" },
				{ stock_name: "Stock 35", stock_symbol: "ST35" },
				{ stock_name: "Stock 36", stock_symbol: "ST36" },
				{ stock_name: "Stock 37", stock_symbol: "ST37" },
				{ stock_name: "Stock 38", stock_symbol: "ST38" },
				{ stock_name: "Stock 39", stock_symbol: "ST39" },
			]);
		} else if (env === "prod") {
			fetch("http://localhost:9000/stocks/nse500")
				.then((res) => res.json())
				.then(
					(result) => {
						props.updateSymbolList(result.stock_symbols);
					},
					(error) => {
						console.log(error);
						props.updateSymbolList([]);
					}
				);
		}
		// eslint-disable-next-line
	}, []);
	return (
		<div className="StockList">
			<h2 style={{ textAlign: "center", padding: "10px" }}>NSE-500 List</h2>
			{!props.symbolList && <div>Fetching Stock List</div>}
			<div
				className="stock-item-wrapper"
				style={{ height: "89vh", overflowY: "scroll" }}>
				{props.symbolList.map((stockData, index) => {
					return (
						<StockItem
							key={index}
							index={index}
							changeSelectedStock={props.changeSelectedStock}
							symbolName={stockData.stock_symbol}
							stockName={stockData.stock_name}
						/>
					);
				})}
			</div>
			{props.symbolList && (
				<div
					style={{
						position: "absolute",
						width: "inherit",
						bottom: "0px",
						backgroundColor: "lightcyan",
						display: "flex",
						flexFlow: "row wrap",
						justifyContent: "space-evenly",
					}}>
					<input
						style={{ padding: "10px 50px" }}
						type="button"
						value="&lt;"
						onClick={() => {
							props.changeSelectedStock(
								(props.selectedStockIndex - 1 + props.symbolList.length) %
									props.symbolList.length
							);
						}}
					/>
					<input
						style={{ padding: "10px 50px" }}
						type="button"
						value="&gt;"
						onClick={() => {
							props.changeSelectedStock(
								(props.selectedStockIndex + 1) % props.symbolList.length
							);
						}}
					/>
				</div>
			)}
		</div>
	);
};
export default StockList;
