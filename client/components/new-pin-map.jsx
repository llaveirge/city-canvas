import React from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker
} from '@react-google-maps/api';

const center = { lat: 39.744137, lng: -104.950050 };

export default function NewPinMap(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // Set state:
  // const [marker, setMarker] = React.useState({});

  // Set a custom marker via click:
  const onMapClick = React.useCallback(event => {
    props.setMarker({
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

  // Use Geolocation to Locate the user for targeting via a button:
  function GeoLocate({ panTo }) {
    return (
      <button type='button' onClick={() => {
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
      mapContainerClassName='form-map'
      zoom={10}
      center={ center }
      onClick={onMapClick}
      onLoad={onMapLoad}
      >

      <GeoLocate panTo={panTo} />

      <Marker position={{ lat: +props.marker.lat, lng: +props.marker.lng }}
      icon={{
        url: '/pt_pin_sm.png',
        scaledSize: new window.google.maps.Size(35, 35)
      }}/>

    </GoogleMap>
  </div>
  );
}
