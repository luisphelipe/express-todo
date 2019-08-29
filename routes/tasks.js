var express = require("express");
var router = express.Router();

const tasks = require("../controllers/tasks.controller");

// Create a new Task
router.post("/", tasks.create);

// Retrieve all Tasks
router.get("/", tasks.findAll);

// Retrieve a single Task with taskId
router.get("/:taskId", tasks.findOne);

// Update a Task with taskId
router.put("/:taskId", tasks.update);

// Delete a Task with taskId
router.delete("/:taskId", tasks.delete);

module.exports = router;
