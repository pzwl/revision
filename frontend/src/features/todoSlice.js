import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from '../services/todoService';

const initialState = {
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get todos
export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await todoService.getTodos();
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add todo
export const addTodo = createAsyncThunk(
  'todos/create',
  async (text, thunkAPI) => {
    try {
      return await todoService.createTodo({ text });
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update todo
export const updateTodo = createAsyncThunk(
  'todos/update',
  async (todoData, thunkAPI) => {
    const { id, ...updateData } = todoData;
    
    try {
      return await todoService.updateTodo(id, updateData);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Toggle todo completion
export const toggleTodo = createAsyncThunk(
  'todos/toggle',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const todo = state.todos.todos.find(todo => todo._id === id);
      
      if (!todo) {
        throw new Error('Todo not found');
      }
      
      return await todoService.updateTodo(id, { 
        completed: !todo.completed 
      });
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete todo
export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id, thunkAPI) => {
    try {
      await todoService.deleteTodo(id);
      return id;
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index].completed = action.payload.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      });
  },
});

export const { reset, setFilter } = todoSlice.actions;
export default todoSlice.reducer; 