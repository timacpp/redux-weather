import React from 'react';
import L from 'leaflet'
import twemoji from 'twemoji';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { ThemeProvider } from 'styled-components';
import 'leaflet/dist/leaflet.css';

import { MapContainerWrapper, darkTheme, lightTheme } from './themes';
import { userLocationSelector, citiesSelector, versionSelector, darkModeSelector } from './selectors';
import { initializeUserLocation, getLargestCitiesInBounds, incrementVersion, invertMode } from './reducer';

const CityMarkers = () => {
  const dispatch = useDispatch();
  const cities = useSelector(citiesSelector);

  const getCities = (map) => dispatch(getLargestCitiesInBounds(map.getBounds()));
  const map = useMapEvents({
    moveend() {
      getCities(map);
    },
    zoomlevelschange() {
      getCities(map);
    },
    load() {
      getCities(map);
    }
  });

  return cities.map((city) => (
    <Marker key={city.name} position={city.position} icon={L.divIcon({ html: twemoji.parse(city.emoji, { size: 16 })})}>
          <Popup>
            <b>{city.name}</b><br/><br/>
            Temperature: {city.temperature}<br/>
            Precipation: {city.rain}<br/>
            </Popup>
      </Marker>
  ));
}


export const Map = () => {
    const dispatch = useDispatch();
    const userLocation = useSelector(userLocationSelector);
    const cities = useSelector(citiesSelector);
    const version = useSelector(versionSelector);
    const darkMode = useSelector(darkModeSelector);

    return (
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <MapContainerWrapper>
              <MapContainer
                key={version}
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
            </MapContainerWrapper>
            <button onClick={() => dispatch(incrementVersion())}>
                Recenter
            </button>
            <button onClick={() => dispatch(invertMode())}>
                {darkMode ? "Light mode" : "Dark mode"}
            </button>
          </ThemeProvider>
    );
}
