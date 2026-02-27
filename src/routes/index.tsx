import { JSX, createContext, useState, ReactNode, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { Calculator } from '../pages/calculator/Calculator';
import { Cheatsheet } from '../pages/cheatsheet/Cheatsheet';
import { GearcostCalculator } from '../pages/gearcost/gearcostCalculator';
import { Navbar } from '../components/Navbar';
import { Box } from '@mui/material';

export const SidebarContext = createContext({
  sidebarOpen: true,
  setSidebarOpen: (_: boolean) => {},
});

function RouterContent(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarOpen } = useContext(SidebarContext);

  const sidebarWidth = sidebarOpen ? '200px' : '60px';

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box
        sx={{
          marginLeft: { xs: 0, md: sidebarWidth },
          marginTop: { xs: '60px', md: 0 },
          padding: 2,
          flex: 1,
          transition: 'all 0.3s ease',
          minHeight: '100vh',
          alignContent: 'flex-start',
        }}
      >
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/cheatsheet" element={<Cheatsheet />} />
          <Route path="/gearcost" element={<GearcostCalculator />} />
        </Routes>
      </Box>
    </Box>
  );
}

export function Router(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
        <RouterContent />
      </SidebarContext.Provider>
    </BrowserRouter>
  );
}
