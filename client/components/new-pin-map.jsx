import React from 'react';
import { Tooltip, OverlayTrigger, Container, Row } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';
import NetworkErrorPage from '../pages/network-error';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function NewPinMap(props) {
  if (!navigator.onLine) return <NetworkErrorPage />;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  /* Establish starting coordinates, use useMemo hook to prevent rerendering on
  click: */
  const center = React.useMemo(() => ({ lat: 39.8283, lng: -98.5795 }), []);

  const onMapClick = React.useCallback(event => {
    props.setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }, []);

  /* Set map options to add custom style and limit points of interest on map
  (fullscreen not supported on iOS): */
  const options = React.useMemo(() => ({
    mapId: '8c7ace9f28d909f0',
    clickableIcons: false,
    fullscreenControl: true
  }), []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  const showTooltip = props => (
    <Tooltip id='npm-target-button-tooltip' { ...props}>
      Target my location
    </Tooltip>
  );

  function GeoLocate({ panTo }) {
    return (
      <button
        type='button'
        onClick={() => {
          navigator.geolocation.getCurrentPosition(position => {
            panTo({
              lat: position.coords.latitude, lng: position.coords.longitude
            });
          }, () => null);
        }}
      >
        <OverlayTrigger
          placement='bottom'
          delay={{ show: 250, hide: 250 }}
          overlay={ showTooltip }
        >
          <img
            className='target sec-bk-color'
            src='/city-canvas-images/target-audience.webp'
            alt='Target my location!'
          />
        </OverlayTrigger>
      </button>
    );
  }

  if (loadError) {
    return (
      <Container>
        <Row className='text-center'>
          <h2 className='pri-color display-3 fw-bold mt-5 '>
            Error Loading Map
          </h2>
        </Row>
        <Row>
          <p className='msg-font lh-base fw-bold pt-5 px-4'>
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
              If this problem persists, please contact us at&nbsp;
              <a href="mailto:citycanvashelpers@gmail.com">
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
    <div className='form-map-cont sec-border'>
      <GoogleMap
        mapContainerClassName='form-map'
        zoom={ 4 }
        center={ center }
        onClick={ onMapClick }
        onLoad={ onMapLoad }
        options={ options }
      >

        <GeoLocate panTo={ panTo } />

        <Marker
          position={{ lat: +props.marker.lat, lng: +props.marker.lng }}
          icon={{
            url: '/city-canvas-images/pt-pin-sm.webp',
            scaledSize: new window.google.maps.Size(35, 35)
          }}
        />
      </GoogleMap>
    </div>
  );
}
