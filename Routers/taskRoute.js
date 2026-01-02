const express = require("express");
const route = express.Router();
const { getAllTask, addTask, updateTask, deleteTask } = require("../controllers/taskController")

route.get("/", getAllTask);

route.post("/", addTask)

route.put("/:id", updateTask)

route.delete("/:id", deleteTask)

module.exports = route;