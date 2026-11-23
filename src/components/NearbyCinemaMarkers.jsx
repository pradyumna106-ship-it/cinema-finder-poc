import React from 'react';
import useNearbyCinemas from '../data/nearbyCinemas';
import { useMapContext } from './Map/context';
import { useCinemaContext } from '../context/CinemaContext';

const NearbyCinemaMarkers = () => {
  const { Marker } = useMapContext();
  const { cinemas } = useNearbyCinemas();
  const { filters } = useCinemaContext();

  const filteredCinemas = cinemas.filter((c) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !(c.address && c.address.toLowerCase().includes(q))) {
        return false;
      }
    }
    if (filters.minRating > 0 && (c.rating || 0) < filters.minRating) {
      return false;
    }
    if (filters.maxPrice && filters.maxPrice < 40 && (c.ticketPrice || 0) > filters.maxPrice) {
      return false;
    }
    if (
      filters.selectedProducts &&
      filters.selectedProducts.length > 0 &&
      !filters.selectedProducts.every((p) => c.products && c.products.includes(p))
    ) {
      return false;
    }
    return true;
  });

  return filteredCinemas.map((cinema, idx) => (
    <Marker
      lat={cinema.lat}
      lon={cinema.lng}
      cinema={cinema}
      key={cinema.id || idx}
    />
  ));
};

export default NearbyCinemaMarkers;
