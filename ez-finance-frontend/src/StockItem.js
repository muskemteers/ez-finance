import "./StockItem.css";

const StockItem = (props) => {
	return (
		<div className="StockItem">
			<h6 onClick={() => props.onClick(props.symbolName)}>{props.stockName}</h6>
		</div>
	);
};
export default StockItem;
