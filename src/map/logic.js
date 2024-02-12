import axios from 'axios'; 

export const getLocationViaGeolocationApi = () => new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve));

export const getCitiesViaOverpassApi = (bounds) => {
    const limit = 20;
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const query = `[out:json];
      (
        node["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
        way["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
        relation["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
      );
      out center;`;

    const mapper = (element) => ({
      name: element.tags.name,
      population: element.tags.population || 0,
      position: [element.lat, element.lon]
    });

    return axios.post('https://overpass-api.de/api/interpreter', query)
        .then((response) => response.data.elements
            .filter(element => element.lat && element.lon)
            .map(mapper)
            .sort((a, b) => b.population - a.population)
            .slice(0, limit))
        .catch(error => console.log(`Error fetching cities: ${error}`))
}