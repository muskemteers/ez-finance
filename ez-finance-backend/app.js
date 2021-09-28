const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: config.MAX_IMAGE_SIZE }));
app.use(
	bodyParser.urlencoded({
		limit: config.MAX_IMAGE_SIZE,
		extended: true,
	})
);
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PATCH, DELETE"
	);
	next();
});

app.use("/stocks/:symbol", (req, res, next) => {});

app.use((err, req, res, next) => {
	return res
		.status(500)
		.json({ status: "Internal Server Error", message: err });
});

if (require.main === module) {
	app.listen(config.PORT, () => {
		console.log(`App listening on port ${config.PORT}!`);
	});
}

module.exports = app;
