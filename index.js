const express = require('express')
const cors = require("cors");
const cookieParser = require('cookie-parser');

const apiRouter = require("./routes/index");

const app = express()

const db = require("./models");
db.sequelize.sync();

// Allowed Various Access
const allowedOrigin = [
    "https://geoipm.netlify.app/",
    "https://geoipm.netlify.app",
    "http://localhost:3000/",
    "http://localhost:3000"  
];

// Option for Cors Middleware
const corsOptions = {
    origin: allowedOrigin,
    credentials: true, //access-control-allow-cr0edentials:true
    optionSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
}
  
// Use Cors Middleware
app.use(cors(corsOptions));

// Use cookieParser
app.use(cookieParser());

// For parse request
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));


// Simple Route
app.get("/", (req, res) => {
    res.json('Welcome to API GeoIPM Indonesia')
});
app.get("/api", (req, res) => {
    res.json('GET THE DATA FROM API')
});

app.use('/api', apiRouter);

// Set Port and listen for the request
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`This Server is Running on port ${PORT}`))