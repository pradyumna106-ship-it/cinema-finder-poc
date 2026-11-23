import React from 'react';
import { IconButton, Typography, Stack, Chip, Box } from '@mui/material';
import { MdOutlineArrowBack, MdLocationSearching } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { useCinemaContext } from '../../context/CinemaContext';

const NearbyHeader = ({ cinemas = [] }) => {
  const { closeCinemaDetails } = useCinemaContext();

  return (
    <Box
      sx={{
        bgcolor: '#131b2e',
        color: '#f8fafc',
        p: 1.5,
        borderBottom: '1px solid #1e293b',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton
          component={RouterLink}
          to="/"
          onClick={closeCinemaDetails}
          sx={{
            color: '#f59e0b',
            bgcolor: '#1e293b',
            border: '1px solid #334155',
            '&:hover': { bgcolor: '#334155' },
          }}
          title="Back"
        >
          <MdOutlineArrowBack />
        </IconButton>

        <Stack direction="row" alignItems="center" spacing={1}>
          <MdLocationSearching style={{ color: '#38bdf8', fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#ffffff' }}>
            Nearby Cinemas
          </Typography>
        </Stack>

        {cinemas.length > 0 && (
          <Chip
            label={`${cinemas.length} Found`}
            size="small"
            sx={{
              bgcolor: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #334155',
              fontWeight: 700,
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default NearbyHeader;
