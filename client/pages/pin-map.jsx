import React from 'react';
import { Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import LoadingSpinner from '../components/loading-spinner';
import NetworkErrorPage from './network-error';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

export default function PinMap(props) {
  // Check for online status of the browser, if offline send error message:
  if (!navigator.onLine) return <NetworkErrorPage />;

  // Check if there is a user logged in, if not, redirect to registration page:
  const validUser = React.useContext(AppContext);
  if (!validUser.user) return <Redirect to='registration' />;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // Get coordinates from props, use useMemo hook to prevent rerendering on click:
  const center = React.useMemo(() => ({ lat: props.lat, lng: props.lng }), []);

  // Set infoWindow state to marker location or null, to toggle info window:
  const [infoWindow, setInfoWindow] = React.useState(null);

  // Set map options to add style and limit points of interest on map:
  const options = React.useMemo(() => ({
    mapId: '8c7ace9f28d909f0',
    clickableIcons: false
  }), []
  );

  // Prevent map re-renders with useRef, specifically when placing markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // Pan to a location:
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  // Show tooltip for target button that triggers the GeoLocate function
  const showTooltip = props => (
    <Tooltip { ...props}>Target my location</Tooltip>
  );

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
         <OverlayTrigger placement='bottom' overlay={showTooltip}>
          <img className='target sec-bk-color'
            src='/target-audience.webp'
            alt='Target my location!'
            />
        </OverlayTrigger>
      </button>
    );
  }

  if (loadError) return <h2>Error loading map</h2>;
  if (!isLoaded || isNaN(center.lat) || isNaN(center.lng)) {
    return <LoadingSpinner />;
  }

  // navigator.permissions.query({ name: 'geolocation' })
  //   .then(function (permissionStatus) {
  //     console.log('geolocation permission state is ', permissionStatus.state);

  //     permissionStatus.onchange = function () {
  //       console.log('geolocation permission state has changed to ', this.state);
  //     };
  //   });

  return (
    <>
      <div className='full-map-cont'>
        <GoogleMap
          mapContainerClassName='pin-map'
          zoom={ 17 }
          center={ center }
          onLoad={ onMapLoad }
          options={ options }
        >

          <GeoLocate panTo={ panTo } />

          <Marker
            position={{ lat: center.lat, lng: center.lng }}
            icon={{
              url: '/pt_pin_sm.webp',
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
