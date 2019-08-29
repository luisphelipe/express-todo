const Task = require("../app/models/task.model");

// Create and Save a new Task
exports.create = (req, res) => {
  if (!req.body.content) {
    res.status(400).json({ message: "Task content can not be empty" });
  }

  const task = new Task(req.body);

  task
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Something went wrong while creating the Task"
      });
    });
};

// Retrieve and return all Tasks from the database.
exports.findAll = (req, res) => {
  Task.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Something went wrong while retrieving Task list"
      });
    });
};

// Find a single Task with a TaskId
exports.findOne = (req, res) => {
  Task.findById(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }

      res.send(task);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Error retrieving task with id " + req.params.taskId
      });
    });
};

// Update a Task identified by the TaskId in the request
exports.update = (req, res) => {
  // Find task and update it with the request body
  console.log(req.body);

  Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send(task);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Error updating task with id " + req.params.taskId
      });
    });
};

// Delete a Task with the specified TaskId in the request
exports.delete = (req, res) => {
  Task.findByIdAndRemove(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send({ message: "Task deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.taskId
      });
    });
};
