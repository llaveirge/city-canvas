import React from 'react';
import LoadingSpinner from './loading-spinner';
import NetworkErrorPage from '../pages/network-error';
import { Tooltip, OverlayTrigger, Container, Row } from 'react-bootstrap';
import {
  GoogleMap,
  useLoadScript,
  Marker
} from '@react-google-maps/api';

export default function UpdatePinMap(props) {
  // Check for online status of the browser, if offline send error message:
  if (!navigator.onLine) return <NetworkErrorPage />;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // Establish starting coordinates, use useMemo hook to prevent rerendering on click:
  const center = React.useMemo(() => ({ lat: +props.marker.lat, lng: +props.marker.lng }), []);

  // Set a custom marker via click:
  const onMapClick = React.useCallback(event => {
    props.setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }, []);

  // Set map options to add style and limit points of interest on map (fullscreen not supported on iOS):
  const options = React.useMemo(() => ({
    mapId: '8c7ace9f28d909f0',
    clickableIcons: false,
    fullscreenControl: true
  }), []
  );

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
          <img
            className='target sec-bk-color'
            src='/target-audience.webp'
            alt='Target my location!'
          />
        </OverlayTrigger>
      </button>
    );
  }

  // if (loadError) return <h2>Error loading map</h2>;
  if (loadError) {
    return (
      <Container>
        <Row className='text-center'>
          <h2 className='mt-5 pri-color display-3 fw-bold'>
            Error Loading Map
          </h2>
        </Row>
        <Row>
          <p className='pt-5 px-4 fw-bold error-text no-results-heading'>
            Sorry, something&apos;s not right here. Please try the following:
          </p>

          <ul className='pt-2 px-4'>
            <li>
              Check your internet connection and try again.
            </li>
            <li>
              Refresh the page, this might help.
            </li>
            <li>
              Try signing out and signing back in again.
            </li>
            <li>
              If this problem persists, please contact us at <a
                href="mailto:citycanvashelpers@gmail.com">
                    CityCanvasHelpers@gmail.com
                </a>
            </li>
          </ul>
        </Row>
      </Container>
    );
  }

  if (!isLoaded || isNaN(center.lat) || isNaN(center.lng)) {
    return <LoadingSpinner />;
  }

  return (
    <div className='form-map-cont'>
      <GoogleMap
        mapContainerClassName='form-map'
        zoom={ 14 }
        center={ center }
        onClick={ onMapClick }
        onLoad={ onMapLoad }
        options={ options }
      >

        <GeoLocate panTo={ panTo } />

        <Marker
          position={{ lat: +props.marker.lat, lng: +props.marker.lng }}
          icon={{
            url: '/pt_pin_sm.webp',
            scaledSize: new window.google.maps.Size(35, 35)
          }}
        />

      </GoogleMap>
    </div>
  );
}
