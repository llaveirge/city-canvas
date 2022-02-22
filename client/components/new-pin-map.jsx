import React from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker
  // InfoWindow
} from '@react-google-maps/api';

const mapContStyle = {
  width: '550px',
  height: '320px'
};

const center = { lat: 39.7392, lng: -104.9903 };

export default function NewPinMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [marker, setMarker] = React.useState({});

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading Map';

  return (
  <div>
    <GoogleMap
      mapContainerStyle={mapContStyle}
      zoom={16}
      center={ center }
      onClick={event => {
        setMarker({
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        });
      }}>

      <Marker position={{ lat: marker.lat, lng: marker.lng }}/>

    </GoogleMap>
  </div>
  );
}
