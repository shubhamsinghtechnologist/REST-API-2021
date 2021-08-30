// Mongo Database Connection
const mongoose = require("mongoose");

// Local Compass URL: 'mongodb://localhost:27017/todos-app',
// Example of Remote Atlas URL: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@shubham-cluster.p0zxy.mongodb.net/${process.env.MONGO_DB_DATABASE}`
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.k2egk.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
    {
      // "mongodb://localhost:27017/todos-app",
      // {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(`Database is successfully connected`);
  })
  .catch((error) => {
    console.log(`Getting error while connecting database: ${error}`);
  });
// ---------------------------------------------------- The End ---------------------------------------------------------------
