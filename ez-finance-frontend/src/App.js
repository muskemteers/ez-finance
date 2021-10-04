import "./App.css";

import StockList from "./StockList";
import StockChart from "./StockChart";
import { useState } from "react";

const App = () => {
	const [selectedStockIndex, setSelectedStockIndex] = useState(-1);
	const [symbolList, setSymbolList] = useState([]);
	const changeSelectedStock = (index) => {
		setSelectedStockIndex(index);
	};
	const updateSymbolList = (data) => {
		setSymbolList(data);
	};
	return (
		<div className="App">
			<div className="ma-44-flex">
				<StockList
					changeSelectedStock={changeSelectedStock}
					selectedStockIndex={selectedStockIndex}
					symbolList={symbolList}
					updateSymbolList={updateSymbolList}
				/>
				<StockChart
					selectedStockIndex={selectedStockIndex}
					symbolList={symbolList}
				/>
			</div>
		</div>
	);
};

export default App;
