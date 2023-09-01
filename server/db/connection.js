const mongoose = require("mongoose");

// database connection
mongoose
  .connect(process.env.DB_URL)
  .then((data) => console.log("Successfully connected to the Database!"))
  .catch((err) => {
    console.log("connection failed!");
    console.log(err);
  });
