const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
	trading_date: {
		type: Date,
		required: true,
	},
	stock_symbol: {
		type: String,
		required: true,
	},
	prev_close: {
		type: Schema.Types.Double,
		required: true,
	},
	open: {
		type: Schema.Types.Double,
		required: true,
	},
	high: {
		type: Schema.Types.Double,
		required: true,
	},
	low: {
		type: Schema.Types.Double,
		required: true,
	},
	close: {
		type: Schema.Types.Double,
		required: true,
	},
	last: {
		type: Schema.Types.Double,
		required: true,
	},
	vwap: {
		type: Schema.Types.Double,
		required: true,
	},
	volume: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("historical_stock_data", stockSchema);
