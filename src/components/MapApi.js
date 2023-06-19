// src/components/MapApi.js
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

export function initMap() {
  const defaultCoordinates = [-118.1937, 33.7701]; // Long Beach coordinates

  const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/neumad/clj0u2c9b00o601pw61e31wdc',
    center: defaultCoordinates,
    pitch: 0,
    bearing: 0,
    zoom: 12,
  });

  map.on('load', function () {
    map.resize();

    // Load city boundary data
    map.addSource('city-boundaries', {
      type: 'geojson', 
      data: 'https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/county_unemployment/data.geojson',
    });

    // Create a layer to display city boundaries
    map.addLayer({
      id: 'city-boundaries-layer',
      type: 'line',
      source: 'city-boundaries',
      paint: {
        'line-color': '#000',
        'line-width': 1,
      },
    });
  });

  // Get user's current location and set it as the center point
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [position.coords.longitude, position.coords.latitude];
      map.setCenter(userCoordinates);
    });
  }

  return map;
}












// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

// export function initMap() {
//   const map = new mapboxgl.Map({
//     container: 'map-container',
//     style: 'mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d',
//     center: [-77.04, 38.907],
//     zoom: 11.15
//   });
//   return map;
// }
