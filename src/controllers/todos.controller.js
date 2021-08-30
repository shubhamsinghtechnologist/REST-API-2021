// Import todos schema
const todos = require("../database/models/todos.model");
// -------------------------------------------------------------------------------------------------

// Create and save new todo in the database (POST)

exports.addNewTodos = (req, res) => {
  // Validate request
  if (!req.body.title && !req.body.description)
    return res
      .status(400)
      .send({ message: "title and description cannot be empty" });
  if (!req.body.title)
    return res.status(400).send({ message: "title cannot be empty" });
  if (!req.body.description)
    return res.status(400).send({ message: "description cannot be empty" });

  // Create a todo
  const todo = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };
  const todoData = new todos(todo);
  // Save information in the database using object.save().
  todoData
    .save()
    .then((data) => {
      res
        .status(201)
        .json({ message: "Success! New todo Added successfully", data });
    })
    .catch((error) => {
      res.status(500).json({
        message: error || "Some error occurred while saving todo data.",
      });
    });
};

// -------------------------------------------------------------------------------------------------------------------
// Fetch List of all todos from the database (GET) with using condition and without condition (Same API)
// We use req.query.title to get query string from the Request and consider it as condition

exports.fetchAllTodos = (req, res) => {
  // Retrieve all todos from the database using find() with certain condition.
  const title = req.query.title; //req.body.title;
  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  todos
    .find(condition)
    .then((data) => {
      if (data.length == 0)
        res.status(200).json({
          message: "No todo was found in the database",
          totalRecords: data.length,
          data,
        });
      else return res.status(200).json({ totalRecords: data.length, data });
    })
    .catch((error) => {
      res.status(500).json({
        message: error || "Some error occurred while retrieving todos.",
      });
    });
};

//-------------------------------------------------------------------------------------------------------------------

// Fetch Single todo from the database based on id (GET).
exports.fetchTodoById = (req, res) => {
  const id = req.params.id;
  todos
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).json({ message: `Not found any todo with id: ${id}` });
      else
        return res
          .status(200)
          .json({ message: `Success! Todo found with id: ${id}`, data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: error || "Error retrieving todo with id=" + id });
    });
};
//-------------------------------------------------------------------------------------------------------------------

// Update Single todo in the database based on id (PUT).
exports.updateTodoById = (req, res) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object)
    return res.status(400).send({ message: "Data to update cannot be empty" });
  // Validate request
  if (!req.body.title && !req.body.description)
    return res
      .status(400)
      .send({ message: "title and description cannot be empty" });
  if (!req.body.title)
    return res.status(400).send({ message: "The title cannot be empty" });
  if (!req.body.description)
    return res.status(400).send({ message: "The description cannot be empty" });

  const id = req.params.id;

  todos
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: `Cannot update todo with id=${id}. Todo was not found`,
        });
      else
        return res
          .status(200)
          .send({ message: "Success! Todo was updated successfully" });
    })
    .catch((error) => {
      return res
        .status(500)
        .send({ message: `Error updating todo with id: ${id} - ${error}` });
    });
};
//-------------------------------------------------------------------------------------------------------------------
// Delete single todo from the database based on id (DELETE).
exports.deleteSingleTodo = (req, res) => {
  const id = req.params.id;
  todos
    .findByIdAndRemove(id)
    .then((data) => {
      if (!data)
        return res.status(400).send({
          message: `Cannot delete todo with id=${id}. Todo was not found`,
        });
      else
        return res.status(200).send({
          message: `Success! Todo with id:${id} was deleted successfully`,
        });
    })
    .catch((error) => {
      return res.status(500).send({
        message: `Could not delete todo with id: ${id} - ${error}`,
      });
    });
};

//-------------------------------------------------------------------------------------------------------------------
// Delete All todo from the database. (DELETE).
exports.deleteAllTodos = (req, res) => {
  todos
    .deleteMany({})
    .then((data) => {
      if (data.n == 0 && data.deletedCount == 0)
        return res.status(200).send({ message: "No todo found for delete" });
      if (data.n == 1)
        return res.status(200).send({
          message: `Success! ${data.deletedCount} todo was deleted successfully!`,
        });
      else
        return res.status(200).send({
          message: `Success! ${data.deletedCount} todos were deleted successfully!`,
        });
    })
    .catch((error) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while removing all todos.",
      });
    });
};

//-------------------------------------------------------------------------------------------------------------------
// Fetch All published todo from the database. (GET).
exports.fetchAllPublishedTodos = (req, res) => {
  todos
    .find({ published: true })
    .then((data) => {
      if (data.length == 0)
        res.status(200).json({
          message: "No Record found in the database",
          totalRecords: data.length,
          data,
        });
      else return res.status(200).json({ totalRecords: data.length, data });
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error || "Some error occurred while retrieving published todos.",
      });
    });
};

// ---------------------------------------------------- The End ---------------------------------------------------------------
