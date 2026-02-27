import { JSX, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { upgradeTracks } from '../../data/cheatsheetData';

export function Cheatsheet(): JSX.Element {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: 2, width: '1000px' }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', marginBottom: 2 }}>
        Cheatsheet
      </Typography>
      <Box
        sx={{
          borderBottom: '1px solid #444',
          marginBottom: 2,
          '& .MuiTabs-root': {
            backgroundColor: 'transparent',
          },
          '& .MuiTab-root': {
            color: '#aaa',
            textTransform: 'none',
            fontSize: '1rem',
            outline: 'none',
            '&:focus': {
              outline: 'none',
            },
            '&:hover': {
              color: 'white',
              backgroundColor: '#45456a47',
            },
            '&.Mui-selected': {
              color: 'white',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#7171ad',
          },
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="General" />
          <Tab label="Dungeons" />
          <Tab label="Raids" />
          <Tab label="Crafted" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: '#1a1a2e',
            marginTop: 2,
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Table sx={{ borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow
                sx={{
                  borderBottom: '3px solid #7171ad',
                }}
              >
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    padding: '16px 12px',
                    textTransform: '',
                    letterSpacing: '0.5px',
                  }}
                >
                  Crest type
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    padding: '16px 12px',
                    textTransform: '',
                    letterSpacing: '0.5px',
                  }}
                >
                  iLvl
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    padding: '16px 12px',
                    textTransform: '',
                    letterSpacing: '0.5px',
                  }}
                >
                  Upgrade Tracks
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    padding: '16px 12px',
                    textTransform: '',
                    letterSpacing: '0.5px',
                  }}
                >
                  Crests
                </TableCell>
                <TableCell
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    padding: '16px 12px',
                    textTransform: '',
                    letterSpacing: '0.5px',
                  }}
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upgradeTracks.map((item, itemIndex) => {
                const groupedTypes = [
                  'Adventurer',
                  'Veteran',
                  'Veteran/Champion',
                  'Champion/Hero',
                  'Hero/Myth',
                ];
                const shouldGroup = groupedTypes.includes(item.crestType);
                const isFirstOfType =
                  itemIndex === 0 ||
                  upgradeTracks[itemIndex - 1].crestType !== item.crestType;
                const countOfType = shouldGroup
                  ? upgradeTracks.filter((t) => t.crestType === item.crestType)
                      .length
                  : 1;

                const crestColors: Record<string, string> = {
                  Adventurer: '#36d468',
                  Veteran: '#36bbd6',
                  'Veteran/Champion': '#7f5aed',
                  'Champion/Hero': '#f4ac72',
                  'Hero/Myth': '#fbbf24',
                  Champion: '#c084fc',
                  Hero: '#fb923c',
                  Myth: '#ef4444',
                };

                const crestColor = crestColors[item.crestType] || '#aaa';

                return (
                  <TableRow
                    key={itemIndex}
                    sx={{
                      backgroundColor:
                        itemIndex % 2 === 0 ? '#1a1a2e' : '#0f1419',
                      borderBottom: '1px solid #2a2a3e',
                      '&:hover': {
                        backgroundColor: '#252540',
                      },
                    }}
                  >
                    {(shouldGroup && isFirstOfType) ||
                    (!shouldGroup && itemIndex === 0) ||
                    (!shouldGroup &&
                      upgradeTracks[itemIndex - 1].crestType !==
                        item.crestType) ? (
                      <TableCell
                        sx={{
                          color: crestColor,
                          fontWeight: 'bold',
                          fontSize: '0.95rem',
                          padding: '14px 12px',
                          verticalAlign: 'middle',
                        }}
                        rowSpan={countOfType}
                      >
                        {item.crestType}
                      </TableCell>
                    ) : !shouldGroup ? (
                      <TableCell
                        sx={{
                          color: crestColor,
                          fontWeight: 'bold',
                          fontSize: '0.95rem',
                          padding: '14px 12px',
                        }}
                      >
                        {item.crestType}
                      </TableCell>
                    ) : null}
                    <TableCell
                      sx={{
                        color: '#e0e7ff',
                        padding: '14px 12px',
                        fontWeight: '500',
                      }}
                    >
                      {item.ilvl}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: '#cbd5e1',
                        padding: '14px 12px',
                      }}
                    >
                      {item.track}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: '#cbd5e1',
                        padding: '14px 12px',
                      }}
                    >
                      {item.crestUsed}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: '#10b981',
                        fontWeight: 'bold',
                        padding: '14px 12px',
                        fontSize: '0.95rem',
                      }}
                    >
                      {item.amount}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue !== 0 && (
        <Typography variant="body1">Coming soon...</Typography>
      )}
    </Box>
  );
}
