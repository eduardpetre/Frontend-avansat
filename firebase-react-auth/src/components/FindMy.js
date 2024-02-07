import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useSelector } from 'react-redux';

const generateRandomLocation = (baseLocation) => {
  const radius = 0.01;
  const randomLat = baseLocation[0] + (Math.random() - 0.5) * radius * 2;
  const randomLng = baseLocation[1] + (Math.random() - 0.5) * radius * 2;
  return [randomLat, randomLng];
};

const generateRandomLocations = (baseLocation) => {
  return {
    phoneLocation: generateRandomLocation(baseLocation),
    watchLocation: generateRandomLocation(baseLocation),
    podsLocation: generateRandomLocation(baseLocation),
  };
};

const Map = () => {
  const phoneBattery = useSelector((state) => state.phoneBattery);
  const watchBattery = useSelector((state) => state.watchBattery);
  const podsBattery = useSelector((state) => state.podsBattery);

  const [userLocation, setUserLocation] = useState([0, 0]);
  const [devicesLocations, setDevicesLocations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setDevicesLocations(generateRandomLocations([position.coords.latitude, position.coords.longitude]));
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
      }
    );
  }, []);

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

  const yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <div className='mt-5 mb-5' style={{ textAlign: 'center' }}>
        <h5>Find your devices</h5>
      </div>
      {!loading && (
        <MapContainer center={userLocation} zoom={12} style={{ height: '400px', width: '100%', marginBottom: "50px" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={userLocation} icon={redIcon}>
            <Popup>Your position</Popup>
          </Marker>
          <Marker position={devicesLocations.phoneLocation} icon={phoneBattery === 0 ? yellowIcon : blueIcon}>
            <Popup>
              {phoneBattery === 0 ? (
                'iPhone - Last seen'
              ) : (
                `iPhone - Battery: ${phoneBattery}%`
              )}
            </Popup>
          </Marker>
          <Marker position={devicesLocations.watchLocation} icon={watchBattery === 0 ? yellowIcon : blueIcon}>
            <Popup>
              {watchBattery === 0 ? (
                'Apple Watch - Last seen'
              ) : (
                `Apple Watch - Battery: ${watchBattery}%`
              )}
            </Popup>
          </Marker>
          <Marker position={devicesLocations.podsLocation} icon={podsBattery === 0 ? yellowIcon : blueIcon}>
            <Popup>
              {podsBattery === 0 ? (
                'AirPods - Last seen'
              ) : (
                `AirPods - Battery: ${podsBattery}%`
              )}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
