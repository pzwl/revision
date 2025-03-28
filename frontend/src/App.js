import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline, Container, ThemeProvider, createTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { store } from './store';
import TodoList from './components/TodoList';
import RepellingParticleSystem from './components/SynthwaveBackground';
import Login from './components/Login';
import Register from './components/Register';

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
    action: {
      active: '#82AAFF',
      hover: 'rgba(130, 170, 255, 0.08)',
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    body2: {
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0em',
      textTransform: 'none',
    },
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
          background: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '10px 20px',
          fontWeight: 500,
          boxShadow: 'none',
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #82AAFF 0%, #C792EA 100%)',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
              background: 'linear-gradient(135deg, #8FB4FF 0%, #D6ACEF 100%)',
            },
          },
          '&.MuiButton-outlined': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-selected': {
              background: 'rgba(130, 170, 255, 0.1)',
              borderColor: '#82AAFF',
              boxShadow: '0 0 0 1px rgba(130, 170, 255, 0.4)',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#82AAFF',
              boxShadow: '0 0 0 1px rgba(130, 170, 255, 0.3)',
            },
            '& input': {
              padding: '16px 20px',
              color: '#EEFFFF',
            },
            '& input::placeholder': {
              color: 'rgba(176, 190, 197, 0.8)',
              opacity: 1,
            },
            background: 'rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#B0BEC5',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.3)',
          '&.Mui-checked': {
            color: '#82AAFF',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RepellingParticleSystem />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/register" element={<div>Register Page</div>} />
          </Routes>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
