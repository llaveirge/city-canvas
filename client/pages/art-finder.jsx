import React from 'react';
import { Navbar, Tooltip, OverlayTrigger, Container, Row } from 'react-bootstrap';
import { AppContext } from '../lib';
import Redirect from '../components/redirect';
import LoadingSpinner from '../components/loading-spinner';
import NetworkErrorPage from './network-error';
import InternalErrorPage from './internal-error';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

export default function ArtFinder(props) {
  // Check for online status of the browser, if offline, send error message:
  if (!navigator.onLine) return <NetworkErrorPage />;

  // Check if there is a user logged in, if not, redirect to registration page:
  const validUser = React.useContext(AppContext);
  if (!validUser.user) return <Redirect to='registration' />;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [networkError, setNetworkError] = React.useState(false);
  const [internalError, setInternalError] = React.useState(false);

  /* Get coordinates from props, use useMemo hook to prevent rerendering on
  click: */
  const center = React.useMemo(() => ({ lat: 39.8283, lng: -98.5795 }), []);

  /* Set map options to add custom style and limit points of interest on map
  (fullscreen not supported on iOS): */
  const options = React.useMemo(() => ({
    mapId: '8c7ace9f28d909f0',
    clickableIcons: false,
    fullscreenControl: true
  }), []);

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

  // Fetch all the pins and set them as markers in state:
  React.useEffect(() => {
    fetch('/api/art-finder')
      .then(res => {
        if (res.ok) {
          res.json().then(markers => {
            setMarkers(markers);
          });
        } else {
          res.json().then(response => {
            console.error(response.error);
            setInternalError(true);
          });
        }
      })
      .catch(err => {
        console.error('Fetch Failed!', err);
        setNetworkError(true);
      });
  }, []);

  // Show tooltip for target button that triggers the GeoLocate function:
  const showTooltip = props => (
    <Tooltip id='af-target-button-tooltip' { ...props}>
      Target my location
    </Tooltip>
  );

  // Use Geolocation to locate the user for targeting via target button:
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

  // If there is an error loading the Google Map, display error message:
  if (loadError) {
    return (
      <Container>
        <Row className='text-center'>
          <h2 className='pri-color display-3 fw-bold mt-5'>
            Error Loading Map
          </h2>
        </Row>
        <Row>
          <p className='err-text msg-font fw-bold pt-5 px-4'>
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

  if (internalError) return <InternalErrorPage />;
  if (networkError) return <NetworkErrorPage />;

  return (
    <>
      <div className='full-map-cont'>
        <GoogleMap
          mapContainerClassName='pin-map'
          zoom = { 5 }
          center ={ center }
          onLoad = { onMapLoad }
          options = { options}
        >

          <GeoLocate panTo={ panTo } />

          { markers.map(marker => (
            <Marker
              key={ marker.postId }
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: '/city-canvas-images/pt-pin-sm.webp',
                scaledSize: new window.google.maps.Size(45, 45),
                anchor: new window.google.maps.Point(22, 30)
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}

            { selected
              ? (
                  <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => { setSelected(null); }}
                  >
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
                          <a
                            href={
                              `https://www.google.com/maps/search/?api=1&query=${
                                selected.lat}%2C${selected.lng}`
                            }
                          >
                            Get Directions
                          </a>
                        </p>
                    </div>
                  </InfoWindow>
                )
              : null
            }
        </GoogleMap>
      </div>

      <Navbar fixed='bottom'className='fluid btm-brdr pri-bk-color'></Navbar>
    </>
  );
}
