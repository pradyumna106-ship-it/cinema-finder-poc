import React from 'react';
import {
  List,
  Typography,
  Grid,
  Chip,
  Card,
  CardActions,
  ListItem,
  ListItemText,
  Stack,
  Button,
  ListItemIcon,
  Box,
} from '@mui/material';
import { GiAustralia, GiFern } from 'react-icons/gi';
import { MdLocationSearching, MdOutlineLocationOn, MdSettings, MdMovie } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';
import { breakdown } from '../data/cinemas';
import franchises from '../data/franchises';
import { useCinemaContext } from '../context/CinemaContext';
import CinemaDetailView from './CinemaList/CinemaDetailView';

const FranchiseCard = ({ id, identifier, name, logoUrl, breakdown, ...props }) => (
  <Grid item xs={6}>
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 2,
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: '#f59e0b',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        },
      }}
      variant="outlined"
    >
      <Box sx={{ p: 1.5, height: 75, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {logoUrl !== undefined ? (
          <img
            src={logoUrl}
            alt={identifier || name}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        ) : (
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
            {name || identifier || id}
          </Typography>
        )}
      </Box>
      <CardActions sx={{ bgcolor: '#131b2e', p: 1 }}>
        <Stack direction="row" justifyContent="space-around" spacing={1} sx={{ width: '100%' }}>
          {Object.entries(breakdown).map(([countryCode, count]) => (
            <Button
              size="small"
              sx={{
                borderRadius: 2,
                px: 1,
                py: 0.2,
                fontSize: '0.75rem',
                fontWeight: 700,
                color: countryCode === 'au' ? '#10b981' : '#38bdf8',
                bgcolor: '#1e293b',
                border: '1px solid #334155',
                '&:hover': {
                  bgcolor: '#f59e0b',
                  color: '#000',
                  borderColor: '#f59e0b',
                },
              }}
              startIcon={countryCode === 'au' ? <GiAustralia /> : <GiFern />}
              component={RouterLink}
              to={`/${id}/${countryCode}`}
              key={countryCode}
            >
              {count}
            </Button>
          ))}
        </Stack>
      </CardActions>
    </Card>
  </Grid>
);

const AsideIndex = () => {
  const { selectedCinema, closeCinemaDetails } = useCinemaContext();

  if (selectedCinema) {
    return <CinemaDetailView cinema={selectedCinema} onBack={closeCinemaDetails} />;
  }

  return (
    <Box sx={{ maxHeight: 'calc(100vh - 112px)', overflowY: 'auto', p: 2, color: '#f8fafc' }}>
      {/* App Welcome Hero Banner */}
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid #334155',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <MdMovie style={{ color: '#f59e0b', fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff' }}>
            Cinema Finder
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.5 }}>
          Browse cinemas, filter by products & ticket prices, check film showtimes, and book tickets across Australia & New Zealand.
        </Typography>
      </Box>

      {/* Countries Section */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#f59e0b', letterSpacing: 1, mb: 1 }}>
        COUNTRIES
      </Typography>
      <List disablePadding sx={{ mb: 2.5 }}>
        <ListItem
          button
          component={RouterLink}
          to="/all-cinemas/au"
          sx={{
            mb: 1,
            bgcolor: '#1e293b',
            borderRadius: 2,
            border: '1px solid #334155',
            '&:hover': { bgcolor: '#27354f', borderColor: '#10b981' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <GiAustralia style={{ color: '#10b981', fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, color: '#ffffff' }}>Australia</Typography>}
            secondary={<Typography variant="caption" sx={{ color: '#94a3b8' }}>Explore cinemas across AU</Typography>}
          />
          <Chip
            label={`${breakdown.au} Cinemas`}
            size="small"
            sx={{ bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}
          />
        </ListItem>

        <ListItem
          button
          component={RouterLink}
          to="/all-cinemas/nz"
          sx={{
            bgcolor: '#1e293b',
            borderRadius: 2,
            border: '1px solid #334155',
            '&:hover': { bgcolor: '#27354f', borderColor: '#38bdf8' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <GiFern style={{ color: '#38bdf8', fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, color: '#ffffff' }}>New Zealand</Typography>}
            secondary={<Typography variant="caption" sx={{ color: '#94a3b8' }}>Explore cinemas across NZ</Typography>}
          />
          <Chip
            label={`${breakdown.nz} Cinemas`}
            size="small"
            sx={{ bgcolor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontWeight: 700 }}
          />
        </ListItem>
      </List>

      {/* Franchises Section */}
      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#f59e0b', letterSpacing: 1, mb: 1 }}>
        CINEMA FRANCHISES
      </Typography>
      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        {Object.values(franchises).map(
          (franchise) =>
            franchise.id !== 'unknown' && <FranchiseCard key={franchise.id} {...franchise} />
        )}
      </Grid>

      {/* Nearby Cinemas Quick Link */}
      <List disablePadding sx={{ mb: 2.5 }}>
        <ListItem
          button
          component={RouterLink}
          to="/nearby"
          sx={{
            bgcolor: '#1e293b',
            borderRadius: 2,
            border: '1px solid #334155',
            '&:hover': { bgcolor: '#27354f', borderColor: '#f59e0b' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <MdLocationSearching style={{ color: '#f59e0b', fontSize: 22 }} />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 700, color: '#ffffff' }}>Nearby Cinemas</Typography>}
            secondary={<Typography variant="caption" sx={{ color: '#94a3b8' }}>Find nearest cinemas to your location</Typography>}
          />
          <Chip
            label="Live GPS"
            size="small"
            sx={{ bgcolor: '#f59e0b', color: '#000', fontWeight: 700, fontSize: '0.68rem' }}
          />
        </ListItem>
      </List>

      {/* Tips / Help Card */}
      <Box sx={{ p: 1.5, bgcolor: '#131b2e', borderRadius: 2, border: '1px solid #1e293b' }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
          PRO TIPS
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1.5 }}>
          • Click any cinema marker on the map to snap to it and view showing details & ticket booking.
          <br />
          • Click <MdOutlineLocationOn style={{ verticalAlign: 'middle', color: '#f59e0b' }} /> next to any cinema in the list to fly directly to it.
          <br />
          • Switch between MapLibre and Leaflet using <MdSettings style={{ verticalAlign: 'middle', color: '#94a3b8' }} /> in the top right.
        </Typography>
      </Box>
    </Box>
  );
};

export default AsideIndex;
