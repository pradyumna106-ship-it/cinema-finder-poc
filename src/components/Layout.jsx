import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import TopBar from './TopBar';

const Layout = ({ children }) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#070a12' }}>
    <TopBar />
    <Container
      maxWidth="xl"
      sx={{
        mt: 2,
        pb: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          flex: 1,
          height: { xs: 'auto', md: 'calc(100vh - 100px)' },
          minHeight: 500,
        }}
      >
        {children}
      </Grid>
    </Container>
  </Box>
);

export default Layout;
