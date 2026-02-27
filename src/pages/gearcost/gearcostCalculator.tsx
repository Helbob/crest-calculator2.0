import { JSX, useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { gearSlots } from '../../data/gearSlots';
import { upgradeTrack } from '../../data/upgradeTrack';

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: '#383838',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#666',
    },
    '&:hover fieldset': {
      borderColor: '#888',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7171ad',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#aaa',
    '&.Mui-focused': {
      color: '#7171ad',
    },
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiSelect-icon': {
    color: '#aaa',
  },
};

interface SelectedItem {
  slot: string;
  currentTrack: string;
  targetTrack: string;
}

export function GearcostCalculator(): JSX.Element {
  const [checkedSlots, setCheckedSlots] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleCheckboxChange = (slotValue: string) => {
    if (checkedSlots.includes(slotValue)) {
      setCheckedSlots(checkedSlots.filter((s) => s !== slotValue));
      setSelectedItems(selectedItems.filter((item) => item.slot !== slotValue));
    } else {
      setCheckedSlots([...checkedSlots, slotValue]);
      setSelectedItems([
        ...selectedItems,
        { slot: slotValue, currentTrack: '', targetTrack: '' },
      ]);
    }
  };

  const handleItemChange = (
    slotValue: string,
    field: 'currentTrack' | 'targetTrack',
    value: string
  ) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.slot === slotValue ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateCrestCost = (current: string, target: string) => {
    if (!current || !target) return 0;

    const currentLevel = parseInt(current.split(' ')[1].split('/')[0]);
    const targetLevel = parseInt(target.split(' ')[1].split('/')[0]);

    if (targetLevel <= currentLevel) return 0;

    const levelDiff = targetLevel - currentLevel;
    return levelDiff * 20;
  };

  const getCrestType = (track: string) => {
    if (!track) return '';
    return track.split(' ')[0];
  };

  const getValidTargetTracks = (currentTrack: string) => {
    if (!currentTrack) return upgradeTrack;

    const currentType = currentTrack.split(' ')[0]; // e.g., "Champion"
    const currentLevel = parseInt(currentTrack.split(' ')[1].split('/')[0]); // e.g., 2

    // Return only tracks with same type and higher level
    return upgradeTrack.filter((track) => {
      const trackType = track.split(' ')[0];
      const trackLevel = parseInt(track.split(' ')[1].split('/')[0]);
      return trackType === currentType && trackLevel > currentLevel;
    });
  };

  const mythicDungeonDrops: Record<number, { type: string; crests: number }> = {
    2: { type: 'Hero', crests: 10 },
    3: { type: 'Hero', crests: 12 },
    4: { type: 'Hero', crests: 14 },
    5: { type: 'Hero', crests: 16 },
    6: { type: 'Hero', crests: 18 },
    7: { type: 'Myth', crests: 10 },
    8: { type: 'Myth', crests: 12 },
    9: { type: 'Myth', crests: 14 },
    10: { type: 'Myth', crests: 16 },
  };

  const calculateDungeonRuns = (
    crestCost: number,
    crestType: string
  ): { runs: number; mythicLevel: number } => {
    if (crestCost === 0 || !crestType) return { runs: 0, mythicLevel: 0 };

    // Determine the best mythic level based on crest type
    let mythicLevel = 0;
    if (crestType === 'Hero') {
      mythicLevel = 6; // M+6 gives 18 Hero crests (best Hero bracket)
    } else if (crestType === 'Myth') {
      mythicLevel = 10; // M+10 gives 16 Myth crests (best Myth bracket)
    } else {
      return { runs: 0, mythicLevel: 0 };
    }

    const drop = mythicDungeonDrops[mythicLevel];
    if (!drop || drop.type !== crestType) {
      return { runs: 0, mythicLevel: 0 };
    }

    return { runs: Math.ceil(crestCost / drop.crests), mythicLevel };
  };

  return (
    <Box sx={{ padding: 2, width: '100%' }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', marginBottom: 2 }}>
        Gear Cost Calculator
      </Typography>
      <Typography variant="body2" sx={{ color: '#555', marginBottom: 3 }}>
        Select the gear items you want to upgrade and their current/target
        upgrade tracks.
      </Typography>

      {/* Checkboxes for gear slots */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" sx={{ color: '#fff', marginBottom: 1 }}>
          Gear Slots
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(auto-fit, minmax(150px, 1fr))',
            },
            gap: 2,
          }}
        >
          {gearSlots.map((slot: { value: string; label: string }) => (
            <FormControlLabel
              key={slot.value}
              control={
                <Checkbox
                  checked={checkedSlots.includes(slot.value)}
                  onChange={() => handleCheckboxChange(slot.value)}
                  sx={{
                    color: '#7171ad',
                    '&.Mui-checked': {
                      color: '#7171ad',
                    },
                  }}
                />
              }
              label={slot.label}
              sx={{
                color: '#cbd5e1',
                '& .MuiTypography-root': {
                  color: '#cbd5e1',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {selectedItems.length > 0 && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
            Upgrade Paths
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(auto-fill, minmax(350px, 350px))',
              },
              gap: 2,
            }}
          >
            {selectedItems.map((item) => {
              const crestCost = calculateCrestCost(
                item.currentTrack,
                item.targetTrack
              );
              const crestType = getCrestType(item.targetTrack);

              return (
                <Box key={item.slot}>
                  <Paper
                    sx={{
                      backgroundColor: '#2a2a3e',
                      padding: 2,
                      borderRadius: '8px',
                      border: '1px solid #444',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#7171ad',
                        fontWeight: 'bold',
                        marginBottom: 1,
                      }}
                    >
                      {gearSlots.find((s) => s.value === item.slot)?.label}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: '#aaa',
                        display: 'block',
                        marginBottom: 0.5,
                      }}
                    >
                      Current Track
                    </Typography>
                    <Select
                      value={item.currentTrack}
                      onChange={(e) =>
                        handleItemChange(
                          item.slot,
                          'currentTrack',
                          e.target.value as string
                        )
                      }
                      displayEmpty
                      size="small"
                      sx={{
                        ...inputStyles,
                        marginBottom: 2,
                        width: '100%',
                      }}
                    >
                      <MenuItem value="">Select track...</MenuItem>
                      {upgradeTrack.map((track) => (
                        <MenuItem key={track} value={track}>
                          {track}
                        </MenuItem>
                      ))}
                    </Select>

                    <Typography
                      variant="caption"
                      sx={{
                        color: '#aaa',
                        display: 'block',
                        marginBottom: 0.5,
                      }}
                    >
                      Target Track
                    </Typography>
                    <Select
                      value={item.targetTrack}
                      onChange={(e) =>
                        handleItemChange(
                          item.slot,
                          'targetTrack',
                          e.target.value as string
                        )
                      }
                      displayEmpty
                      size="small"
                      disabled={!item.currentTrack}
                      sx={{
                        ...inputStyles,
                        marginBottom: 2,
                        width: '100%',
                      }}
                    >
                      <MenuItem value="">
                        {!item.currentTrack
                          ? 'Select current track first'
                          : 'Select track...'}
                      </MenuItem>
                      {getValidTargetTracks(item.currentTrack).map((track) => (
                        <MenuItem key={track} value={track}>
                          {track}
                        </MenuItem>
                      ))}
                    </Select>

                    {crestCost > 0 && (
                      <Box
                        sx={{
                          backgroundColor: '#1a1a2e',
                          padding: 1.5,
                          borderRadius: '6px',
                          border: '1px solid #7171ad',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#aaa',
                            display: 'block',
                          }}
                        >
                          Crest Cost
                        </Typography>
                        <Typography
                          sx={{
                            color: '#10b981',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            marginBottom: 1.5,
                          }}
                        >
                          {crestCost} {crestType}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: '#aaa',
                            display: 'block',
                          }}
                        >
                          Mythic+ Runs Needed
                        </Typography>
                        <Typography
                          sx={{
                            color: '#60a5fa',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                          }}
                        >
                          {calculateDungeonRuns(crestCost, crestType).runs}x +
                          {
                            calculateDungeonRuns(crestCost, crestType)
                              .mythicLevel
                          }{' '}
                          runs
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
