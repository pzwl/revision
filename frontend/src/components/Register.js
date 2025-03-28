import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/authSlice';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const { name, email, password, password2 } = formData;

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
    
    if (!name) {
      errors.name = 'Name is required';
    }
    
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
    
    if (!password2) {
      errors.password2 = 'Please confirm your password';
    } else if (password !== password2) {
      errors.password2 = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  const textFieldStyles = {
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
  };

  const inputLabelProps = {
    sx: {
      color: 'rgba(176, 190, 197, 0.8)',
      fontFamily: 'Inter, sans-serif',
    },
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
        Register
      </Typography>

      {isError && <Alert severity="error" sx={{ mb: 3 }}>{message}</Alert>}

      <form onSubmit={onSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            label="Name"
            variant="outlined"
            error={!!formErrors.name}
            helperText={formErrors.name}
            sx={textFieldStyles}
            InputLabelProps={inputLabelProps}
          />
        </Box>

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
            sx={textFieldStyles}
            InputLabelProps={inputLabelProps}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
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
            sx={textFieldStyles}
            InputLabelProps={inputLabelProps}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm your password"
            label="Confirm Password"
            variant="outlined"
            error={!!formErrors.password2}
            helperText={formErrors.password2}
            sx={textFieldStyles}
            InputLabelProps={inputLabelProps}
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
            'Register'
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
          Already have an account?{' '}
          <Button
            onClick={() => navigate('/login')}
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
            Login
          </Button>
        </Typography>
      </form>
    </Paper>
  );
};

export default Register; 