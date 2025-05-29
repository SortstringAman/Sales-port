import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const home = {
  lat: 25.4200954,
  lng: 82.86222,
};

const MapWithMarkers = ({ data }) => {
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCNCcTQduJoNRebWEf7zgqlpe1YJibSuGI',
  });

  // Function to render markers
  const renderMarkers = () => {
    if (!mapRef.current || !window.google) return;

    // Clear previous markers
    if (mapRef.current.markers) {
      mapRef.current.markers.forEach(marker => marker.setMap(null));
    }

    const homeMarker = new window.google.maps.Marker({
      position: home,
      map: mapRef.current,
      title: 'Home',
      icon: {
        url: 'university.png',
        scaledSize: new window.google.maps.Size(42, 42),
      },
    });

    const enquiryMarkers = data
      .filter(item => item.latitude && item.longitude)
      .map(item => {
        const marker = new window.google.maps.Marker({
          position: { lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) },
          map: mapRef.current,
          title: `${item.first_name || ''} ${item.last_name || ''}`,
          icon: {
            url: 'location.png',
            scaledSize: new window.google.maps.Size(40, 40),
          },
        });

        marker.addListener('click', () => {
          setSelectedMarker(item);
        });

        return marker;
      });

    // Store markers on mapRef
    mapRef.current.markers = [homeMarker, ...enquiryMarkers];
  };

  // Call this on map load
  const onLoad = (map) => {
    mapRef.current = map;
    map.setCenter(home);
    map.setZoom(14);
    renderMarkers();
  };

  // Call this when data changes
  useEffect(() => {
    renderMarkers();
  }, [data]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={home}
      zoom={14}
      onLoad={onLoad}
    >
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedMarker.latitude),
            lng: parseFloat(selectedMarker.longitude),
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div style={{ maxWidth: 250 }}>
             {selectedMarker.first_name} {selectedMarker.last_name}<br />
             {selectedMarker.phone}<br />
             {selectedMarker.addresses?.[0]?.address}, {selectedMarker.addresses?.[0]?.city}, {selectedMarker.addresses?.[0]?.state}, {selectedMarker.addresses?.[0]?.pincode}<br />
            <div style={{ display: 'flex', justifyContent: 'end', flexDirection: 'column', alignItems: 'end' }}>
              <span style={{ fontStyle: 'italic', marginTop: '5px', fontWeight: "550", fontSize: '10px' }}>{selectedMarker.crated_by}</span>
              <span style={{ fontSize: '11px' }}>
                {new Date(selectedMarker.created_at).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapWithMarkers;
