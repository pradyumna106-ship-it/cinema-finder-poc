import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import Layout from './components/Layout';
import Map from './components/Map';
import AsideIndex from './components/AsideIndex';
import {
  FranchiseCinemasList,
  NearbyCinemasList,
} from './components/CinemaList';
import { Switch, Route } from 'react-router-dom';
import Provider from './components/Provider';
import loadable from '@loadable/component';
import BookingModal from './components/Booking/BookingModal';

const NotFound = () => (
  <Box sx={{ p: 3, textAlign: 'center' }}>
    <Typography variant="h6" sx={{ color: '#f59e0b', fontWeight: 700 }}>
      404, Page Not Found!
    </Typography>
    <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
      The requested cinema or page could not be located.
    </Typography>
  </Box>
);

const CinemaMarkers = loadable(() => import('./components/CinemaMarkers'));
const NearbyCinemaMarkers = loadable(() =>
  import('./components/NearbyCinemaMarkers')
);

const App = () => (
  <Provider>
    <Layout>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          height: { xs: 500, md: '100%' },
          minHeight: 450,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: '100%',
            width: '100%',
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #1e293b',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            bgcolor: '#0f172a',
          }}
        >
          <Map>
            <Switch>
              <Route exact path="/">
                <CinemaMarkers />
              </Route>
              <Route path="/nearby" component={NearbyCinemaMarkers} />
              <Route
                path="/:franchiseId/:countryCode"
                component={CinemaMarkers}
              />
            </Switch>
          </Map>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          height: { xs: 'auto', md: '100%' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper
          sx={{
            flex: 1,
            height: '100%',
            bgcolor: '#0b0f19',
            border: '1px solid #1e293b',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Switch>
            <Route exact path="/" component={AsideIndex} />
            <Route path="/nearby" component={NearbyCinemasList} />
            <Route
              path="/:franchiseId/:countryCode"
              component={FranchiseCinemasList}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Paper>
      </Grid>
    </Layout>
    <BookingModal />
  </Provider>
);

export default App;
