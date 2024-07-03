import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = () => {
  const [floodData, setFloodData] = useState([]);
  const [userLocation, setUserLocation] = useState(center);

  useEffect(() => {
    // Fetch flood data from GEE
    const fetchFloodData = async () => {
      try {
        const response = await axios.get('YOUR_GEE_API_ENDPOINT', {
          headers: {
            'Authorization': `Bearer AIzaSyDrMIpf438J6fm_J7QOzk0H8SwYRoX0gzk`,
          },
        });
        setFloodData(response.data);
      } catch (error) {
        console.error('Error fetching flood data:', error);
      }
    };

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    fetchFloodData();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDrMIpf438J6fm_J7QOzk0H8SwYRoX0gzk">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={10}
      >
        {floodData.map((flood, index) => (
          <Marker key={index} position={flood.location} />
        ))}
        <Marker
          position={userLocation}
          icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
