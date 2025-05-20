const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;  // Pagination
  try {
    const tasks = await Task.find({ user: req.user._id })
                            .skip((page - 1) * limit)
                            .limit(Number(limit))
                            .sort({ createdAt: -1 })
                            .select('title dueDate status priority');  // Only return title, dueDate, status, and priority
    res.json({ status: true, tasks });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId).populate("user", "name email");
    if (!task) return res.status(404).json({ status: false, msg: "Task not found" });
    res.json({ status: true, task });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.postTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user._id
    });
    await newTask.save();
    res.status(201).json({ status: true, task: newTask });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.putTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, priority, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      dueDate,
      priority,
      status
    }, { new: true });

    if (!updatedTask) return res.status(404).json({ status: false, msg: "Task not found" });
    res.json({ status: true, task: updatedTask });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.updateStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;  
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!updatedTask) return res.status(404).json({ status: false, msg: "Task not found" });
    res.json({ status: true, task: updatedTask });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) return res.status(404).json({ status: false, msg: "Task not found" });
    res.json({ status: true, msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.moveToPriorityList = async (req, res) => {
  const { taskId } = req.params;
  const { priority } = req.body;  // Update task priority
  try {
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ status: false, msg: "Invalid priority" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, { priority }, { new: true });
    if (!updatedTask) return res.status(404).json({ status: false, msg: "Task not found" });
    res.json({ status: true, task: updatedTask });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};
