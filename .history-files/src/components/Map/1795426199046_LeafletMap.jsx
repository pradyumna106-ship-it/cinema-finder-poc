import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import useEventListener from '@use-it/event-listener';
import { useSnackbar } from 'notistack';
import { Box, IconButton } from '@mui/material';
import { MdMyLocation } from 'react-icons/md';
import { totalBounds, maxRegionBounds, isWithinBounds } from '../../data/bounds';
import MapContext from './context';
import CinemaPopupContent from './CinemaPopupContent';
import { useCinemaContext } from '../../context/CinemaContext';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const convertBounds = ([w, s, e, n]) => [
  [s, w],
  [n, e],
];

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap();
  const { userLocation } = useCinemaContext();

  useEventListener('map.snapTo', ({ detail: { lat, lng } }) => {
    try {
      map.flyTo([lat, lng], 14, { duration: 0.8, easeLinearity: 1 });
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Unexpected error while attempting map navigation', {
        variant: 'error',
      });
    }
  });

  useEffect(() => {
    if (userLocation?.lat && userLocation?.lng) {
      if (isWithinBounds(userLocation.lat, userLocation.lng)) {
        map.flyTo([userLocation.lat, userLocation.lng], 12, { duration: 1 });
      }
    }
  }, [userLocation, map]);

  return null;
};

const LeafletMarker = ({ cinema, lat, lon, onClick }) => {
  const map = useMap();
  const { openCinemaDetails } = useCinemaContext();

  const latitude = lat ?? cinema?.lat;
  const longitude = lon ?? cinema?.lng;

  if (latitude === undefined || longitude === undefined) return null;

  const handleClick = () => {
    map.flyTo([latitude, longitude], 14, { duration: 0.8, easeLinearity: 1 });
    if (onClick) onClick();
  };

  return (
    <Marker
      position={[latitude, longitude]}
      eventHandlers={{
        click: handleClick,
      }}
    >
      {cinema && (
        <Popup minWidth={220} maxWidth={320}>
          <CinemaPopupContent
            cinema={cinema}
            onSelect={() => openCinemaDetails(cinema)}
          />
        </Popup>
      )}
    </Marker>
  );
};

const UserLocationMarker = () => {
  const { userLocation } = useCinemaContext();
  if (!userLocation?.lat || !userLocation?.lng) return null;

  return (
    <>
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Tooltip permanent direction="top" offset={[0, -25]}>
          <span>You are here</span>
        </Tooltip>
      </Marker>
      <Circle
        center={[userLocation.lat, userLocation.lng]}
        radius={2000}
        pathOptions={{ color: '#0284c7', fillColor: '#38bdf8', fillOpacity: 0.2 }}
      />
    </>
  );
};

const CenterLocationControl = () => {
  const map = useMap();
  const { userLocation } = useCinemaContext();

  if (!userLocation?.lat || !userLocation?.lng) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 24,
        right: 16,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={() => {
          map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 0.8 });
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

const LeafletMap = ({ children }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 400 }}>
      <MapContainer
        bounds={convertBounds(totalBounds)}
        maxBounds={convertBounds(maxRegionBounds)}
        maxBoundsViscosity={1.0}
        minZoom={3.5}
        style={{ height: '100%', width: '100%', backgroundColor: '#0f172a', borderRadius: '12px' }}
        zoomSnap={0.5}
        zoomDelta={0.5}
      >
        <MapSnappingEventListener />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          minZoom={2}
          maxZoom={19}
        />
        <UserLocationMarker />
        <CenterLocationControl />
        <MapContext.Provider value={{ Marker: LeafletMarker }}>
          {children}
        </MapContext.Provider>
      </MapContainer>
    </Box>
  );
};

export default LeafletMap;
