import { useEffect, useState } from "react";
import StockItem from "./StockItem";
import "./StockList.css";

const StockList = (props) => {
	const [symbolList, setSymbolList] = useState([]);
	useEffect(() => {
		fetch("http://localhost:9000/stocks/nse500")
			.then((res) => res.json())
			.then(
				(result) => {
					setSymbolList(result.stock_symbols);
				},
				(error) => {
					console.log(error);
					setSymbolList([]);
				}
			);
	}, []);
	return (
		<div className="StockList">
			<h2 style={{ textAlign: "center", margin: "10px" }}>NSE-500 List</h2>
			{symbolList.map((stockData, index) => {
				return (
					<StockItem
						key={index}
						onClick={props.onClick}
						symbolName={stockData.stock_symbol}
						stockName={stockData.stock_name}
					/>
				);
			})}
		</div>
	);
};
export default StockList;
