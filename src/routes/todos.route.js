// When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE),
// we need to determine how the server will reponse by setting up the routes.

const express = require("express");
const router = express.Router(); // Used for Routing

// Import controllers methods
const {
  addNewTodos,
  fetchAllTodos,
  fetchTodoById,
  fetchAllPublishedTodos,
  updateTodoById,
  deleteSingleTodo,
  deleteAllTodos,
} = require("../controllers/todos.controller");

// Create New Todo (POST)
router.post("/createTodo", addNewTodos);

// Fetch All Todos (GET)
router.get("/fetchAllTodos", fetchAllTodos);

// Fetch Todo based on id (GET)
router.get("/fetchTodo/:id", fetchTodoById);

// Fetch All published true Todos (GET)
router.get("/fetchPublishedTodos", fetchAllPublishedTodos);

// Update Todo based on id (GET)
router.put("/updateTodo/:id", updateTodoById);

// Delete Todo based on id (DELETE)
router.delete("/deleteTodo/:id", deleteSingleTodo);

// Delete all Todo (DELETE)
router.delete("/deleteAllTodos", deleteAllTodos);

module.exports = router;

// ---------------------------------------------------- The End ------------------------------------------------------------
