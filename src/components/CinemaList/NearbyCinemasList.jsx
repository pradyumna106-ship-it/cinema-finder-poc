import React from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import useNearbyCinemas from '../../data/nearbyCinemas';
import BaseCinemaList from './BaseCinemaList';
import NearbyHeader from './NearbyHeader';

const NearbyCinemasList = () => {
  const {
    isGeolocationAvailable,
    isGeolocationEnabled,
    cinemas,
  } = useNearbyCinemas();

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <BaseCinemaList cinemas={cinemas} Header={NearbyHeader} />

      {isGeolocationAvailable && isGeolocationEnabled && cinemas.length === 0 && (
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <CircularProgress sx={{ color: '#f59e0b' }} />
        </Box>
      )}

      {!isGeolocationAvailable && (
        <Alert
          severity="warning"
          sx={{ m: 1, bgcolor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}
        >
          Your browser does not support Geolocation.
        </Alert>
      )}

      {!isGeolocationEnabled && (
        <Alert
          severity="info"
          sx={{ m: 1, bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}
        >
          Geolocation was denied or is loading. Showing standard cinemas.
        </Alert>
      )}
    </Box>
  );
};

export default NearbyCinemasList;
