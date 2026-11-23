const LOCATION_KEY = 'app.lastLocation';
const USER_COORDS_KEY = 'app.userCoords';

// Save the pointed map location (center and zoom level)
export const saveLastLocation = ({ lat, lng, zoom = 13 }) => {
  try {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
    localStorage.setItem(
      LOCATION_KEY,
      JSON.stringify({
        lat,
        lng,
        zoom: Number.isFinite(zoom) ? zoom : 13,
        savedAt: Date.now(),
      })
    );
  } catch (e) {
    /* storage may be blocked; ignore */
  }
};

// Load the pointed map location
export const loadLastLocation = () => {
  try {
    const raw = localStorage.getItem(LOCATION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const { lat, lng, zoom } = data || {};
    return Number.isFinite(lat) && Number.isFinite(lng)
      ? { lat, lng, zoom: Number.isFinite(zoom) ? zoom : 13 }
      : null;
  } catch (e) {
    return null;
  }
};

// Save user's detected GPS coordinates to localStorage
export const saveUserCoords = (coords) => {
  try {
    if (!coords || !Number.isFinite(coords.lat) || !Number.isFinite(coords.lng)) return;
    localStorage.setItem(
      USER_COORDS_KEY,
      JSON.stringify({
        lat: coords.lat,
        lng: coords.lng,
        accuracy: coords.accuracy || null,
        savedAt: Date.now(),
      })
    );
  } catch (e) {
    /* storage may be blocked; ignore */
  }
};

// Load user's cached GPS coordinates
export const loadUserCoords = () => {
  try {
    const raw = localStorage.getItem(USER_COORDS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const { lat, lng, accuracy } = data || {};
    return Number.isFinite(lat) && Number.isFinite(lng)
      ? { lat, lng, accuracy }
      : null;
  } catch (e) {
    return null;
  }
};
