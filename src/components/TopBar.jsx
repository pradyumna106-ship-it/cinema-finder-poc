import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MdNearMe } from 'react-icons/md';
import { GiAustralia, GiFern } from 'react-icons/gi';
import SiteLogo from './SiteLogo';
import MapTypeMenu from './MapTypeMenu';
import { useCinemaContext } from '../context/CinemaContext';

const TopBar = () => {
  const { closeCinemaDetails, userLocation } = useCinemaContext();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: '#070a12',
        borderBottom: '1px solid #1e293b',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Box
            component={RouterLink}
            to="/"
            onClick={closeCinemaDetails}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              mr: 3,
            }}
          >
            <SiteLogo />
            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: '"Montserrat", "Roboto", sans-serif',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}
              >
                CINEMA FINDER
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748b',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Australia & New Zealand
              </Typography>
            </Box>
          </Box>

          {/* Quick Navigation Links */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 'auto' }}
          >
            <Button
              component={RouterLink}
              to="/all-cinemas/au"
              onClick={closeCinemaDetails}
              size="small"
              startIcon={<GiAustralia style={{ color: '#10b981' }} />}
              sx={{
                color: '#cbd5e1',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                borderRadius: 2,
                px: 1.2,
                '&:hover': { color: '#ffffff', bgcolor: '#1e293b' },
              }}
            >
              Australia
            </Button>
            <Button
              component={RouterLink}
              to="/all-cinemas/nz"
              onClick={closeCinemaDetails}
              size="small"
              startIcon={<GiFern style={{ color: '#38bdf8' }} />}
              sx={{
                color: '#cbd5e1',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                borderRadius: 2,
                px: 1.2,
                '&:hover': { color: '#ffffff', bgcolor: '#1e293b' },
              }}
            >
              New Zealand
            </Button>
            <Button
              component={RouterLink}
              to="/nearby"
              onClick={closeCinemaDetails}
              size="small"
              startIcon={<MdNearMe style={{ color: '#f59e0b' }} />}
              sx={{
                color: '#cbd5e1',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                borderRadius: 2,
                px: 1.2,
                '&:hover': { color: '#ffffff', bgcolor: '#1e293b' },
              }}
            >
              Nearby
              {userLocation && (
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#10b981',
                    ml: 0.8,
                    boxShadow: '0 0 6px #10b981',
                  }}
                />
              )}
            </Button>
          </Stack>

          {/* Right Map Settings Menu */}
          <MapTypeMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
