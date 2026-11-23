import auCinemas from './auCinemas.json';
import nzCinemas from './nzCinemas.json';
import { countBy } from 'lodash';
import { matchCinemaToFranchise } from './franchises';
import { enrichCinema } from './cinemaDetails';

const addKeyToObject = (key, value) => {
  // This function returns a function that modifies an object by adding a specific key & value.
  return (obj) => {
    return {
      ...obj,
      [key]: value,
    }
  }
}

// Combine the NZ & Aus data after adding the countryCodes to each cinema object
const rawCinemas = [
  ...auCinemas.map(addKeyToObject('countryCode', 'au')),
  ...nzCinemas.map(addKeyToObject('countryCode', 'nz'))
].map(cinema => {
  // Match each cinema to a franchise and add to each cinema object
  const franchise = matchCinemaToFranchise(cinema);
  return addKeyToObject('franchise', franchise)(cinema);
});

export const breakdown = countBy(rawCinemas, 'countryCode');

const cinemas = rawCinemas.map((cinema, idx) => enrichCinema(cinema, idx));

export default cinemas;