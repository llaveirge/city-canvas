import React from 'react';
import { Navbar } from 'react-bootstrap';
import {
  GoogleMap,
  useLoadScript,
  Marker
} from '@react-google-maps/api';

const center = { lat: 38.836419, lng: -104.8276377 };

export default function ArtFinder(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  // const [markers, setMarkers] = React.useState([]);

  const markers = [{ postId: 3, artPhotoUrl: 'https://www.uncovercolorado.com/wp-content/uploads/2020/12/colorado-springs-murals-take-back-the-power.jpg', lat: 38.834158324677844, lng: -104.82302912287078 },
    { postId: 7, artPhotoUrl: 'https://bloximages.newyork1.vip.townnews.com/gazette.com/content/tncms/assets/v3/editorial/1/11/111fbde2-a061-11ea-ad32-bfb117588960/5ecedbafd9e1f.image.jpg?crop=1637%2C1228%2C0%2C19&resize=1637%2C1228&order=crop%2Cresize', lat: 38.83387105305894, lng: -104.82266124016441 }];
  // const [selected, setSelected] = React.useState(null);

  // Prevent re-renders with useRef, specifically when placing/accessing/modifying markers:
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // useEffect(() => {
  //   fetch('/api/art-finder')
  //   .then()
  // })

  if (loadError) return 'Error loading map';
  if (!isLoaded) return 'Loading map, one moment...';

  return (
    <>
      <div>
        <GoogleMap
          mapContainerClassName='pin-map'
          zoom = { 5 }
          center={ center }
          onLoad= {onMapLoad}
          >
            {markers.map(marker => (
              <Marker
                key={marker.postId}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  url: '/pt_pin_sm.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                  anchor: new window.google.maps.Point(25, 40)
                }}
                // onClick={() => {
                //   setSelected(marker);
                // }}
                />
            ))}

        </GoogleMap>
      </div>

      <Navbar fixed='bottom'className='fluid btm-brdr'></Navbar>
    </>
  );
}
