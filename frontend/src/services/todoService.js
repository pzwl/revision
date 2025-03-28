import axios from 'axios';

const API_URL = '/api/todos/';

// Create auth header config with token
const getConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

// Get all todos
const getTodos = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data;
};

// Create new todo
const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData, getConfig());
  return response.data;
};

// Update todo
const updateTodo = async (id, todoData) => {
  const response = await axios.put(API_URL + id, todoData, getConfig());
  return response.data;
};

// Delete todo
const deleteTodo = async (id) => {
  const response = await axios.delete(API_URL + id, getConfig());
  return response.data;
};

const todoService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default todoService; 