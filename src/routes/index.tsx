import { JSX } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Calculator } from '../pages/calculator/Calculator';
import { Cheatsheet } from '../pages/cheatsheet/Cheatsheet';
import { GearcostCalculator } from '../pages/gearcost/gearcostCalculator';
import { Navbar } from '../components/Navbar';
import { Box } from '@mui/material';

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box
          sx={{ marginLeft: '200px', padding: 3, width: 'calc(100% - 200px)' }}
        >
          <Routes>
            <Route path="/" element={<Calculator />} />
            <Route path="/cheatsheet" element={<Cheatsheet />} />
            <Route path="/gearcost" element={<GearcostCalculator />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
