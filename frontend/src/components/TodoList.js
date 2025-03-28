import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { addTodo, toggleTodo, deleteTodo, updateTodo, setFilter, fetchTodos, reset } from '../features/todoSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const dispatch = useDispatch();
  const { todos, filter, isLoading, isError, message } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTodos());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText.trim() }));
      setEditingId(null);
      setEditText('');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress size={60} sx={{ color: '#82AAFF' }} />
      </Box>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        maxWidth: 600, 
        margin: '4rem auto',
        padding: 3,
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        align="center"
        sx={{
          color: '#EEFFFF',
          mb: 4,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '-0.025em',
          fontSize: '2.5rem'
        }}
      >
        Todo List
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <form onSubmit={handleAddTodo}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused': {
                  borderColor: '#82AAFF',
                  boxShadow: '0 0 0 2px rgba(130, 170, 255, 0.3)',
                },
                '& fieldset': {
                  borderColor: 'transparent',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#EEFFFF',
                padding: '16px 20px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(176, 190, 197, 0.8)',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(176, 190, 197, 0.8)',
                opacity: 1,
              },
            }}
            InputProps={{
              sx: {
                fontFamily: 'Inter, sans-serif',
              }
            }}
          />
          <Button 
            variant="contained" 
            type="submit"
            sx={{
              minWidth: '120px',
              background: 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              padding: '12px 24px',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #8FB4FF 0%, #D6ACEF 100%)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Add
          </Button>
        </Box>
      </form>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => newFilter && dispatch(setFilter(newFilter))}
          sx={{
            gap: 1,
            '& .MuiToggleButton-root': {
              fontFamily: 'Inter, sans-serif',
              borderRadius: '10px',
              padding: '8px 20px',
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              fontWeight: 500,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-selected': {
                background: 'rgba(130, 170, 255, 0.1)',
                color: '#EEFFFF',
                borderColor: '#82AAFF',
                boxShadow: '0 0 0 1px rgba(130, 170, 255, 0.4)',
              },
            },
          }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <List>
        {filteredTodos.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: '#B0BEC5',
              fontFamily: 'Inter, sans-serif',
              py: 4,
            }}
          >
            {filter === 'all' 
              ? 'No todos yet. Add one above!' 
              : filter === 'active' 
                ? 'No active todos' 
                : 'No completed todos'}
          </Typography>
        ) : (
          filteredTodos.map((todo) => (
            <ListItem
              key={todo._id}
              sx={{
                mb: 2,
                borderRadius: '16px',
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25)',
                  background: 'rgba(0, 0, 0, 0.25)',
                },
                padding: '18px',
              }}
            >
              {editingId === todo._id ? (
                <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&.Mui-focused': {
                          borderColor: '#82AAFF',
                          boxShadow: '0 0 0 2px rgba(130, 170, 255, 0.3)',
                        },
                        '& fieldset': {
                          borderColor: 'transparent',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: '#EEFFFF',
                        padding: '12px 16px',
                        fontFamily: 'Inter, sans-serif',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleSaveEdit(todo._id)}
                    sx={{
                      background: 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)',
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #8FB4FF 0%, #D6ACEF 100%)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setEditingId(null)}
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#EEFFFF',
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.05)',
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box 
                      onClick={() => dispatch(toggleTodo(todo._id))}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: todo.completed 
                          ? 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)'
                          : 'rgba(255, 255, 255, 0.05)',
                        marginRight: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#82AAFF',
                        }
                      }}
                    >
                      {todo.completed && <CheckIcon sx={{ fontSize: 16, color: 'white' }} />}
                    </Box>
                    <ListItemText
                      primary={todo.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: todo.completed ? '#B0BEC5' : '#EEFFFF',
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          opacity: todo.completed ? 0.7 : 1,
                          transition: 'all 0.3s ease',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                          textAlign: 'left',
                        },
                      }}
                    />
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleEdit(todo)}
                      sx={{ 
                        mr: 1,
                        color: 'rgba(255, 255, 255, 0.6)',
                        '&:hover': {
                          color: '#82AAFF',
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => dispatch(deleteTodo(todo._id))}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        '&:hover': {
                          color: '#ff8a8a',
                          background: 'rgba(222, 80, 80, 0.1)',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default TodoList; 