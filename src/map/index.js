import React from 'react';
import L from 'leaflet'
import twemoji from 'twemoji';

import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { userLocationSelector, citiesSelector } from './selectors';
import { initializeUserLocation, getLargestCitiesInBounds } from './reducer';

const CityMarkers = () => {
  const dispatch = useDispatch();
  const cities = useSelector(citiesSelector);
  const map = useMapEvents({
    moveend() {
      const bounds = map.getBounds();
      dispatch(getLargestCitiesInBounds(bounds));
    },
  });

  const emojiImg = twemoji.parse('\u2764\uFE0F', { size: 16 });
  const icon = L.divIcon({ html: emojiImg });

  return cities.map((city, id) => (
    <Marker key={`city-${id}`} position={city.position} icon={icon}>
        <Tooltip>{city.name}</Tooltip>
    </Marker>
  ));
}


export const Map = () => {
    const dispatch = useDispatch();
    const userLocation = useSelector(userLocationSelector);
    const cities = useSelector(citiesSelector);
    
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

          <CityMarkers cities={cities}/>

        </MapContainer>
    );
}
