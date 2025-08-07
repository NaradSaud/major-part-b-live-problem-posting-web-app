import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const centerDefault = {
  lat: 20.5937, // India approx (change as needed)
  lng: 78.9629
};

const MapPicker = ({ location, setLocation }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'GOOGLE MAP API KEY' // google map api
  });

  const onMapClick = useCallback(
    (e) => {
      setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    },
    [setLocation]
  );

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location.lat && location.lng ? location : centerDefault}
      zoom={location.lat && location.lng ? 15 : 5}
      onClick={onMapClick}
    >
      {location.lat && location.lng ? <Marker position={location} /> : null}
    </GoogleMap>
  );
};

export default React.memo(MapPicker);