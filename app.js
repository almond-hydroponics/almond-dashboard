const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

// set up rate limiter: maximum of five requests per minute
// const RateLimit = require('express-rate-limit');
// const limiter = new RateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 5,
// });

// app.use(limiter);
app.use(express.static(`${__dirname}/dist`));

// app.get("/service-worker.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
// });

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

module.exports = app;
