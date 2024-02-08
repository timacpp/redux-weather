import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userLocationSelector, citiesSelector } from '../../game-logic/selectors';
import { initializeUserLocation, getCitiesInRadius } from '../../game-logic/reducer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
    const userLocation = useSelector(userLocationSelector);
    const cities = useSelector(citiesSelector);

    const dispatch = useDispatch();

    return (
        <MapContainer
          key={userLocation}
          center={userLocation}
          zoom={7}
          style={{ height: '400px', width: '100%' }}
          whenReady={() => dispatch(initializeUserLocation())}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
        </MapContainer>
    );
}
