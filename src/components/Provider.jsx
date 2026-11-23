import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { CinemaProvider } from '../context/CinemaContext';

// Cinema-themed Dark Palette with Amber/Gold & Crimson accents
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f59e0b', // Cinema Gold / Amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#000000',
    },
    secondary: {
      main: '#e50914', // Cinema Marquee Red
      light: '#f87171',
      dark: '#b91c1c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#070a12',
      paper: '#131b2e',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#1e293b',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Segoe UI", sans-serif',
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        boxSizing: 'border-box',
      },
      'html, body, #root': {
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#070a12',
        color: '#f8fafc',
      },
      '::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '::-webkit-scrollbar-track': {
        background: '#0b0f19',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#334155',
        borderRadius: '3px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#f59e0b',
      },
      // Leaflet popup dark cinema theme styling
      '.leaflet-popup-content-wrapper': {
        background: '#ffffff !important',
        color: '#0f172a !important',
        borderRadius: '12px !important',
        boxShadow: '0 12px 30px rgba(0,0,0,0.6) !important',
        padding: '0 !important',
      },
      '.leaflet-popup-content': {
        margin: '8px 12px !important',
        lineHeight: '1.4 !important',
      },
      '.leaflet-popup-tip': {
        background: '#ffffff !important',
      },
      '.leaflet-container': {
        fontFamily: '"Inter", "Roboto", sans-serif !important',
      },
    }}
  />
);

const Provider = ({ children }) => (
  <HashRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <CinemaProvider>{children}</CinemaProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </HashRouter>
);

export default Provider;
