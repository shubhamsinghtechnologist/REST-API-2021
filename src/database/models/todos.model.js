// Define the database schema
const mongoose = require("mongoose");
let todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 5000,
    },
    published: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("todo", todosSchema); //First Parameter is Collection (table) Name and 2nd is schema.

// ---------------------------------------------------- The End ------------------------------------------------------------
