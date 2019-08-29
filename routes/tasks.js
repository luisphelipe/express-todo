var express = require("express");
var router = express.Router();

const tasks = require("../controllers/tasks.controller");
const { attachTask } = require("../middlewares/attachTask.middleware");

// Create a new Task
router.post("/", tasks.create);

// Retrieve all Tasks
router.get("/", tasks.findAll);

// Retrieve a single Task with taskId
router.get("/:taskId", attachTask, tasks.findOne);

// Update a Task with taskId
router.put("/:taskId", attachTask, tasks.update);

// Delete a Task with taskId
router.delete("/:taskId", attachTask, tasks.delete);

module.exports = router;
