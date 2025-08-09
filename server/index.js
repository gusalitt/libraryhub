// const dotenv = require("dotenv");
// dotenv.config();

const express = require("express");
const cors = require("cors");
const bookRoutes = require("./src/routes/book.routes");
const landingRoutes = require("./src/routes/landing.routes");
const userRoutes = require("./src/routes/user.routes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const allowedOrigins = ["https://mylibraryhub.vercel.app", "http://localhost:5173"];
app.use(express.json());
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);

const whitelist = ["*"];
app.use((req, res, next) => {
	const origin = req.get("referer");
	const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
	if (isWhitelisted) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization");
		res.setHeader("Access-Control-Allow-Credentials", true);
	}
	// Pass to next layer of middleware
	if (req.method === "OPTIONS") res.sendStatus(200);
	else next();
});

const setContext = (req, res, next) => {
	if (!req.context) req.context = {};
	next();
};
app.use(setContext);

app.use(cookieParser());
app.get("/", (req, res) => {
	res.json({ message: "Welcome to LibraryHub App API" });
});

app.use("/api/v1/book", bookRoutes);
app.use('/api/v1/landing', landingRoutes);
app.use('/api/v1/auth', userRoutes);

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ status: "error", message: err.message, errors: err.errors || err });
});

// // Start the server
// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`);
// });

module.exports = app;
