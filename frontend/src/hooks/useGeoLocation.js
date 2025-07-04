import { useState, useEffect } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null, error: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((loc) => ({ ...loc, error: 'Geolocation not supported' }));
      return;
    }
    const success = (pos) => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, error: null });
    };
    const error = () => {
      setLocation((loc) => ({ ...loc, error: 'Permission denied or unavailable' }));
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return location;
};

export default useGeoLocation;