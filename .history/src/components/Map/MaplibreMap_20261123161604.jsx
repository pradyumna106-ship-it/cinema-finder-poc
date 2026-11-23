import React, { useEffect } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import Map, {
  Marker,
  Popup,
  useMap
} from 'react-map-gl/maplibre';

import maplibregl from 'maplibre-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import useEventListener from '@use-it/event-listener';
import { useSnackbar } from 'notistack';
import { Box, IconButton } from '@mui/material';
import { MdMyLocation } from 'react-icons/md';
import { MapContextProvider } from './context';
import { totalBounds, maxRegionBounds, isWithinBounds } from '../../data/bounds';
import CinemaPopupContent from './CinemaPopupContent';
import { useCinemaContext } from '../../context/CinemaContext';
import maplibreglWorker from 'maplibre-gl/dist/maplibre-gl-csp-worker';

maplibregl.workerClass = maplibreglWorker;

const convertBounds = ([w, s, e, n]) => [
  [w, s],
  [e, n],
];

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const mapRef = useMap();

  useEventListener('map.snapTo', (event) => {
    try {
      const { lat, lng } = event.detail || {};
      const map = mapRef.current;

      if (!map) {
        console.error('Map instance is not available');
        return;
      }

      if (
        typeof lat !== 'number' ||
        typeof lng !== 'number' ||
        !Number.isFinite(lat) ||
        !Number.isFinite(lng)
      ) {
        console.error('Invalid map coordinates:', { lat, lng });
        return;
      }

      map.flyTo({
        center: [lng, lat],
        zoom: 14,
        duration: 1000,
      });

    } catch (error) {
      console.error('Map navigation error:', error);

      enqueueSnackbar(
        'Unexpected error while attempting map navigation',
        { variant: 'error' }
      );
    }
  });

  return null;
};

const MaplibreMarker = ({ cinema, lat, lon, onClick }) => {
  const { setActivePopupCinema } = useCinemaContext();

  const latitude = lat ?? cinema?.lat;
  const longitude = lon ?? cinema?.lng;

  if (latitude === undefined || longitude === undefined) return null;

  const handleClick = (e) => {
    if (e?.originalEvent) e.originalEvent.stopPropagation();
    window.dispatchEvent(
      new CustomEvent('map.snapTo', { detail: { lat: latitude, lng: longitude } })
    );
    if (cinema) {
      setActivePopupCinema(cinema);
    }
    if (onClick) onClick();
  };

  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      onClick={handleClick}
    />
  );
};

const UserLocationMarker = () => {
  const { userLocation } = useCinemaContext();
  if (
    userLocation?.lat == null ||
    userLocation?.lng == null
  ) {
    return null;
  }

  return (
    <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="center">
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: '#0284c7',
          border: '3px solid #ffffff',
          boxShadow: '0 0 12px #38bdf8',
        }}
        title="You are here"
      />
    </Marker>
  );
};

const MapLocationControl = () => {
  const mapRef = useMap();
  const { userLocation } = useCinemaContext();

  if (!userLocation?.lat || !userLocation?.lng) return null;

  return (
    <Box sx={{ position: 'absolute', bottom: 24, right: 16, zIndex: 10 }}>
      <IconButton
        onClick={() => {
          const map = mapRef.current;
          if (map) {
            map.flyTo({
              center: [userLocation.lng, userLocation.lat],
              zoom: 13,
              duration: 800,
            });
          }
        }}
        sx={{
          bgcolor: '#1e293b',
          color: '#38bdf8',
          border: '1px solid #334155',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          '&:hover': { bgcolor: '#0f172a', color: '#0284c7' },
        }}
        title="Snap to My Location"
      >
        <MdMyLocation size={22} />
      </IconButton>
    </Box>
  );
};

const MapResizer = () => {
    const map = useMap();
    useEffect(() => {
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(map.getContainer());
      return () => ro.disconnect();
    }, [map]);
    return null;
  };

const MaplibreMap = ({ children }) => {
  const { activePopupCinema, setActivePopupCinema, openCinemaDetails } =
    useCinemaContext();

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 800 }}>
      <Map
        mapLib={maplibregl}
        mapStyle={process.env.REACT_APP_API_URL}
        initialViewState={{
          bounds: convertBounds(totalBounds),
        }}
        maxBounds={convertBounds(maxRegionBounds)}
        minZoom={3.5}
        padding={24}
        style={{ width: '100%', height: '100%', borderRadius: 12 }}
      >
        <MapSnappingEventListener />
        <UserLocationMarker />
        <MapLocationControl />

        {activePopupCinema && (
          <Popup
            longitude={activePopupCinema.lng}
            latitude={activePopupCinema.lat}
            anchor="top"
            onClose={() => setActivePopupCinema(null)}
            closeOnClick={false}
            offset={[0, 10]}
          >
            <CinemaPopupContent
              cinema={activePopupCinema}
              onSelect={() => {
                setActivePopupCinema(null);
                openCinemaDetails(activePopupCinema);
              }}
            />
          </Popup>
        )}
      
        <MapContextProvider value={{ Marker: MaplibreMarker }}>
          {children}
        </MapContextProvider>
      </Map>
    </Box>
  );
};

export default MaplibreMap;
