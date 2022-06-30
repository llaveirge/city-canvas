import React from 'react';
import { Navbar } from 'react-bootstrap';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

export default function PinMap(props) {
  // Check if there is a user logged in, if not, redirect to registration page:
  const validUser = React.useContext(AppContext);
  if (!validUser.user) return <Redirect to='registration' />;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // Set infoWindow state to marker location or null, to toggle info window:
  const [infoWindow, setInfoWindow] = React.useState(null);

  // Prevent re-renders with useRef, specifically when placing markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // Pan to a location:
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  // Get coordinates from props:
  const center = { lat: props.lat, lng: props.lng };

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
        <img className='target sec-bk-color'
          src='/target-audience.png'
          alt='Target my location!'
          />
      </button>
    );
  }

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading map, one moment...';

  return (
    <>
      <div className='full-map-cont'>
        <GoogleMap
          mapContainerClassName='pin-map'
          zoom={ 17 }
          center={ center }
          onLoad={ onMapLoad }
        >

          <GeoLocate panTo={ panTo } />

          <Marker position={{ lat: center.lat, lng: center.lng }}
            icon={{
              url: '/pt_pin_sm.png',
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 40)
            }}
            onClick={() => {
              setInfoWindow({ center });
            }}
          />

          { infoWindow
            ? (
              <InfoWindow
              position={{ lat: center.lat, lng: center.lng }}
              onCloseClick={() => { setInfoWindow(null); }}>
                <div>
                  <div className='info-img-cont'>
                    <a href={ `#pins?postId=${props.pinId}` }>
                      <img className='info-img' src={ props.img }></img>
                    </a>
                  </div>
                  <p className='text-center dir-link pt-1'>
                    <a href={
                      `https://www.google.com/maps/search/?api=1&query=${center.lat}%2C${center.lng}`
                      }>
                      Get Directions
                    </a>
                  </p>
                </div>
              </InfoWindow>
              )
            : null }
        </GoogleMap>
      </div>

      <Navbar fixed='bottom' className='fluid btm-brdr pri-bk-color'></Navbar>
    </>
  );
}
