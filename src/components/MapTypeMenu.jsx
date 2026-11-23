import React, { useRef, useState } from 'react';
import {
  IconButton,
  Popover,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from '@mui/material';
import { MdSettings, MdLayers } from 'react-icons/md';
import { startCase } from 'lodash';
import { mapTypes, useMapType } from './Map';

const MapTypeMenu = () => {
  const [open, setOpen] = useState(false);
  const settingsButtonRef = useRef(null);
  const [mapType, setMapType] = useMapType();

  return (
    <>
      <IconButton
        ref={settingsButtonRef}
        sx={{
          ml: 'auto',
          color: open ? '#f59e0b' : '#ffffff',
          transition: 'all 0.2s',
          '&:hover': { color: '#f59e0b', bgcolor: 'rgba(245, 158, 11, 0.15)' },
        }}
        onClick={() => setOpen(true)}
        title="Map Settings"
      >
        <MdSettings size={22} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={settingsButtonRef?.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 2,
            bgcolor: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #334155',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            borderRadius: 2,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <MdLayers style={{ color: '#f59e0b' }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b' }}>
            Map Engine
          </Typography>
        </Box>
        <FormControl component="fieldset">
          <FormLabel sx={{ color: '#94a3b8', fontSize: '0.8rem', mb: 0.5 }}>
            Select active map library:
          </FormLabel>
          <RadioGroup
            value={mapType}
            onChange={(evt) => {
              setMapType(evt.target.value);
              // BUG FIX: Close popover immediately upon selection to prevent hanging dark backdrop
              setOpen(false);
            }}
          >
            {mapTypes.map((type) => (
              <FormControlLabel
                key={type}
                value={type}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: '#64748b',
                      '&.Mui-checked': { color: '#f59e0b' },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {startCase(type)}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Popover>
    </>
  );
};

export default MapTypeMenu;
