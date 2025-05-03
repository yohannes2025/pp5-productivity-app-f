import axios from "axios";

const API_BASE_URL = "/api/"; // Adjust if your API is served elsewhere

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // You'll likely need to include an authorization header here
    // 'Authorization': `Token ${localStorage.getItem('authToken')}`,
  },
});

// Function to set the auth token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Tasks
export const getTasks = (filters = {}) => {
  return api.get("tasks/", { params: filters });
};

export const createTask = (taskData) => {
  return api.post("tasks/", taskData);
};

export const updateTask = (id, taskData) => {
  return api.put(`tasks/${id}/`, taskData);
};

export const deleteTask = (id) => {
  return api.delete(`tasks/${id}/`);
};

export const markTaskOverdue = (id) => {
  return api.put(`tasks/${id}/mark_overdue/`);
};

export const markTaskNotOverdue = (id) => {
  return api.put(`tasks/${id}/mark_not_overdue/`);
};

// Priorities
export const getPriorities = () => {
  return api.get("priorities/");
};

// Categories
export const getCategories = () => {
  return api.get("categories/");
};

// States
export const getStates = () => {
  return api.get("states/");
};

export default api;
