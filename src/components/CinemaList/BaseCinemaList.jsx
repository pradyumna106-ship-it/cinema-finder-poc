import React, { useMemo } from 'react';
import { Box, List, Typography, Button } from '@mui/material';
import { MdLocalMovies } from 'react-icons/md';
import CinemaListItem from './CinemaListItem';
import CinemaFilterPanel from './CinemaFilterPanel';
import CinemaDetailView from './CinemaDetailView';
import { useCinemaContext } from '../../context/CinemaContext';

const BaseCinemaList = ({ cinemas = [], Header = null }) => {
  const { selectedCinema, closeCinemaDetails, filters, resetFilters, getCinemaDistance } =
    useCinemaContext();

  // Apply rich filters: Products, Price, Rating, Distance, Search text
  const filteredCinemas = useMemo(() => {
    return cinemas.filter((cinema) => {
      // 1. Search text filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesName = cinema.name?.toLowerCase().includes(q);
        const matchesAddress = cinema.address?.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress) return false;
      }

      // 2. Minimum Rating score
      if (filters.minRating > 0 && (cinema.rating || 0) < filters.minRating) {
        return false;
      }

      // 3. Maximum Ticket Price
      if (filters.maxPrice && filters.maxPrice < 40 && (cinema.ticketPrice || 0) > filters.maxPrice) {
        return false;
      }

      // 4. Products / Amenities
      if (filters.selectedProducts && filters.selectedProducts.length > 0) {
        const hasAllProducts = filters.selectedProducts.every(
          (p) => cinema.products && cinema.products.includes(p)
        );
        if (!hasAllProducts) return false;
      }

      // 5. Distance from location
      if (filters.maxDistance) {
        const dist = getCinemaDistance(cinema);
        if (dist === null || dist > filters.maxDistance) return false;
      }

      return true;
    });
  }, [cinemas, filters, getCinemaDistance]);

  // If user selected a cinema, show detailed view with film showings, images, and reviews
  if (selectedCinema) {
    return <CinemaDetailView cinema={selectedCinema} onBack={closeCinemaDetails} />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 112px)',
        bgcolor: '#0b0f19',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* BUG FIX 2: Fixed Header container at top with opaque background prevents content overlap */}
      <Box
        sx={{
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: '#131b2e',
          borderBottom: '1px solid #1e293b',
        }}
      >
        {Header && <Header cinemas={filteredCinemas} />}
        {/* NEW FEATURE 1: Rich filter panel for products, prices, rating, distance */}
        <CinemaFilterPanel totalResults={filteredCinemas.length} />
      </Box>

      {/* Scrollable Cinema List below header */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5 }}>
        {filteredCinemas.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
            <MdLocalMovies style={{ fontSize: 40, color: '#64748b', marginBottom: 8 }} />
            <Typography variant="subtitle1" sx={{ color: '#f8fafc', fontWeight: 700 }}>
              No cinemas match your filters
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5, mb: 2 }}>
              Try adjusting your products, ticket price, rating, or distance filters.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={resetFilters}
              sx={{ color: '#f59e0b', borderColor: '#f59e0b' }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <List disablePadding>
            {filteredCinemas.map((cinema, idx) => (
              <CinemaListItem {...cinema} key={cinema.id || idx} />
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default BaseCinemaList;
