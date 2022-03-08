import React from 'react';
import { Navbar } from 'react-bootstrap';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

export default function ArtFinder(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // const [markers, setMarkers] = React.useState([]);

  const markers = [{ postId: 3, img: 'https://www.uncovercolorado.com/wp-content/uploads/2020/12/colorado-springs-murals-take-back-the-power.jpg', lat: 38.834158324677844, lng: -104.82302912287078 },
    { postId: 7, img: 'https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/1/11/111fbde2-a061-11ea-ad32-bfb117588960/5ecedbafd9e1f.image.jpg?crop=1637%2C1228%2C0%2C19&resize=1637%2C1228&order=crop%2Cresize', lat: 38.83387105305894, lng: -104.82266124016441 }];

  const [selected, setSelected] = React.useState(null);

  // Prevent re-renders with useRef, specifically when placing/accessing/modifying markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // Pan to a location:
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
  }, []);

  // useEffect(() => {
  //   fetch('/api/art-finder')
  //   .then()
  // })

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
        <img className='target pin-pg'
          src='/target-audience.png'
          alt='Target my location!'
          />
      </button>
    );
  }

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading map, one moment...';

  const nearMe = navigator.geolocation.getCurrentPosition(position => {
    panTo({
      lat: position.coords.latitude, lng: position.coords.longitude
    });
  }, () => null);

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading map, one moment...';

  return (

    <>
      <div>
        <GoogleMap
          mapContainerClassName='pin-map'
          zoom = { 13 }
          center={ nearMe}
          onLoad= {onMapLoad}
          >

          <GeoLocate panTo={ panTo } />

          {markers.map(marker => (
            <Marker
              key={marker.postId}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: '/pt_pin_sm.png',
                scaledSize: new window.google.maps.Size(45, 45),
                anchor: new window.google.maps.Point(22, 30)
              }}
              onClick={() => {
                setSelected(marker);
              }}
              />
          ))}

            {selected
              ? (<InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => { setSelected(null); }}>
                <div>
                  <div className='info-img-cont'>
                    <a href={`#pins?postId=${selected.postId}`}>
                      <img className='info-img' src={selected.img}></img>
                    </a>
                  </div>
                  <p className='text-center dir-link pt-1'>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat}%2C${selected.lng}`}>
                      Get Directions
                    </a>
                  </p>
              </div>
            </InfoWindow>)
              : null}

        </GoogleMap>
      </div>

      <Navbar fixed='bottom'className='fluid btm-brdr'></Navbar>
    </>
  );
}
