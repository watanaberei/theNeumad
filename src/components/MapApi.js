// src/components/MapApi.js
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

export function initMap() {
  const defaultCoordinates = [-118.1937, 33.7701]; // Long Beach coordinates

  const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d',
    center: defaultCoordinates,
    pitch: 0,
    bearing: 41,
    zoom: 12,
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
