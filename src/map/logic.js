export const getLocationViaGeolocationApi = () => new Promise((resolve) => navigator.geolocation.getCurrentPosition(resolve));

export const getCitiesViaOverpassApi = (bounds) => {
    const limit = 20;
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const overpassQuery = `[out:json];
      (
        node["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
        way["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
        relation["place"="city"](${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng});
      );
      out center;`;

    return axios.post('https://overpass-api.de/api/interpreter', { data: overpassQuery})
        .then((response) => response.data.elements
            .map((element) => ({name: element.tags.name, population: element.tags.population || 0 }))
            .sort((a, b) => b.population - a.population)
            .slice(0, limit))
        .catch(error => console.log(f`Error fetching cities: ${error}`))
}