const Task = require("../model/task");

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) return res.status(400).json({ message: "Title is required" });
        const task = await Task.create({ title, description });
        res.status(201).json(task)
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;

    try {
        const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json(task);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });

    }

}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { getAllTask, addTask, updateTask, deleteTask }