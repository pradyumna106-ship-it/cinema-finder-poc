import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { point } from '@turf/helpers';
import distance from '@turf/distance';
import {
  saveLastLocation,
  loadLastLocation,
  saveUserCoords,
  loadUserCoords,
} from '../utils/lastLocation';

const CinemaContext = createContext(null);

export const useCinemaContext = () => {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error('useCinemaContext must be used within CinemaProvider');
  }
  return context;
};

export const CinemaProvider = ({ children }) => {
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [activePopupCinema, setActivePopupCinema] = useState(null);
  // Instantly initialize userLocation from localStorage cache so the map and distance chips show immediately on page load!
  const [userLocation, setUserLocation] = useState(() => {
    return loadUserCoords() || loadLastLocation();
  });
  const [locationError, setLocationError] = useState(null);

  // Booking modal state
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    cinema: null,
    movie: null,
    showtime: '',
  });

  // Filter state for right side panel
  const [filters, setFilters] = useState({
    search: '',
    selectedProducts: [],
    minRating: 0,
    maxPrice: 40,
    maxDistance: null, // in km, or null for any distance
  });

  // Auto-detect user's current location when page loads (Requirement: Use user's current location on load)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          setUserLocation(coords);
          saveUserCoords(coords);

          // If no pointed location was saved yet, also save as initial location
          if (!loadLastLocation()) {
            saveLastLocation({ lat: coords.lat, lng: coords.lng, zoom: 13 });
          }

          console.log('User location acquired:', coords);
          window.dispatchEvent(
            new CustomEvent('map.userLocationDetected', { detail: coords })
          );
        },
        (err) => {
          console.warn('Geolocation access error or denied:', err.message);
          setLocationError(err.message);
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    }
  }, []);

  const openCinemaDetails = useCallback((cinema) => {
    setSelectedCinema(cinema);
    setActivePopupCinema(cinema);
    if (cinema?.lat && cinema?.lng) {
      // Save pointed location to localStorage on cinema selection
      saveLastLocation({ lat: cinema.lat, lng: cinema.lng, zoom: 14 });
      window.dispatchEvent(
        new CustomEvent('map.snapTo', {
          detail: { lat: cinema.lat, lng: cinema.lng },
        })
      );
    }
  }, []);

  const closeCinemaDetails = useCallback(() => {
    setSelectedCinema(null);
  }, []);

  const openBooking = useCallback((cinema, movie, showtime) => {
    setBookingModal({
      isOpen: true,
      cinema,
      movie,
      showtime,
    });
  }, []);

  const closeBooking = useCallback(() => {
    setBookingModal({
      isOpen: false,
      cinema: null,
      movie: null,
      showtime: '',
    });
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      selectedProducts: [],
      minRating: 0,
      maxPrice: 40,
      maxDistance: null,
    });
  }, []);

  // Compute distance from user location to a given cinema
  const getCinemaDistance = useCallback(
    (cinema) => {
      if (!userLocation || !cinema?.lat || !cinema?.lng) return cinema.distance || null;
      try {
        const from = point([userLocation.lng, userLocation.lat]);
        const to = point([cinema.lng, cinema.lat]);
        return distance(from, to);
      } catch (e) {
        return cinema.distance || null;
      }
    },
    [userLocation]
  );

  return (
    <CinemaContext.Provider
      value={{
        selectedCinema,
        setSelectedCinema,
        activePopupCinema,
        setActivePopupCinema,
        openCinemaDetails,
        closeCinemaDetails,
        bookingModal,
        openBooking,
        closeBooking,
        userLocation,
        locationError,
        filters,
        updateFilters,
        resetFilters,
        getCinemaDistance,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
};
export default CinemaContext;
