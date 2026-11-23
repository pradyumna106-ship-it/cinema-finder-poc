import React from 'react';
import { Box, Typography, Button, Chip, Stack, Rating } from '@mui/material';
import { MdPhone, MdLocationOn, MdConfirmationNumber } from 'react-icons/md';

export const CinemaPopupContent = ({ cinema, onSelect }) => {
  if (!cinema) return null;

  return (
    <Box sx={{ p: 1, minWidth: 220, maxWidth: 300, color: '#111827' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, color: '#0f172a' }}>
        {cinema.name}
      </Typography>

      {cinema.franchise && cinema.franchise !== 'unknown' && (
        <Chip
          label={cinema.franchise.toUpperCase()}
          size="small"
          sx={{
            mb: 1,
            height: 20,
            fontSize: '0.68rem',
            fontWeight: 700,
            bgcolor: '#f59e0b',
            color: '#000',
          }}
        />
      )}

      {cinema.rating && (
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
          <Rating value={cinema.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#334155' }}>
            {cinema.rating} ({cinema.reviewCount || 50}+)
          </Typography>
        </Stack>
      )}

      {cinema.address && (
        <Stack direction="row" alignItems="flex-start" spacing={0.5} sx={{ mb: 0.5 }}>
          <MdLocationOn style={{ marginTop: 2, flexShrink: 0, color: '#e50914' }} />
          <Typography variant="caption" sx={{ color: '#475569', whiteSpace: 'pre-line' }}>
            {cinema.address.split('\n')[0]}
          </Typography>
        </Stack>
      )}

      {cinema.phoneNumber && (
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
          <MdPhone style={{ flexShrink: 0, color: '#0284c7' }} />
          <Typography
            component="a"
            href={`tel:${cinema.phoneNumber}`}
            variant="caption"
            sx={{ color: '#0284c7', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            {cinema.phoneNumber}
          </Typography>
        </Stack>
      )}

      {cinema.products && cinema.products.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mb: 1.5 }}>
          {cinema.products.slice(0, 3).map((prod) => (
            <Chip
              key={prod}
              label={prod}
              size="small"
              sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#f1f5f9', color: '#334155' }}
            />
          ))}
          {cinema.products.length > 3 && (
            <Chip
              label={`+${cinema.products.length - 3}`}
              size="small"
              sx={{ height: 18, fontSize: '0.65rem', bgcolor: '#e2e8f0' }}
            />
          )}
        </Stack>
      )}

      <Button
        variant="contained"
        fullWidth
        size="small"
        startIcon={<MdConfirmationNumber />}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect(cinema);
        }}
        sx={{
          bgcolor: '#e50914',
          color: '#ffffff',
          fontWeight: 700,
          textTransform: 'none',
          '&:hover': { bgcolor: '#b91c1c' },
        }}
      >
        View Showtimes & Book
      </Button>
    </Box>
  );
};
export default CinemaPopupContent;
