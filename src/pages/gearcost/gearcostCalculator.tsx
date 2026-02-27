import { JSX } from 'react';
import { Box, Typography } from '@mui/material';

export function GearcostCalculator(): JSX.Element {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', marginBottom: 2 }}>
        Gear Cost Calculator
      </Typography>
      <Typography variant="body1" sx={{ color: '#aaa' }}>
        Coming soon...
      </Typography>
      <Typography variant="body2" sx={{ color: '#555', marginTop: 1 }}>
        This tool will help you calculate the cost of upgrading your gear to
        reach a certain item level, taking into account the various upgrade
        paths and their associated costs.
      </Typography>
    </Box>
  );
}
