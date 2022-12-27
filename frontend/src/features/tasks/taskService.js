import axios from "axios";

const API_URL = "/api/tasks/";

// Create new task
const createTask = async (taskData, token) => {
  // To ensure that createTask is protected (since only the 3 user routes use the protect function)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, taskData, config);

  return response.data;
};

// Get user tasks
const getTasks = async (token) => {
  // To ensure that createTask is protected (since only the 3 user routes use the protect function)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user task
const deleteTask = async (taskId, token) => {
  // To ensure that createTask is protected (since only the 3 user routes use the protect function)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + taskId, config);

  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  deleteTask,
};

export default taskService;
