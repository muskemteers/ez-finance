import "./App.css";

import StockList from "./StockList";
import StockChart from "./StockChart";
import { useState } from "react";

const App = () => {
	const [symbolName, setSymbolName] = useState("");
	const changeStockSymbol = (symbolName) => {
		setSymbolName(symbolName);
	};
	return (
		<div className="App">
			<div className="ma-44-flex">
				<StockList onClick={changeStockSymbol} />
				<StockChart symbolName={symbolName} />
			</div>
		</div>
	);
};

export default App;
