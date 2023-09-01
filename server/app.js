const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/connection");

const app = express();
const port = process.env.PORT || 7000;

// Configuring cors to allow requests from frontend domain
const corsOptions = {
  origin: process.env.CLIENT, // frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent across origins
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth")); // linking router

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
