import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider, createTheme, CssBaseline, Button, Typography, Box, Paper, TextField, Alert } from '@mui/material';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './index.css';
import RepellingParticleSystem from './components/SynthwaveBackground';
import { loginSchema, registerSchema } from './schemas/auth';
import api from './utils/axios';

// Create a simple reducer
const simpleReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Create store
const store = configureStore({
  reducer: {
    counter: simpleReducer,
  },
});

// Create theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82AAFF',
      light: '#ADCCFF',
      dark: '#5D87DF',
    },
    secondary: {
      main: '#C792EA',
      light: '#E4BDFF',
      dark: '#A06AC9',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.08)',
    },
    text: {
      primary: '#EEFFFF',
      secondary: '#B0BEC5',
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 500,
          background: 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #8FB4FF 0%, #D6ACEF 100%)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
});

// Home component
const Home = () => (
  <Paper
    elevation={3}
    sx={{
      maxWidth: 500,
      width: '100%',
      p: 4,
      borderRadius: '24px',
    }}
  >
    <Typography 
      variant="h4" 
      component="h1" 
      align="center"
      sx={{
        mb: 3,
        fontWeight: 600,
        letterSpacing: '-0.025em',
      }}
    >
      Home Page
    </Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      Welcome to the Todo App! This is the home page.
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
      <Button 
        variant="contained" 
        component={Link} 
        to="/login"
      >
        Login
      </Button>
      <Button 
        variant="outlined"  
        component={Link} 
        to="/register"
        sx={{ 
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        Register
      </Button>
    </Box>
  </Paper>
);

// Login component
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      const response = await api.post('/users/login', data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        width: '100%',
        p: 4,
        borderRadius: '24px',
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        align="center"
        sx={{
          mb: 3,
          fontWeight: 600,
          letterSpacing: '-0.025em',
        }}
      >
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Email
          </Typography>
          <TextField
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            placeholder="Enter your email"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="Enter your password"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mb: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #8FB4FF 0%, #D6ACEF 100%)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Sign In
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#82AAFF',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

// Register component
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    try {
      console.log('Form submitted with data:', data);
      setError('');
      const { confirmPassword, ...registerData } = data;
      const response = await api.post('/users', registerData);
      console.log('Registration successful:', response.data);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  console.log('Current form errors:', errors);

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        width: '100%',
        p: 4,
        borderRadius: '24px',
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        align="center"
        sx={{
          mb: 3,
          fontWeight: 600,
          letterSpacing: '-0.025em',
        }}
      >
        Create Account
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Name
          </Typography>
          <TextField
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            placeholder="Enter your name"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Email
          </Typography>
          <TextField
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            placeholder="Enter your email"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="Create a password"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            placeholder="Confirm your password"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mb: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #8FB4FF 0%, #D6ACEF 100%)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Create Account
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#82AAFF',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

// Add Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Get user profile
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setUserName(response.data.name);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        width: '100%',
        p: 4,
        borderRadius: '24px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Welcome, {userName}!
        </Typography>
        <Button 
          variant="outlined" 
          onClick={handleLogout}
          sx={{ 
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mb: 3 }}>
        This is your personal dashboard. Your todos will appear here soon!
      </Typography>
    </Paper>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RepellingParticleSystem />
          <Box sx={{ 
            padding: 3, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 10,
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
