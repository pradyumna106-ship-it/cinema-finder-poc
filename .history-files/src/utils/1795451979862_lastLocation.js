const KEY = 'app.lastLocation';

export const saveLastLocation = ({ lat, lng }) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ lat, lng, savedAt: Date.now() }));
  } catch (e) {
    /* storage may be blocked; ignore */
  }
};

export const loadLastLocation = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { lat, lng } = JSON.parse(raw);
    return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  } catch (e) {
    return null;
  }
};