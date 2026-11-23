import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Slider,
  TextField,
  Stack,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  MdFilterList,
  MdClose,
  MdSearch,
  MdExpandMore,
  MdExpandLess,
  MdAttachMoney,
  MdLocalOffer,
  MdStars,
  MdNearMe,
} from 'react-icons/md';
import { useCinemaContext } from '../../context/CinemaContext';
import { ALL_PRODUCTS } from '../../data/cinemaDetails';

const CinemaFilterPanel = ({ totalResults = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const { filters, updateFilters, resetFilters, userLocation } = useCinemaContext();

  const handleProductToggle = (prod) => {
    const current = filters.selectedProducts || [];
    const exists = current.includes(prod);
    const updated = exists ? current.filter((p) => p !== prod) : [...current, prod];
    updateFilters({ selectedProducts: updated });
  };

  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.selectedProducts?.length > 0 ||
    filters.minRating > 0 ||
    (filters.maxPrice && filters.maxPrice < 40) ||
    Boolean(filters.maxDistance);

  return (
    <Box sx={{ p: 1.5, bgcolor: '#131b2e', borderBottom: '1px solid #1e293b' }}>
      {/* Search Input Bar */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search cinema by name, city or suburb..."
        value={filters.search}
        onChange={(e) => updateFilters({ search: e.target.value })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdSearch style={{ color: '#94a3b8' }} />
            </InputAdornment>
          ),
          endAdornment: filters.search ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => updateFilters({ search: '' })}>
                <MdClose size={16} />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: {
            fontSize: '0.85rem',
            bgcolor: '#1e293b',
            color: '#f8fafc',
            borderRadius: 2,
            '& fieldset': { borderColor: '#334155' },
            '&:hover fieldset': { borderColor: '#f59e0b' },
          },
        }}
      />

      {/* Filter Toggle Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Button
          size="small"
          startIcon={<MdFilterList style={{ color: '#f59e0b' }} />}
          endIcon={expanded ? <MdExpandLess /> : <MdExpandMore />}
          onClick={() => setExpanded(!expanded)}
          sx={{
            color: '#f59e0b',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.82rem',
            p: 0,
            '&:hover': { bgcolor: 'transparent', color: '#fbbf24' },
          }}
        >
          {expanded ? 'Hide Filters' : 'Filter by Products, Price, Rating, Distance'}
          {hasActiveFilters && (
            <Chip
              label="Active"
              size="small"
              sx={{
                ml: 1,
                height: 18,
                fontSize: '0.65rem',
                bgcolor: '#f59e0b',
                color: '#000',
                fontWeight: 700,
              }}
            />
          )}
        </Button>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            {totalResults} {totalResults === 1 ? 'cinema' : 'cinemas'}
          </Typography>
          {hasActiveFilters && (
            <Button
              size="small"
              onClick={resetFilters}
              sx={{
                p: 0,
                minWidth: 'auto',
                color: '#ef4444',
                fontSize: '0.75rem',
                textTransform: 'none',
                textDecoration: 'underline',
              }}
            >
              Reset
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Expandable Filter Body */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px dashed #334155' }}>
          {/* 1. Products Available to Purchase */}
          <Box sx={{ mb: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.8 }}>
              <MdLocalOffer style={{ color: '#f59e0b', fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#e2e8f0', letterSpacing: 0.5 }}>
                PRODUCTS & EXPERIENCES
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
              {ALL_PRODUCTS.map((prod) => {
                const isSelected = filters.selectedProducts?.includes(prod);
                return (
                  <Chip
                    key={prod}
                    label={prod}
                    size="small"
                    onClick={() => handleProductToggle(prod)}
                    sx={{
                      fontSize: '0.72rem',
                      height: 24,
                      cursor: 'pointer',
                      bgcolor: isSelected ? '#f59e0b' : '#1e293b',
                      color: isSelected ? '#000' : '#cbd5e1',
                      border: '1px solid',
                      borderColor: isSelected ? '#f59e0b' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      '&:hover': {
                        bgcolor: isSelected ? '#fbbf24' : '#2d3748',
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          {/* 2. Ticket Prices Filter */}
          <Box sx={{ mb: 1.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <MdAttachMoney style={{ color: '#10b981', fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#e2e8f0' }}>
                  MAX TICKET PRICE
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>
                {filters.maxPrice >= 35 ? 'Any Price' : `Up to $${filters.maxPrice}`}
              </Typography>
            </Stack>
            <Slider
              size="small"
              value={filters.maxPrice || 35}
              min={14}
              max={35}
              step={1}
              onChange={(_, val) => updateFilters({ maxPrice: val })}
              sx={{
                color: '#10b981',
                '& .MuiSlider-thumb': { bgcolor: '#10b981' },
                '& .MuiSlider-rail': { bgcolor: '#334155' },
              }}
            />
          </Box>

          {/* 3. Cinema Rating Scores */}
          <Box sx={{ mb: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.8 }}>
              <MdStars style={{ color: '#fbbf24', fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#e2e8f0' }}>
                MINIMUM RATING SCORE
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              {[0, 3.5, 4.0, 4.5].map((score) => (
                <Chip
                  key={score}
                  label={score === 0 ? 'All' : `${score}+ ★`}
                  size="small"
                  onClick={() => updateFilters({ minRating: score })}
                  sx={{
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    bgcolor: filters.minRating === score ? '#fbbf24' : '#1e293b',
                    color: filters.minRating === score ? '#000' : '#cbd5e1',
                    border: '1px solid',
                    borderColor: filters.minRating === score ? '#fbbf24' : '#334155',
                    fontWeight: filters.minRating === score ? 700 : 500,
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* 4. Distance From Location */}
          <Box sx={{ mb: 0.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.8 }}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <MdNearMe style={{ color: '#38bdf8', fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#e2e8f0' }}>
                  DISTANCE FROM LOCATION
                </Typography>
              </Stack>
              {!userLocation && (
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem' }}>
                  (Enable GPS to calibrate)
                </Typography>
              )}
            </Stack>
            <Stack direction="row" spacing={0.8} flexWrap="wrap">
              {[
                { label: 'Any', value: null },
                { label: '< 10 km', value: 10 },
                { label: '< 25 km', value: 25 },
                { label: '< 50 km', value: 50 },
                { label: '< 100 km', value: 100 },
              ].map((dist) => (
                <Chip
                  key={dist.label}
                  label={dist.label}
                  size="small"
                  onClick={() => updateFilters({ maxDistance: dist.value })}
                  sx={{
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    bgcolor: filters.maxDistance === dist.value ? '#38bdf8' : '#1e293b',
                    color: filters.maxDistance === dist.value ? '#000' : '#cbd5e1',
                    border: '1px solid',
                    borderColor: filters.maxDistance === dist.value ? '#38bdf8' : '#334155',
                    fontWeight: filters.maxDistance === dist.value ? 700 : 500,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CinemaFilterPanel;
