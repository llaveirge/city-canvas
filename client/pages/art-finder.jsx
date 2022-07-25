import React from 'react';
import { Navbar } from 'react-bootstrap';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import LoadingSpinner from '../components/loading-spinner';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

const center = { lat: 39.223014, lng: -105.001887 };

export default function ArtFinder(props) {
  // Check if there is a user logged in, if not, redirect to registration page:
  const validUser = React.useContext(AppContext);
  if (!validUser.user) return <Redirect to='registration' />;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [networkError, setNetworkError] = React.useState(false);

  // Prevent re-renders with useRef, specifically when placing markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // Pan to a location:
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  // Fetch all the pins and and set them as markers in state:
  React.useEffect(() => {
    fetch('/api/home-feed')
      .then(response => response.json())
      .then(markers => {
        setMarkers(markers);
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        setNetworkError(true);
      });
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
        <img
          className='target sec-bk-color pin-pg'
          src='/target-audience.webp'
          alt='Target my location!'
        />
      </button>
    );
  }

  if (loadError) return 'Error loading map';
  if (!isLoaded) return <LoadingSpinner />;
  if (networkError) {
    return <h6 className='pt-5 px-5 saved-canvas-empty-heading pri-color text-center fw-bold'>
          Sorry, there was an error connecting to the network!
          Please check your internet connection and try again.
        </h6>;
  }

  return (
    <>
      <div className='full-map-cont'>
        <GoogleMap
          mapContainerClassName='pin-map'
          zoom = { 8 }
          center={ center }
          onLoad= { onMapLoad }
          >

          <GeoLocate panTo={ panTo } />

          { markers.map(marker => (
            <Marker
              key={marker.postId}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: '/pt_pin_sm.webp',
                scaledSize: new window.google.maps.Size(45, 45),
                anchor: new window.google.maps.Point(22, 30)
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          )) }

            { selected
              ? (
              <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => { setSelected(null); }}>
                <div>
                  <div className='info-img-cont'>
                    <a href={ `#pins?postId=${selected.postId}` }>
                      <img
                      className='info-img'
                      src={ selected.artPhotoUrl }
                      ></img>
                    </a>
                  </div>
                    <p className='text-center dir-link pt-1'>
                      <a href={
                        `https://www.google.com/maps/search/?api=1&query=${selected.lat}%2C${selected.lng}`
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

      <Navbar fixed='bottom'className='fluid btm-brdr pri-bk-color'></Navbar>
    </>
  );
}
