import { useState } from 'react';
import '../../../App.css';
import Typography from '@mui/material/Typography';
import { TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';

const textFieldStyles = {
  backgroundColor: '#383838',
  borderRadius: '8px',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: '#666',
    },
    '&:hover fieldset': {
      borderColor: '#888',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputBase-input': {},
  '& .MuiInputLabel-root': {
    color: '#aaa',
  },
};

export const CrestCalculator = () => {
  const [veteran, setVeteran] = useState<string>('');
  const [champion, setChampion] = useState<string>('');
  const [hero, setHero] = useState<string>('');
  const [result, setResult] = useState<{
    hero: number;
    myth: number;
    veteranRem: number;
    championRem: number;
    heroRem: number;
  } | null>(null);

  const calculateCrest = (): void => {
    const veteranNum = parseInt(veteran) || 0;
    const championNum = parseInt(champion) || 0;
    const heroNum = parseInt(hero) || 0;

    const veteranToChampion = Math.floor(veteranNum / 45) * 15;
    const championTotal = veteranToChampion + championNum;
    const championToHero = Math.floor(championTotal / 45) * 15;
    const heroTotal = championToHero + heroNum;
    const heroToMyth = Math.floor(heroTotal / 45) * 15;

    const veteranRemainder = veteranNum % 45;
    const championRemainder = championTotal % 45;
    const heroRemainder = heroTotal % 45;

    setResult({
      hero: heroTotal,
      myth: heroToMyth,
      veteranRem: veteranRemainder,
      championRem: championRemainder,
      heroRem: heroRemainder,
    });
  };

  return (
    <>
      <Typography variant="h1" sx={{ fontSize: '2rem' }}>
        Crest Calculator
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '300px',
          marginTop: 2,
        }}
      >
        <TextField
          label="Veteran Dawncrest"
          variant="outlined"
          type="number"
          value={veteran}
          onChange={(e) => setVeteran(e.target.value)}
          sx={textFieldStyles}
        />
        <TextField
          label="Champion Dawncrest"
          variant="outlined"
          type="number"
          value={champion}
          onChange={(e) => setChampion(e.target.value)}
          sx={textFieldStyles}
        />
        <TextField
          label="Hero Dawncrest"
          variant="outlined"
          type="number"
          value={hero}
          onChange={(e) => setHero(e.target.value)}
          sx={textFieldStyles}
        />
        <Button
          variant="contained"
          onClick={calculateCrest}
          sx={{
            backgroundColor: '#2e2e46',
            color: '#fff',
            padding: '10px 16px',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#45456a',
              color: '#ffffff',
            },
          }}
        >
          Give me my crest
        </Button>
      </Box>
      <Box>
        {result && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', marginTop: 4 }}>
              Result
            </Typography>
            <Typography variant="body1">
              Veteran Remainder: {result.veteranRem}
            </Typography>
            <Typography variant="body1">
              Champion Remainder: {result.championRem}
            </Typography>
            <Typography variant="body1">
              Hero Remainder: {result.heroRem}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 1, color: '#1976d2' }}>
              Total Myth Crests: {result.myth}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
