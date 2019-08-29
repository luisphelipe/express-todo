const Task = require("../app/models/task.model");

exports.attachTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task || toString(task.owner) != toString(req.user._id)) {
      return res.status(404).send({
        message: "Task not found with id " + req.params.taskId
      });
    }

    req.task = task;
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Task not found with id " + req.params.taskId
      });
    }
    return res.status(500).send({
      message: "Error retrieving task with id " + req.params.taskId
    });
  }

  next();
};
