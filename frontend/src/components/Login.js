import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/authSlice';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Form validation handled by the component
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    
    // Clear errors when typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: '',
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 450,
        width: '100%',
        padding: 4,
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
        }}
      >
        Login
      </Typography>

      {isError && <Alert severity="error" sx={{ mb: 3 }}>{message}</Alert>}

      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            label="Email"
            variant="outlined"
            error={!!formErrors.email}
            helperText={formErrors.email}
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
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(176, 190, 197, 0.8)',
              },
              '& .MuiFormHelperText-root': {
                color: '#ff8a8a',
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'rgba(176, 190, 197, 0.8)',
                fontFamily: 'Inter, sans-serif',
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
            label="Password"
            variant="outlined"
            error={!!formErrors.password}
            helperText={formErrors.password}
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
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(176, 190, 197, 0.8)',
              },
              '& .MuiFormHelperText-root': {
                color: '#ff8a8a',
              },
            }}
            InputLabelProps={{
              sx: {
                color: 'rgba(176, 190, 197, 0.8)',
                fontFamily: 'Inter, sans-serif',
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            background: 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
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
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
          ) : (
            'Login'
          )}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            color: '#B0BEC5',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Don't have an account?{' '}
          <Button
            onClick={() => navigate('/register')}
            sx={{
              color: '#82AAFF',
              textTransform: 'none',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              '&:hover': {
                background: 'transparent',
                textDecoration: 'underline',
              },
            }}
          >
            Register
          </Button>
        </Typography>
      </form>
    </Paper>
  );
};

export default Login; 