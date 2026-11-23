import React from 'react';
import { IconButton, Typography, Stack, Box, Chip } from '@mui/material';
import { GiAustralia, GiFern } from 'react-icons/gi';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link as RouterLink, useParams } from 'react-router-dom';
import franchises from '../../data/franchises';
import { useCinemaContext } from '../../context/CinemaContext';

const FranchiseHeader = ({ cinemas = [] }) => {
  const { franchiseId, countryCode } = useParams();
  const franchise = franchises[franchiseId];
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
          title="Back to All Franchises"
        >
          <MdOutlineArrowBack />
        </IconButton>

        {franchise?.logoUrl ? (
          <Box sx={{ height: 38, display: 'flex', alignItems: 'center' }}>
            <img
              src={franchise.logoUrl}
              alt={`${franchise.identifier} logo`}
              style={{ maxHeight: '100%', maxWidth: 140, objectFit: 'contain' }}
            />
          </Box>
        ) : (
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#ffffff', textAlign: 'center' }}>
            {franchiseId === 'all-cinemas'
              ? countryCode === 'au'
                ? 'All Australia Cinemas'
                : 'All New Zealand Cinemas'
              : franchise?.name || franchise?.identifier || franchise?.id}
          </Typography>
        )}

        <Stack direction="row" spacing={0.5} alignItems="center">
          <Chip
            icon={
              countryCode === 'au' ? (
                <GiAustralia style={{ color: '#10b981' }} />
              ) : (
                <GiFern style={{ color: '#10b981' }} />
              )
            }
            label={countryCode?.toUpperCase()}
            size="small"
            sx={{
              bgcolor: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              fontWeight: 700,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default FranchiseHeader;
