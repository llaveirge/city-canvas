import React from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker
} from '@react-google-maps/api';

const mapContStyle = {
  width: '550px',
  height: '320px'
};

const center = { lat: 39.744137, lng: -104.950050 };

export default function NewPinMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // Set state:
  const [marker, setMarker] = React.useState({});

  // Set a custom marker via click:
  const onMapClick = React.useCallback(event => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }, []);

  // Prevent re-renders with useRef, specifically when placing markers;
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // Pan to a location:
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  function GeoLocate({ panTo }) {
    return (
      <button onClick={() => {
        navigator.geolocation.getCurrentPosition(position => {
          panTo({
            lat: position.coords.latitude, lng: position.coords.longitude
          });
        }, () => null);
      }}>
        <img className='target' src='/target-audience.png' alt="Target my location!"/>
      </button>
    );
  }

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading Map';

  return (
  <div>
    <GoogleMap
      mapContainerStyle={mapContStyle}
      zoom={10}
      center={ center }
      onClick={onMapClick}
      onLoad={onMapLoad}
      >

      <GeoLocate panTo={panTo} />

      <Marker position={{ lat: +marker.lat, lng: +marker.lng }}
      icon={{
        url: '/pt_pin_sm.png',
        scaledSize: new window.google.maps.Size(35, 35)
      }}/>

    </GoogleMap>
  </div>
  );
}
