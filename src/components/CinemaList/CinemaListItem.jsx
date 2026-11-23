import React from 'react';
import {
  ListItem,
  IconButton,
  Chip,
  Box,
  Typography,
  Stack,
  Rating,
  Button,
} from '@mui/material';
import { MdCall, MdOutlineLocationOn, MdMovie, MdNearMe } from 'react-icons/md';
import { useCinemaContext } from '../../context/CinemaContext';
import { saveLastLocation } from '../../utils/lastLocation';

const dispatchMapSnapTo = (lat, lng) => {
  console.log('triggering `map.snapTo` event with args: ', `lat: ${lat}, lng: ${lng}`);
  saveLastLocation({ lat, lng, zoom: 14 });
  window.dispatchEvent(new CustomEvent('map.snapTo', { detail: { lat, lng } }));
};

const CinemaListItem = (cinema) => {
  const { name, lat, lng, phoneNumber, rating, reviewCount, ticketPrice, products } = cinema;
  const { openCinemaDetails, getCinemaDistance } = useCinemaContext();

  const distance = getCinemaDistance(cinema);

  return (
    <ListItem
      sx={{
        mb: 1,
        borderRadius: 2,
        bgcolor: '#1e293b',
        border: '1px solid #334155',
        flexDirection: 'column',
        alignItems: 'stretch',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: '#27354f',
          borderColor: '#f59e0b',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
        <Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => openCinemaDetails(cinema)}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: '#ffffff',
              fontSize: '0.92rem',
              '&:hover': { color: '#f59e0b' },
            }}
          >
            {name}
          </Typography>

          {/* Rating and Distance */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            {rating && (
              <Stack direction="row" alignItems="center" spacing={0.3}>
                <Rating value={rating} precision={0.1} size="small" readOnly sx={{ fontSize: 14 }} />
                <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 700 }}>
                  {rating}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  ({reviewCount || 40})
                </Typography>
              </Stack>
            )}

            {distance !== null && (
              <Chip
                icon={<MdNearMe style={{ color: '#38bdf8', fontSize: 12 }} />}
                size="small"
                label={`${distance.toFixed(1)} km`}
                sx={{
                  height: 18,
                  fontSize: '0.65rem',
                  bgcolor: 'rgba(56, 189, 248, 0.1)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={0.5} alignItems="center">
          {phoneNumber && (
            <IconButton
              component="a"
              href={`tel:${phoneNumber}`}
              size="small"
              sx={{ color: '#38bdf8', '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.15)' } }}
              title={`Call ${phoneNumber}`}
            >
              <MdCall size={18} />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              dispatchMapSnapTo(lat, lng);
            }}
            sx={{ color: '#f59e0b', '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.15)' } }}
            title="Snap map to this cinema"
          >
            <MdOutlineLocationOn size={20} />
          </IconButton>
        </Stack>
      </Box>

      {/* Badges & Showtimes button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, pt: 1, borderTop: '1px dashed #334155' }}>
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {ticketPrice && (
            <Chip
              label={`From $${ticketPrice.toFixed(2)}`}
              size="small"
              sx={{ height: 20, fontSize: '0.68rem', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}
            />
          )}
          {products?.slice(0, 2).map((p) => (
            <Chip
              key={p}
              label={p}
              size="small"
              sx={{ height: 20, fontSize: '0.68rem', bgcolor: '#334155', color: '#cbd5e1' }}
            />
          ))}
        </Stack>

        <Button
          size="small"
          onClick={() => openCinemaDetails(cinema)}
          startIcon={<MdMovie style={{ fontSize: 14 }} />}
          sx={{
            color: '#f59e0b',
            textTransform: 'none',
            fontSize: '0.75rem',
            fontWeight: 700,
            p: 0.5,
            minWidth: 'auto',
            '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.15)' },
          }}
        >
          Details & Showtimes
        </Button>
      </Box>
    </ListItem>
  );
};

export default CinemaListItem;
