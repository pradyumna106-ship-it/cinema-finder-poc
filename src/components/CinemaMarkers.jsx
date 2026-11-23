import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import allCinemas from '../data/cinemas';
import { useMapContext } from './Map/context';
import { useCinemaContext } from '../context/CinemaContext';

const CinemaMarkers = () => {
  const { Marker } = useMapContext();
  const params = useParams();
  const { filters, getCinemaDistance } = useCinemaContext();

  const cinemas = useMemo(() => {
    let result = allCinemas;
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params;
      result = allCinemas.filter((cinema) => {
        return (
          (franchiseId === 'all-cinemas' || cinema.franchise === franchiseId) &&
          cinema.countryCode === countryCode
        );
      });
    }

    // Apply filters from right-side panel
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.address && c.address.toLowerCase().includes(q))
      );
    }

    if (filters.minRating > 0) {
      result = result.filter((c) => (c.rating || 0) >= filters.minRating);
    }

    if (filters.maxPrice && filters.maxPrice < 40) {
      result = result.filter((c) => (c.ticketPrice || 0) <= filters.maxPrice);
    }

    if (filters.selectedProducts && filters.selectedProducts.length > 0) {
      result = result.filter((c) =>
        filters.selectedProducts.every((p) => c.products && c.products.includes(p))
      );
    }

    if (filters.maxDistance) {
      result = result.filter((c) => {
        const dist = getCinemaDistance(c);
        return dist !== null && dist <= filters.maxDistance;
      });
    }

    return result;
  }, [params, filters, getCinemaDistance]);

  return cinemas.map((cinema, idx) => (
    <Marker
      lat={cinema.lat}
      lon={cinema.lng}
      cinema={cinema}
      key={cinema.id || idx}
    />
  ));
};

export default CinemaMarkers;
