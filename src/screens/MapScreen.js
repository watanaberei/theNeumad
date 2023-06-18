// src/screens/MapScreen.js
import mapboxgl from 'mapbox-gl';
import { initMap } from '../components/MapApi';
import { geojsonStore } from '../components/GeojsonStores';
import { createMapMarker } from '../components/MapMarker';
import { createGeojsonListing } from '../components/GeojsonListing';
import { createGeocoderInput } from '../components/GeocoderInput';

const MapScreen = {
  render: () => {
    return `
    <div class= "map-container">
      <div class="sidebar">
        <div class="heading">
          <span class="header01">Nearby Stores</span>
          <div id="geocoder-container"></div>
        </div>
        <div id="listings" class="listings"></div>
      </div>
      <div id="map-container" class="map"></div>
    </div>
  `;
  },

  after_render: async () => {
    const map = initMap();
    map.on('load', function () {
      map.resize();
    });
    const { features } = await geojsonStore();

    const geocoder = createGeocoderInput(features);
    document.getElementById('geocoder-container').appendChild(geocoder.onAdd(map));

    // Listen for the 'result' event and fit the map to the selected location's boundaries
    geocoder.on('result', function (result) {
      if (result.result.bbox) {
        map.fitBounds(result.result.bbox, { padding: 50 });

        // Check for land features within the bounding box
        const landFeatures = map.queryRenderedFeatures(result.result.bbox, {
          layers: ['land'],
        });

        // If there are no land features, fall back to the flyToStore method
        if (landFeatures.length === 0) {
          const store = {
            geometry: {
              coordinates: result.result.geometry.coordinates,
            },
          };
          flyToSearch(store, map);
        }
      } else {
        const store = {
          geometry: {
            coordinates: result.result.geometry.coordinates,
          },
        };
        flyToSearch(store, map);
      }
    });

    map.on('moveend', function() {
      const mapBounds = map.getBounds();
      const center = map.getCenter();
      const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
      const sortedFeatures = sortFeaturesByDistance(filteredFeatures, center);
      renderFeatures(sortedFeatures, map);
    });

    setCurrentLocation(map, features);
  },
};

function setCurrentLocation(map, features) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [position.coords.longitude, position.coords.latitude];
      const userLocationMarker = createUserLocationMarker(userCoordinates, map);

      const mapBounds = map.getBounds();
      const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
      const sortedFeatures = sortFeaturesByDistance(filteredFeatures, userCoordinates);
      renderFeatures(sortedFeatures, map);

      zoomToShowAtLeastThreePins(map, features, userCoordinates);
    });
  } else {
    renderFeatures(features, map);
  }
}

function filterFeaturesInBounds(features, bounds) {
  return features.filter((feature) => {
    const coordinates = feature.geometry.coordinates;
    return bounds.contains(coordinates);
  });
}

function sortFeaturesByDistance(features, center) {
  return features.sort((a, b) => {
    const distanceA = getDistance(center, a.geometry.coordinates);
    const distanceB = getDistance(center, b.geometry.coordinates);
    return distanceA - distanceB;
  });
}

function renderFeatures(features, map) {
  document.getElementById('listings').innerHTML = '';
  features.forEach((store) => {
    const onClick = (store) => {
      flyToStore(store, map);
      createPopUp(store, map);
    };

    const marker = createMapMarker(store, map, onClick);
    const listing = createGeojsonListing(store, onClick);

    document.getElementById('listings').appendChild(listing);
  });
}

function flyToStore(store, map) {
  map.flyTo({
    center: store.geometry.coordinates,
    zoom: 15,
    pitch: 80,
    bearing: 41,
    essential: true,
  });

  map.once('moveend', () => {
    map.on('move', () => {
      const pitch = map.getPitch();
      const bearing = map.getBearing();

      if (pitch > 0) {
        map.setPitch(pitch - 1);
      }

      if (bearing !== 0) {
        map.setBearing(bearing - 1);
      }
    });
  });
}


function flyToSearch(store, map) {
  map.flyTo({
    center: store.geometry.coordinates,
    zoom: 15,
    essential: true,
  });
}




function createPopUp(store, map) {
  const popup = new mapboxgl.Popup({ closeOnClick: true, offset: 50 })
    .setLngLat(store.geometry.coordinates)
    .setHTML(`
      <div class="title">
        <span class="header03">${store.properties.headline}</span>
      </div>
      <div class="subtitle">
        <span class="text01">${store.properties.address}</span>
      </div>
      <div class="subtitle">
      <i class="icon-${store.properties.category}"></i>
        <span class="text01">${store.properties.category}</span>
      </div>
      `)

    .addTo(map);
}

function createUserLocationMarker(coordinates, map) {
  const marker = document.createElement('div');
  marker.className = 'marker-userLocation';

  return new mapboxgl.Marker(marker)
    .setLngLat(coordinates)
    .addTo(map);
}

function zoomToShowAtLeastThreePins(map, features, center) {
  const zoomOut = () => {
    const mapBounds = map.getBounds();
    const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
    if (filteredFeatures.length < 3) {
      map.zoomOut(1, { around: center });
      setTimeout(zoomOut, 100);
    }
  };

  zoomOut();
}

// Helper function to calculate distance between two coordinates
function getDistance(coord1, coord2) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const R = 6371e3; // Earth's radius in meters
  const lat1 = toRadians(coord1[1]);
  const lat2 = toRadians(coord2[1]);
  const deltaLat = toRadians(coord2[1] - coord1[1]);
  const deltaLng = toRadians(coord2[0] - coord1[0]);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default MapScreen;




















// // src/screens/MapScreen.js
// import mapboxgl from 'mapbox-gl';
// import { initMap } from '../components/MapApi';
// import { geojsonStore } from '../components/GeojsonStores';
// import { createMapMarker } from '../components/MapMarker';
// import { createGeojsonListing } from '../components/GeojsonListing';
// import { createGeocoderInput } from '../components/GeocoderInput';

// const MapScreen = {
//   render: () => {
//     return `
//     <div class= "map-container">
//       <div class="sidebar">
//         <div class="heading">
//           <span class="header01">Nearby Stores</span>
//           <div id="geocoder-container"></div>
//         </div>
//         <div id="listings" class="listings"></div>
//       </div>
//       <div id="map-container" class="map"></div>
//     </div>
//   `;
//   },

//   after_render: async () => {
//     const map = initMap();
//     map.on('load', function () {
//       map.resize();
//     });
//     map.on('style.load', () => {
//       map.addSource('mapbox-dem', {
//       'type': 'raster-dem',
//       'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//       'tileSize': 512,
//       'maxzoom': 14
//       });
//       // add the DEM source as a terrain layer with exaggerated height
//       map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
//       });
//     const { features } = await geojsonStore();

//     const geocoder = createGeocoderInput(features);
//     document.getElementById('geocoder-container').appendChild(geocoder.onAdd(map));

//     // Listen for the 'results' event and log the result
//     geocoder.on('results', function (results) {
//       console.log(results);
//       if (results.query[0].toLowerCase() === 'current location') {
//         setCurrentLocation(map, features);
//       }
//     });

//     // map.on('style.load', () => {
//     //   map.addSource('mapbox-dem', {
//     //   'type': 'raster-dem',
//     //   'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//     //   'tileSize': 512,
//     //   'maxzoom': 14
//     //   });
//     //   // add the DEM source as a terrain layer with exaggerated height
//     //   map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
//     // });

//     map.on('moveend', function() {
//       const mapBounds = map.getBounds();
//       const center = map.getCenter();
//       const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
//       const sortedFeatures = sortFeaturesByDistance(filteredFeatures, center);
//       renderFeatures(sortedFeatures, map);
//     });

//     setCurrentLocation(map, features);
//   },
// };

// function setCurrentLocation(map, features) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const userCoordinates = [position.coords.longitude, position.coords.latitude];
//       const userLocationMarker = createUserLocationMarker(userCoordinates, map);

//       const mapBounds = map.getBounds();
//       const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
//       const sortedFeatures = sortFeaturesByDistance(filteredFeatures, userCoordinates);
//       renderFeatures(sortedFeatures, map);
//     });
//   } else {
//     renderFeatures(features, map);
//   }
// }

// function filterFeaturesInBounds(features, bounds) {
//   return features.filter((feature) => {
//     const coordinates = feature.geometry.coordinates;
//     return bounds.contains(coordinates);
//   });
// }

// function sortFeaturesByDistance(features, center) {
//   return features.sort((a, b) => {
//     const distanceA = getDistance(center, a.geometry.coordinates);
//     const distanceB = getDistance(center, b.geometry.coordinates);
//     return distanceA - distanceB;
//   });
// }

// function renderFeatures(features, map) {
//   document.getElementById('listings').innerHTML = '';
//   features.forEach((store) => {
//     const onClick = (store) => {
//       flyToStore(store, map);
//       createPopUp(store, map);
//     };

//     const marker = createMapMarker(store, map, onClick);
//     const listing = createGeojsonListing(store, onClick);

//     document.getElementById('listings').appendChild(listing);
//   });
// }

// function flyToStore(store, map) {
//   map.flyTo({
//     center: store.geometry.coordinates,
//     zoom: 15,
//     essential: true,
//   });
// }

// function createPopUp(store, map) {
//   const popup = new mapboxgl.Popup({ closeOnClick: true, offset: 50 })
//     .setLngLat(store.geometry.coordinates)
//     .setHTML(`
//       <div class="title">
//         <span class="header03">${store.properties.headline}</span>
//       </div>
//       <div class="subtitle">
//         <span class="text01">${store.properties.address}</span>
//       </div>
//       `)

//     .addTo(map);
// }

// function createUserLocationMarker(coordinates, map) {
//   const marker = document.createElement('div');
//   marker.className = 'marker-userLocation';

//   return new mapboxgl.Marker(marker)
//     .setLngLat(coordinates)
//     .addTo(map);
// }

// // Helper function to calculate distance between two coordinates
// function getDistance(coord1, coord2) {
//   const toRadians = (degrees) => degrees * (Math.PI / 180);

//   const R = 6371e3; // Earth's radius in meters
//   const lat1 = toRadians(coord1[1]);
//   const lat2 = toRadians(coord2[1]);
//   const deltaLat = toRadians(coord2[1] - coord1[1]);
//   const deltaLng = toRadians(coord2[0] - coord1[0]);

//   const a =
//     Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
//     Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// }

// export default MapScreen;











// src/screens/MapScreen.js
// import mapboxgl from 'mapbox-gl';
// import { initMap } from '../components/MapApi';
// import { geojsonStore } from '../components/GeojsonStores';
// import { createMapMarker } from '../components/MapMarker';
// import { createGeojsonListing } from '../components/GeojsonListing';


// const MapScreen = {
//   render: () => {
//     return `
//     <div class="sidebar">
//       <div class="heading">
//         <h1>Nearby Stores</h1>
//         <input id="search-input" type="text" placeholder="Search Stores">
//         <button id="search-button">Go</button>
//       </div>
//       <div id="listings" class="listings"></div>
//     </div>
//     <div id="map-container" class="map"></div>
//   `;
//   },

//   after_render: async () => {
//     const map = initMap();

//     const { features } = await geojsonStore();

//     if (features && features.length > 0) {
//       features.forEach(store => {
//         const onClick = (store) => {
//           flyToStore(store, map);
//           createPopUp(store, map);
//         };

//         const marker = createMapMarker(store, map, onClick);
//         const listing = createGeojsonListing(store, onClick);

//         document.getElementById('listings').appendChild(listing);
//       });
//     } else {
//       console.error('No features found for the map');
//     }
//   },
// };

// function flyToStore(store, map) {
//   map.flyTo({
//     center: store.geometry.coordinates,
//     zoom: 15,
//     essential: true,
//   });
// }

// function createPopUp(store, map) {
//   const popup = new mapboxgl.Popup({ closeOnClick: true })
//     .setLngLat(store.geometry.coordinates)
//     .setHTML(`
//     <div class="title">
//       <span class="header03">${store.properties.headline}</span>
//     </div>
//     <div class="subtitle">
//       <span class="text01">${store.properties.address}</span>
//     </div>
//       `)
//     .addTo(map);
// }

// export default MapScreen;






