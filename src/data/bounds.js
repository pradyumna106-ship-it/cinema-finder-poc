// Country bounds drawn via http://bboxfinder.com/
// format is [W, S, E, N]
export const countryBounds = {
  au: [112.669086, -43.696673, 153.726368, -10.737187],
  nz: [166.332922, -47.292562, 178.573837, -34.394162],
};

export const allCountryBounds = Object.values(countryBounds);

// Total bounds for Australia and New Zealand combined
export const totalBounds = allCountryBounds.reduce(
  ([w1, s1, e1, n1], [w2, s2, e2, n2]) => [
    Math.min(w1, w2),
    Math.min(s1, s2),
    Math.max(e1, e2),
    Math.max(n1, n2),
  ]
);

// Bounding box strictly encompassing Australia and New Zealand regions
// Restricts movement across the entire world to the AU/NZ Oceania region
export const maxRegionBounds = [95.0, -55.0, 180.0, -2.0];

export const isWithinBounds = (lat, lng) => {
  return (
    lat >= maxRegionBounds[1] &&
    lat <= maxRegionBounds[3] &&
    lng >= maxRegionBounds[0] &&
    lng <= maxRegionBounds[2]
  );
};
