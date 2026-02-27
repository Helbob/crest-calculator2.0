import { JSX, useState, useContext } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { SidebarContext } from '../routes/index';

export function Navbar(): JSX.Element {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navItems = [
    { label: 'Crest Calculator', path: '/' },
    { label: 'Cheatsheet', path: '/cheatsheet' },
    { label: 'Gear Cost Calculator', path: '/gearcost' },
  ];

  const NavContent = ({
    hideCloseButton = false,
  }: {
    hideCloseButton?: boolean;
  }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '40px',
        }}
      >
        <Box
          sx={{
            opacity: sidebarOpen || isMobile ? 1 : 0,
            transition: 'opacity 0.3s ease',
            visibility: sidebarOpen || isMobile ? 'visible' : 'hidden',
          }}
        >
          WoW toolbox
        </Box>
        {isMobile && (
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: '#fff', padding: 0 }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {!isMobile && !hideCloseButton && (
          <IconButton
            onClick={() => setSidebarOpen(false)}
            sx={{
              color: '#fff',
              padding: 0,
              marginLeft: 'auto',
              transition: 'transform 0.3s ease',
              transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      {navItems.map((item) => (
        <Button
          key={item.path}
          component={RouterLink}
          to={item.path}
          fullWidth
          onClick={handleDrawerClose}
          sx={{
            justifyContent: 'flex-start',
            color: isActive(item.path) ? 'white' : '#aaa',
            backgroundColor: isActive(item.path) ? '#45456a' : 'transparent',
            padding: '12px 16px',
            fontSize: '1rem',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#45456a',
              color: 'white',
              paddingLeft: '20px',
            },
          }}
        >
          <Box
            sx={{
              opacity: sidebarOpen || isMobile ? 1 : 0,
              transition: 'opacity 0.3s ease',
              visibility: sidebarOpen || isMobile ? 'visible' : 'hidden',
            }}
          >
            {item.label}
          </Box>
        </Button>
      ))}
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            backgroundColor: '#2e2e46',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            zIndex: 1200,
            borderBottom: '1px solid #444',
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#fff',
              marginLeft: 2,
            }}
          >
            WoW toolbox
          </Box>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: '#2e2e46',
              width: '250px',
              marginTop: '60px',
            },
          }}
        >
          <Box sx={{ padding: 2 }}>
            <NavContent />
          </Box>
        </Drawer>
      </>
    );
  }

  // Desktop view with collapsible sidebar
  return (
    <Box sx={{ display: 'flex' }}>
      {sidebarOpen && (
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
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1100,
            animation: 'slideInLeft 0.3s ease-out',
            '@keyframes slideInLeft': {
              from: {
                transform: 'translateX(-100%)',
                opacity: 0,
              },
              to: {
                transform: 'translateX(0)',
                opacity: 1,
              },
            },
          }}
        >
          <NavContent hideCloseButton={false} />
        </Box>
      )}

      {!sidebarOpen && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            width: '60px',
            backgroundColor: '#2e2e46',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px 0',
            borderRight: '1px solid #444',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1100,
            animation: 'slideInLeftSmall 0.3s ease-out',
            '@keyframes slideInLeftSmall': {
              from: {
                transform: 'translateX(-60px)',
                opacity: 0,
              },
              to: {
                transform: 'translateX(0)',
                opacity: 1,
              },
            },
          }}
        >
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{
              color: '#fff',
              padding: '8px',
              marginBottom: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#45456a',
                transform: 'scale(1.1)',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
