// This is the entry point of our application.
// ------------------------------------------------------------------------------------------------------------------
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/database/config/db.config");

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// CORS Handling : cors provides Express middleware to enable CORS with various options.
const cors = require("cors");
// let corsOptions = { origin: "http://localhost:2000" }; //Only allowed frontend URL http://localhost:2000
let corsOptions = { origin: "*" };
app.use(cors(corsOptions));
// ------------------------------------------------------------------------------------------------------------------
// Simple route
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center;color:red'>TODOS APP</h1><h3 style='text-align:center;color:green;'>This is the Home Page of TODOS App developed by Shubham Singh</h3>"
  );
});

// Routes for APIs
const todosRoute = require("./src/routes/todos.route");
app.use("/api", todosRoute);

// Bad URLs Handling: If requested url will not match than we will display the bad request error
app.all("*", function (req, res) {
  return res.send({ message: "Bad Request. The requested URL was not found" });
});

// set port, listen for requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// ---------------------------------------------------- The End ------------------------------------------------------------
