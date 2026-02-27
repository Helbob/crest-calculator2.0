import { JSX } from 'react';
import { Box, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export function Navbar(): JSX.Element {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        width: '200px',
        backgroundColor: '#2e2e46',
        height: '100vh',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 2,
          paddingBottom: 2,
          borderBottom: '1px solid #444',
        }}
      >
        WoW toolbox
      </Box>

      <Button
        component={RouterLink}
        to="/"
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          color: isActive('/') ? 'white' : '#aaa',
          backgroundColor: isActive('/') ? '#45456a' : 'transparent',
          padding: '12px 16px',
          fontSize: '1rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#45456a',
            color: 'white',
          },
        }}
      >
        Crest Calculator
      </Button>

      <Button
        component={RouterLink}
        to="/cheatsheet"
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          color: isActive('/cheatsheet') ? 'white' : '#aaa',
          backgroundColor: isActive('/cheatsheet') ? '#45456a' : 'transparent',
          padding: '12px 16px',
          fontSize: '1rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#45456a',
            color: 'white',
          },
        }}
      >
        Cheatsheet
      </Button>
      <Button
        component={RouterLink}
        to="/gearcost"
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          color: isActive('/gearcost') ? 'white' : '#aaa',
          backgroundColor: isActive('/gearcost') ? '#45456a' : 'transparent',
          padding: '12px 16px',
          fontSize: '1rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#45456a',
            color: 'white',
          },
        }}
      >
        Gear Cost Calculator
      </Button>
    </Box>
  );
}
