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
          <input id="search-input" type="text" placeholder="Search Stores">
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
    document.getElementById('search-input').appendChild(geocoder.onAdd(map));

    // Listen for the 'results' event and log the result
    geocoder.on('results', function (results) {
      console.log(results);
    });

    if (features && features.length > 0) {
      // Get user's current location and sort listings based on location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userCoordinates = [position.coords.longitude, position.coords.latitude];
          features.sort((a, b) => {
            const distanceA = getDistance(userCoordinates, a.geometry.coordinates);
            const distanceB = getDistance(userCoordinates, b.geometry.coordinates);
            return distanceA - distanceB;
          });

          renderFeatures(features, map);
        });
      } else {
        renderFeatures(features, map);
      }
    } else {
      console.error('No features found for the map');
    }
  },
};

function renderFeatures(features, map) {
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
      `)

    .addTo(map);
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
//     <div class="map-container">
//       <div class="sidebar">
//         <div class="heading">
//           <span class="header01">Nearby Stores</span>
//           <div id="geocoder"></div>
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
//         map.resize();
//     });
//     const { features } = await geojsonStore();
//     const geocoder = createGeocoderInput(features);
//     document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
//     geocoder.on('result', function(result) {
//       console.log(result);
//       flyToStore(result.result, map);
//       createPopUp(result.result, map);
//     });
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
//   const popup = new mapboxgl.Popup({ closeOnClick: true,  offset: 50 })
//     .setLngLat(store.geometry.coordinates)
//     .setHTML(`
//       <div class="title">
//         <span class="header03">${store.properties.headline}</span>
//       </div>
//       <div class="subtitle">
//         <span class="text01">${store.properties.address}</span>
//       </div>
//       <a href="/#/${store.properties.category}/${store.properties.slug}">Read More</a>
//       `)

//     .addTo(map);
// }

// export default MapScreen;
















// import { initMap } from '../components/MapApi';
// import { geojsonStore } from '../components/GeojsonStores';
// import { createMapMarker } from '../components/MapMarker';
// import { createGeojsonListing } from '../components/GeojsonListing';

// const MapScreen = {
//   render: () => {
//     return `
//     <div class="mapContainer">
//       <div class="sidebar">
//         <div class="heading">
//           <h1>Nearby Stores</h1>
//           <input id="search-input" type="text" placeholder="Search Stores">
//           <button id="search-button">Go</button>
//         </div>
//         <div id="listings" class="listings"></div>
//       </div>
//       <div id="map-container" class="map"></div>
//       </div>
//     `;
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
//     .setHTML(`<h3>${store.properties.title}</h3><p>${store.properties.address}</p>`)
//     .addTo(map);
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






