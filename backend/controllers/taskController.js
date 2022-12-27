/* asyncHandler: use a middleware for handling exceptions inside of async express routes, and passing them to your Express Error Handlers
(simpler way to implement async await try-catch blocks) */
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  // Get a specific user's tasks: user: req.user.id
  const tasks = await Task.find({ user: req.user.id });

  res.status(200).json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler(async (req, res) => {
  // Check for text, if not throw an error
  if (!req.body.text) {
    res.status(400);
    // Express Error Handler
    throw new Error("Please add a text field");
  }

  const task = await Task.create({
    text: req.body.text,
    // Setting a specific user goal
    user: req.user.id,
  });

  res.status(200).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  // req.params.id: Getting the id from the website url
  const task = await Task.findById(req.params.id);

  // Checks if task exists
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // Update a specific user goal

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // findByIdAndUpdate parameters: id, data, other options
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Creates a task if it does not exist
  });

  res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  // Checks if task exists
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // Delete a specific user goal

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the task user
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
