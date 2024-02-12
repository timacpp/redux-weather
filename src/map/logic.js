import axios from 'axios';

export const getLocationViaGeolocationApi = () => new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve));

export const getCitiesViaOverpassApi = (bounds) => {
    const limit = 20;
    const southWest = bounds.getSouthWest().wrap();
    const northEast = bounds.getNorthEast().wrap();
    const query = `[out:json];
      (
        node["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
        way["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
        relation["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
      );
      out center;`;

    const mapper = (element) => ({
      name: element.tags["name:en"] || element.tags.name,
      population: element.tags.population,
      position: [element.lat, element.lon]
    });

    return axios.post('https://overpass-api.de/api/interpreter', query)
        .then((response) => response.data.elements
            .map(mapper)
            .filter(a => !a.position.includes(undefined) && a.population &&  /^[\x00-\x7F]*$/.test(a.name))
            .sort((a, b) => b.population - a.population)
            .slice(0, limit) || [])
        .catch(error => console.log(`Error fetching cities: ${error}`))
}

export const NICE_WEATHER = 0;
export const PASSABLE_WEATHER = 1;
export const BAD_WEATHER = 2;

const WEATHER_API_KEY=process.env.REACT_APP_WEATHER_API_KEY;

export const getCityWeatherViaWeatherApi = (cityName) => {
  return axios.post(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(cityName)}&aqi=no`)
        .then(response => ({
          temperature: response.data.current.temp_c,
          rain: response.data.current.precip_mm,
          type: (response.data.current.precip_mm > 0.5) + (response.data.current.temp_c < 18 || response.data.current.temp_c > 25)
        }))
        .catch(error => console.log(`Error fetching weather: ${error}`))
}