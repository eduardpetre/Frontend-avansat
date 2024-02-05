import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [userLocation, setUserLocation] = useState([0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
      }
    );
  }, []);

  const generateRandomLocation = (baseLocation) => {
    const radius = 0.01;
    const randomLat = baseLocation[0] + (Math.random() - 0.5) * radius * 2;
    const randomLng = baseLocation[1] + (Math.random() - 0.5) * radius * 2;
    return [randomLat, randomLng];
  };

  const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <div className='mb-5' style={{ textAlign: 'center' }}>
        <h2>Find your devices</h2>
      </div>
      {!loading && (
        <MapContainer center={userLocation} zoom={12} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userLocation} icon={redIcon}>
            <Popup>Your position</Popup>
          </Marker>
          <Marker position={generateRandomLocation(userLocation)} icon={blueIcon}>
            <Popup>iPhone</Popup>
          </Marker>
          <Marker position={generateRandomLocation(userLocation)} icon={blueIcon}>
            <Popup>Apple Watch</Popup>
          </Marker>
          <Marker position={generateRandomLocation(userLocation)} icon={blueIcon}>
            <Popup>AirPods</Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
