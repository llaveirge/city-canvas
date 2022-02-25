import React from 'react';

import { Navbar } from 'react-bootstrap';

import {
  GoogleMap,
  useLoadScript
  // Marker
} from '@react-google-maps/api';

const center = { lat: 39.744137, lng: -104.950050 }; // Change this to props?

export default function PinMap(props) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

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
        <img className='target pin-pg' src='/target-audience.png' alt="Target my location!"/>
      </button>
    );
  }

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading Map';

  return (
    <>
  <div>
    <GoogleMap
      mapContainerClassName='pin-map'
      zoom={17}
      center={ center }
      onLoad={onMapLoad}
      >

      <GeoLocate panTo={panTo} />

      {/* <Marker position={{ center }}
      icon={{
        url: '/pt_pin_sm.png',
        scaledSize: new window.google.maps.Size(35, 35)
      }}/> */}

    </GoogleMap>
  </div>
  <Navbar fixed="bottom"className='fluid btm-brdr'></Navbar>
    </>
  );
}
