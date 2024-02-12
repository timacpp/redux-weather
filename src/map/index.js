import React from 'react';
import L from 'leaflet'
import twemoji from 'twemoji';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { ThemeProvider } from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
            Pressure mm: {city.pressure}<br/>
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
            <LineChart width={500} height={300} data={cities}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
              <Line type="monotone" dataKey="pressure" stroke="#82ca9d" />
              <Line type="monotone" dataKey="emoji" stroke="#82ca9d" />
            </LineChart>
          </ThemeProvider>
          
    );
}
