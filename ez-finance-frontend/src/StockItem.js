import "./StockItem.css";

const StockItem = (props) => {
	return (
		<div className="StockItem">
			<h6 onClick={() => props.changeSelectedStock(props.index)}>
				{props.stockName}
			</h6>
		</div>
	);
};
export default StockItem;
