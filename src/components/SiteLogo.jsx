import React from 'react';
import { Box } from '@mui/material';
import { GiFilmProjector } from 'react-icons/gi';

const SiteLogo = (props) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        mr: 1.5,
        color: '#f59e0b',
        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))',
      }}
      {...props}
    >
      <GiFilmProjector size={34} />
    </Box>
  );
};

export default SiteLogo;
