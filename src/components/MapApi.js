// src/component/MapApi.js
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

export function initMap() {
  const map = new mapboxgl.Map({
    container: 'map-container',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-77.04, 38.907],
    zoom: 11.15
  });
  return map;
}

// mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';
// const MapApi = {
//   initMap: () => {
//     const map = new mapboxgl.Map({
//       container: 'map-container',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-118.1937, 33.7701], // default coordinates
//       zoom: 12 // default zoom level
//     });
//     const markers = [];
//     const listings =  [];
//     return { map, markers, listings };
//   },

//   addMarker: (lngLat) => {
//     new mapboxgl.Marker()
//       .setLngLat(lngLat)
//       .addTo(MapApi.map);
//   },

//   addPopup: (lngLat, text) => {
//     new mapboxgl.Popup()
//       .setLngLat(lngLat)
//       .setHTML(text)
//       .addTo(MapApi.map);
//   },

//   buildLocationList(stores, listingsContainer) {
//     stores.forEach((store) => {
//       const { properties } = store;
//       const { id, address, city, phoneFormatted, distance } = properties;
  
//       /* Add a new listing section to the sidebar. */
//       const listing = document.createElement('div');
//       const link = document.createElement('a');
//       const details = document.createElement('div');
  
//       /* Assign a unique `id` to the listing. */
//       listing.id = `listing-${id}`;
//       /* Assign the `item` class to each listing for styling. */
//       listing.className = 'item';
  
//       /* Add the link to the individual listing created above. */
//       link.href = '#';
//       link.className = 'title';
//       link.id = `link-${id}`;
//       link.innerHTML = `${address}`;
  
//       /* Add details to the individual listing. */
//       details.innerHTML = `${city}`;
//       if (phoneFormatted) {
//         details.innerHTML += ` · ${phoneFormatted}`;
//       }
//       if (distance) {
//         const roundedDistance = Math.round(distance * 100) / 100;
//         details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
//       }
  
//       /* Append the link and details to the listing. */
//       listing.appendChild(link);
//       listing.appendChild(details);
  
//       /* Add the listing to the listings container. */
//       listingsContainer.appendChild(listing);
  
//       /* Add a click event listener to the link that pans to the corresponding marker. */
//       link.addEventListener('click', () => {
//         const marker = markers.find((m) => m.getElement().dataset.id === id);
//         map.flyTo({ center: marker.getLngLat(), zoom: 16 });
//         marker.togglePopup();
//       });
//     });
//   },

//   geolocate: () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         const { longitude, latitude } = position.coords;
//         MapApi.map.flyTo({ center: [longitude, latitude], zoom: 15 });
//       });
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   },

//   addListing: (stores) => {
//     buildLocationList(stores);
//   }

  
// };

// export default MapApi;



















// import GeopostReviews from './GeopostReviews';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import { geojsonStore } from './GeojsonStores.js';
// import { getArticleNeumadsTrail } from "../api.js";
// import * as turf from '@turf/turf';
// import Marker from './MapMarker.js';

// mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

// const MapApi = async () => {
//   let map; 

//   const initMap = async () => {    
//     const stores = await getArticleNeumadsTrail();
//     const geojson = await geojsonStore(stores);

//     map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-96, 37.8],
//       zoom: 3
//     });

//     map.on('load', () => {
//       map.addSource('places', {
//         type: 'geojson',
//         data: geojson // use geojson data here
//       });
  
//       if (geojson.features) {
//         geojson.features.forEach(feature => {
//           new mapboxgl.Marker()  // no argument needed here, default style will be used
//   .setLngLat(feature.geometry.coordinates)
//   .addTo(map);
//         });
//       } else {
//         console.error('geojson.features is undefined');
//       }
//     });
//   };

//   await initMap();
  
//   return {
//     map,
//     initMap // Expose 'initMap' function
//   };
// };

// export default MapApi;
























// // src/component/MapApi.js
// import GeopostReviews from './GeopostReviews';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import { geojsonStore } from './GeojsonStores.js';
// import * as turf from '@turf/turf';
// // import { getStoresNeumadsReview, getArticleNeumadsTrail } from '../api.js';
// // import { getStores } from './GeopostStore.js';
// // import geojsonStoreData from './geojsonStore';
// // import Marker from './Marker';

// import aStore from './GeojsonStores.js';
// import Marker from './MapMarker.js';
// geojsonStore().then(geojsonStore => console.log("geojsonStore", geojsonStore));
// console.log("geojsonStore",geojsonStore);
// mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

// const MapApi = () => {
//   function initMap() {
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-96, 37.8],
//       zoom: 3
//     });
  
//     map.on('load', () => {
//       map.addSource('places', {
//         type: 'geojsonStore',
//         data: geojsonStore
//       });
  
//       geojsonStore.features.forEach(feature => {
//         const marker = new Marker(feature);
//         new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).addTo(map);
//       });
//     });
//   }
  
//   initMap();
  
//   return {
//     initMap
//   };
// };

// export default MapApi;





























// import GeopostReviews from './GeopostReviews';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import * as turf from '@turf/turf';
// import { getStoresNeumadsReview, getArticleNeumadsTrail } from '../api.js';
// import { getStores } from './GeopostStore.js';
// import geojsonStoreData from './geojsonStore';
// import Marker from './Marker';



// mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

// const MapApi = () => {
//   let map = null;
//   let geopostReviews = new GeopostReviews();
//   let stores = getStores;

//   console.log("stores:",stores)

  

//   const initializeMap = async () => {
//     stores = await geopostReviews.getStoreData();
//     map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d',
//       center: [-33.034084142948, 38.909671288923],
//       zoom:4,
//       scrollZoom: true
//     });
  
//     map.on('load', () => {
//       map.addSource('places', {
//         type: 'geojsonStore',
//         data: stores
//       });

//       const geocoder = new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken, 
//         mapboxgl: mapboxgl,
//         marker: true,
//         bbox: [-77.210763, 38.803367, -76.853675, 39.052643] 
//       });

//       map.addControl(geocoder, 'top-left');

//       addMarkers();
//       buildLocationList(stores);
//     });
//   };

//   for (const feature of geojsonStore.features) {
//     // create a HTML element for each feature
//     const el = document.createElement('div');
//     el.className = 'marker';
//     el.id = `marker-${marker.properties.id}`;
//       el.className = 'marker';
//       console.log("marker",marker);
  
//     // make a marker for each feature and add to the map
//     new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
//   }  

//    buildLocationList(stores) {
//     for (const store of stores.features) {
//       /* Add a new listing section to the sidebar. */
//       const listings = document.getElementById('listings');
//       const listing = listings.appendChild(document.createElement('div'));
//       /* Assign a unique `id` to the listing. */
//       listing.id = `listing-${store.properties.id}`;
//       /* Assign the `item` class to each listing for styling. */
//       listing.className = 'item';

//       /* Add the link to the individual listing created above. */
//       const link = listing.appendChild(document.createElement('a'));
//       link.href = '#';
//       link.className = 'title';
//       link.id = `link-${store.properties.id}`;
//       link.innerHTML = `${store.properties.address}`;

//       /* Add details to the individual listing. */
//       const details = listing.appendChild(document.createElement('div'));
//       details.innerHTML = `${store.properties.city}`;
//       if (store.properties.phone) {
//         details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
//       }
//       if (store.properties.distance) {
//         const roundedDistance =
//           Math.round(store.properties.distance * 100) / 100;
//         details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
//       }

//       /**
//        * Listen to the element and when it is clicked, do four things:
//        * 1. Update the `currentFeature` to the store associated with the clicked link
//        * 2. Fly to the point
//        * 3. Close all other popups and display popup for clicked store
//        * 4. Highlight listing in sidebar (and remove highlight for all other listings)
//        **/
//       link.addEventListener('click', function () {
//         for (const feature of stores.features) {
//           if (this.id === `link-${feature.properties.id}`) {
//             flyToStore(feature);
//             createPopUp(feature);
//           }
//         }
//         const activeItem = document.getElementsByClassName('active');
//         if (activeItem[0]) {
//           activeItem[0].classList.remove('active');
//         }
//         this.parentNode.classList.add('active');
//       });
//     }
//   }

//   const flyToStore = (store) => {
//     this.map.flyTo({
//       center: store.location.geolocation.coordinates,
//       zoom: 15
//     });
//     console.log("flyTo",flyTo);
//   }

//   const createPopUp = (store) => {
//     const popUps = document.getElementsByClassName('mapboxgl-popup');
//     if (popUps[0]) popUps[0].remove();

//     const popup = new mapboxgl.Popup({ closeOnClick: false })
//       .setLngLat(store.geolocation.coordinates)
//       .setHTML(`<h3>${store.properties.name}</h3><h4>${store.properties.address}</h4>`)
//       .addTo(this.map);
//   }

//   const calculateDistance = () => {
//     const items = Array.from(document.getElementsByClassName('item'));

//     if (items) {
//       const activeItem = items.filter(item => item.classList.contains('active'))[0];
//       const coordinates = activeItem ? activeItem.dataset.coordinates.split(',') : null;

//       if (coordinates) {
//         const active = turf.point([parseFloat(coordinates[0]), parseFloat(coordinates[1])]);
//         const options = {units: 'miles'};

//         this.stores.location.forEach((store) => {
//           const target = turf.point(store.geolocation.coordinates);
//           const distance = turf.distance(target, active, options);
//           store.properties.distance = distance.toFixed(2);
//         });

//         this.stores.location.sort((a, b) => a.properties.distance - b.properties.distance);
//         this.buildLocationList(this.stores);
//       }
//     }
//   }
  
//   return {
//     initializeMap,
//     addMarkers,
//     buildLocationList,
//     flyToStore,
//     createPopUp,
//     calculateDistance
//   };
// };

// export default MapApi;















// class MapApi {
//   constructor() {
//     mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww';
//     var map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d',
//       center: [-77.034084142948, 38.909671288923],
//       zoom: 13,
//       scrollZoom: false
//     });
//     console.log("Map initialized."); // Add logging

//     const stores = {
//       "type": "FeatureCollection",
//       "location": [
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.034084142948,
//               38.909671288923
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(202) 234-7336",
//             "phone": "2022347336",
//             "address": "1471 P St NW",
//             "city": "Washington DC",
//             "country": "United States",
//             "crossStreet": "at 15th St NW",
//             "postalCode": "20005",
//             "state": "D.C."
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.049766,
//               38.900772
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(202) 507-8357",
//             "phone": "2025078357",
//             "address": "2221 I St NW",
//             "city": "Washington DC",
//             "country": "United States",
//             "crossStreet": "at 22nd St NW",
//             "postalCode": "20037",
//             "state": "D.C."
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.043929,
//               38.910525
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(202) 387-9338",
//             "phone": "2023879338",
//             "address": "1512 Connecticut Ave NW",
//             "city": "Washington DC",
//             "country": "United States",
//             "crossStreet": "at Dupont Circle",
//             "postalCode": "20036",
//             "state": "D.C."
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.0672,
//               38.90516896
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(202) 337-9338",
//             "phone": "2023379338",
//             "address": "3333 M St NW",
//             "city": "Washington DC",
//             "country": "United States",
//             "crossStreet": "at 34th St NW",
//             "postalCode": "20007",
//             "state": "D.C."
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.002583742142,
//               38.887041080933
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(202) 547-9338",
//             "phone": "2025479338",
//             "address": "221 Pennsylvania Ave SE",
//             "city": "Washington DC",
//             "country": "United States",
//             "crossStreet": "btwn 2nd & 3rd Sts. SE",
//             "postalCode": "20003",
//             "state": "D.C."
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -76.933492720127,
//               38.99225245786
//             ]
//           },
//           "properties": {
//             "address": "8204 Baltimore Ave",
//             "city": "College Park",
//             "country": "United States",
//             "postalCode": "20740",
//             "state": "MD"
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.097083330154,
//               38.980979
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(301) 654-7336",
//             "phone": "3016547336",
//             "address": "4831 Bethesda Ave",
//             "cc": "US",
//             "city": "Bethesda",
//             "country": "United States",
//             "postalCode": "20814",
//             "state": "MD"
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.359425054188,
//               38.958058116661
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(571) 203-0082",
//             "phone": "5712030082",
//             "address": "11935 Democracy Dr",
//             "city": "Reston",
//             "country": "United States",
//             "crossStreet": "btw Explorer & Library",
//             "postalCode": "20190",
//             "state": "VA"
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.10853099823,
//               38.880100922392
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(703) 522-2016",
//             "phone": "7035222016",
//             "address": "4075 Wilson Blvd",
//             "city": "Arlington",
//             "country": "United States",
//             "crossStreet": "at N Randolph St.",
//             "postalCode": "22203",
//             "state": "VA"
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -75.28784,
//               40.008008
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(610) 642-9400",
//             "phone": "6106429400",
//             "address": "68 Coulter Ave",
//             "city": "Ardmore",
//             "country": "United States",
//             "postalCode": "19003",
//             "state": "PA"
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -75.20121216774,
//               39.954030175164
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(215) 386-1365",
//             "phone": "2153861365",
//             "address": "3925 Walnut St",
//             "city": "Philadelphia",
//             "country": "United States",
//             "postalCode": "19104",
//             "state": "PA"
//           }
//         },
//         {
//           "type": "Feature",
//           "geolocation": {
//             "type": "Point",
//             "coordinates": [
//               -77.043959498405,
//               38.903883387232
//             ]
//           },
//           "properties": {
//             "phoneFormatted": "(202) 331-3355",
//             "phone": "2023313355",
//             "address": "1901 L St. NW",
//             "city": "Washington DC",
//             "country": "United States",
//             "crossStreet": "at 19th St",
//             "postalCode": "20036",
//             "state": "D.C."
//           }
//         }
//       ]
//     };
  
    
//     /* Assign a unique ID to each store */
//     stores.location.forEach(function (store, i) {
//       store.properties.id = i;
//     });

//     console.log("stores:", stores);

//     // MAP
//     map.on('load', () => {
//       /* Add the data to your map as a layer */

//       // ADD GENERIC MARKERS
//       // map.addLayer({
//       //   id: 'locations',
//       //   type: 'circle',
//       //   /* Add a GeoJSON source containing place coordinates and information. */
//       //   source: {
//       //     type: 'geojsonStore',
//       //     data: stores
//       //   }
//       // });
//       // ADD GENERIC MARKERS

//       // ADD CUSTOM MARKERS
//       map.addSource('places', {
//         type: 'geojsonStore',
//         data: stores
        
//       });

//       // GEOCODER CONTROLS
//       const geocoder = new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken, // Set the access token
//         mapboxgl: mapboxgl, // Set the mapbox-gl instance
//         marker: true, // Use the geocoder's default marker style
//         bbox: [-77.210763, 38.803367, -76.853675, 39.052643] // Set the bounding box coordinates
//       });
//       // GEOCODER CONTROLS


      
//       map.addControl(geocoder, 'top-left');

//       addMarkers();
//       // ADD CUSTOM MARKERS

//       // BUILD STORELIST
//       buildLocationList(stores);
//       // BUILD STORELIST

//       // GEOCODER LISTENER
//       geocoder.on('result', (event) => {
//         const searchResult = event.result.geolocation;
//         const options = { units: 'miles' };
//         for (const store of stores.location) {
//           store.properties.distance = turf.distance(
//             searchResult,
//             store.geolocation,
//             options
//           );
//         }
//         stores.location.sort((a, b) => {
//           if (a.properties.distance > b.properties.distance) {
//             return 1;
//           }
//           if (a.properties.distance < b.properties.distance) {
//             return -1;
//           }
//           return 0; // a must be equal to b
//         });
//         // Code for the next step will go here
//       });
//       // GEOCODER LISTENER
//     });
//     // MAP

//     // CLICK ON MAP
//     // map.on('click', (event) => {
//     //   /* Determine if a feature in the "locations" layer exists at that point. */
//     //   const location = map.queryRenderedFeatures(event.point, {
//     //     layers: ['locations']
//     //   });
    
//     //   /* If it does not exist, return */
//     //   if (!location.length) return;
    
//     //   const clickedPoint = location[0];
    
//     //   /* Fly to the point */
//     //   flyToStore(clickedPoint);
    
//     //   /* Close all other popups and display popup for clicked store */
//     //   createPopUp(clickedPoint);
    
//     //   /* Highlight listing in sidebar (and remove highlight for all other listings) */
//     //   const activeItem = document.getElementsByClassName('active');
//     //   if (activeItem[0]) {
//     //     activeItem[0].classList.remove('active');
//     //   }
//     //   const listing = document.getElementById(
//     //     `listing-${clickedPoint.properties.id}`
//     //   );
//     //   listing.classList.add('active');
//     // });
//     // CLICK ON MAP


//     function addMarkers() {
//       /* For each feature in the GeoJSON object above: */
//       for (const marker of stores.location) {
//         /* Create a div element for the marker. */
//         const el = document.createElement('div');
//         /* Assign a unique `id` to the marker. */
//         el.id = `marker-${marker.properties.id}`;
//         /* Assign the `marker` class to each marker for styling. */
//         el.className = 'marker';

//         el.addEventListener('click', (e) => {
//           /* Fly to the point */
//           flyToStore(marker);
//           /* Close all other popups and display popup for clicked store */
//           createPopUp(marker);
//           /* Highlight listing in sidebar */
//           const activeItem = document.getElementsByClassName('active');
//           e.stopPropagation();
//           if (activeItem[0]) {
//             activeItem[0].classList.remove('active');
//           }
//           const listing = document.getElementById(`listing-${marker.properties.id}`);
//           listing.classList.add('active');
//         });
    
//         /**
//          * Create a marker using the div element
//          * defined above and add it to the map.
//          **/
//         new mapboxgl.Marker(el, { offset: [12, 12] })
//           .setLngLat(marker.geolocation.coordinates)
//           .addTo(map);
//       }
//     }
    

//     // STORELIST
//     function buildLocationList(stores) {
//       for (const store of stores.location) {
//         /* Add a new listing section to the sidebar. */

//         const listings = document.getElementById('listings');
//         while (listings.firstChild) {
//           listings.removeChild(listings.firstChild);
//         }
//         buildLocationList(stores);
        
//         /* Assign a unique `id` to the listing. */
//         listing.id = `listing-${store.properties.id}`;
//         /* Assign the `item` class to each listing for styling. */
//         listing.className = 'item';
    
        
//         /* Add the link to the individual listing created above. */
//         const link = listing.appendChild(document.createElement('a'));
//         link.href = '#';
//         link.className = 'title';
//         link.id = `link-${store.properties.id}`;
//         link.innerHTML = `${store.properties.address}`;
        
//         if (store.properties.distance) {
//           const roundedDistance = Math.round(store.properties.distance * 100) / 100;
//           details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
//         }
    
//         // LISTENS FOR CLICK ON LIST
//         link.addEventListener('click', function () {
//           for (const feature of stores.location) {
//             if (this.id === `link-${feature.properties.id}`) {
//               flyToStore(feature);
//               createPopUp(feature);
//             }
//           }
//           const activeItem = document.getElementsByClassName('active');
//           if (activeItem[0]) {
//             activeItem[0].classList.remove('active');
//           }
//           this.parentNode.classList.add('active');
//         });
//         // LISTENS FOR CLICK ON LIST

//         /* Add details to the individual listing. */
//         const details = listing.appendChild(document.createElement('div'));
//         details.innerHTML = `${store.properties.city}`;
//         if (store.properties.phone) {
//           details.innerHTML += ` · ${store.properties.phoneFormatted}`;
//         }
//         if (store.properties.distance) {
//           const roundedDistance = Math.round(store.properties.distance * 100) / 100;
//           details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
//         }
//       }
//     }
//     // STORELIST

//     // PAN TO SELECTED STORE
//     function flyToStore(currentFeature) {
//       map.flyTo({
//         center: currentFeature.geolocation.coordinates,
//         zoom: 15
//       });
//     }
//     // PAN TO SELECTED STORE

//     // BUILD TOOLTIP MARKER
//     function createPopUp(currentFeature) {
//       const popUps = document.getElementsByClassName('mapboxgl-popup');
//       /** Check if there is already a popup on the map and if so, remove it */
//       if (popUps[0]) popUps[0].remove();

//       const popup = new mapboxgl.Popup({ closeOnClick: false })
//         .setLngLat(currentFeature.geolocation.coordinates)
//         .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
//         .addTo(map);
//     }
//     // BUILD TOOLTIP MARKER


    
//   }
// }


// export default MapApi;


















// import mapboxgl from '!mapbox-gl';

// class MapApi {
//   constructor() {
//     mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww';
//     var map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d',
//       center: [-77.034084142948, 38.909671288923],
//       zoom: 13,
//       scrollZoom: false
//     });

//     console.log("Map initialized."); // Add logging
//   }


//   initializeMap(_mapData, _mapElement, _listingsElement) {
//     const stores = {
//       'type': 'FeatureCollection',
//       'location': [
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.034084142948, 38.909671288923]
//           },
//           'properties': {
//             'phoneFormatted': '(202) 234-7336',
//             'phone': '2022347336',
//             'address': '1471 P St NW',
//             'city': 'Washington DC',
//             'country': 'United States',
//             'crossStreet': 'at 15th St NW',
//             'postalCode': '20005',
//             'state': 'D.C.'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.049766, 38.900772]
//           },
//           'properties': {
//             'phoneFormatted': '(202) 507-8357',
//             'phone': '2025078357',
//             'address': '2221 I St NW',
//             'city': 'Washington DC',
//             'country': 'United States',
//             'crossStreet': 'at 22nd St NW',
//             'postalCode': '20037',
//             'state': 'D.C.'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.043929, 38.910525]
//           },
//           'properties': {
//             'phoneFormatted': '(202) 387-9338',
//             'phone': '2023879338',
//             'address': '1512 Connecticut Ave NW',
//             'city': 'Washington DC',
//             'country': 'United States',
//             'crossStreet': 'at Dupont Circle',
//             'postalCode': '20036',
//             'state': 'D.C.'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.0672, 38.90516896]
//           },
//           'properties': {
//             'phoneFormatted': '(202) 337-9338',
//             'phone': '2023379338',
//             'address': '3333 M St NW',
//             'city': 'Washington DC',
//             'country': 'United States',
//             'crossStreet': 'at 34th St NW',
//             'postalCode': '20007',
//             'state': 'D.C.'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.002583742142, 38.887041080933]
//           },
//           'properties': {
//             'phoneFormatted': '(202) 547-9338',
//             'phone': '2025479338',
//             'address': '221 Pennsylvania Ave SE',
//             'city': 'Washington DC',
//             'country': 'United States',
//             'crossStreet': 'btwn 2nd & 3rd Sts. SE',
//             'postalCode': '20003',
//             'state': 'D.C.'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-76.933492720127, 38.99225245786]
//           },
//           'properties': {
//             'address': '8204 Baltimore Ave',
//             'city': 'College Park',
//             'country': 'United States',
//             'postalCode': '20740',
//             'state': 'MD'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.097083330154, 38.980979]
//           },
//           'properties': {
//             'phoneFormatted': '(301) 654-7336',
//             'phone': '3016547336',
//             'address': '4831 Bethesda Ave',
//             'cc': 'US',
//             'city': 'Bethesda',
//             'country': 'United States',
//             'postalCode': '20814',
//             'state': 'MD'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.359425054188, 38.958058116661]
//           },
//           'properties': {
//             'phoneFormatted': '(571) 203-0082',
//             'phone': '5712030082',
//             'address': '11935 Democracy Dr',
//             'city': 'Reston',
//             'country': 'United States',
//             'crossStreet': 'btw Explorer & Library',
//             'postalCode': '20190',
//             'state': 'VA'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.10853099823, 38.880100922392]
//           },
//           'properties': {
//             'phoneFormatted': '(703) 522-2016',
//             'phone': '7035222016',
//             'address': '4075 Wilson Blvd',
//             'city': 'Arlington',
//             'country': 'United States',
//             'crossStreet': 'at N Randolph St.',
//             'postalCode': '22203',
//             'state': 'VA'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-75.28784, 40.008008]
//           },
//           'properties': {
//             'phoneFormatted': '(610) 642-9400',
//             'phone': '6106429400',
//             'address': '68 Coulter Ave',
//             'city': 'Ardmore',
//             'country': 'United States',
//             'postalCode': '19003',
//             'state': 'PA'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-75.20121216774, 39.954030175164]
//           },
//           'properties': {
//             'phoneFormatted': '(215) 386-1365',
//             'phone': '2153861365',
//             'address': '3925 Walnut St',
//             'city': 'Philadelphia',
//             'country': 'United States',
//             'postalCode': '19104',
//             'state': 'PA'
//           }
//         },
//         {
//           'type': 'Feature',
//           'geolocation': {
//             'type': 'Point',
//             'coordinates': [-77.043959498405, 38.903883387232]
//           },
//           'properties': {
//             'phoneFormatted': '(202) 331-3355',
//             'phone': '2023313355',
//             'address': '1901 L St. NW',
//             'city': 'Washington DC',
//             'country': 'United States',
//             'crossStreet': 'at 19th St',
//             'postalCode': '20036',
//             'state': 'D.C.'
//           }
//         }
//       ]
//     };

//     stores.location.forEach((store, i) => {
//       store.properties.id = i;
//     });

//     console.log("Stores data:", stores); // Add logging

//     map.on('load', () => {
//       map.addSource('places', {
//         'type': 'geojsonStore',
//         'data': stores
//       });

//       const geocoder = new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//         marker: true,
//         bbox: [-77.210763, 38.803367, -76.853675, 39.052643]
//       });

//       this.buildLocationList(stores);
//       map.addControl(geocoder, 'top-left');
//       this.addMarkers(map, stores);

//       geocoder.on('result', (event) => {
//         const searchResult = event.result.geolocation;

//         const options = { units: 'miles' };
//         for (const store of stores.location) {
//           store.properties.distance = turf.distance(
//             searchResult,
//             store.geolocation,
//             options
//           );
//         }

//         stores.location.sort((a, b) => {
//           if (a.properties.distance > b.properties.distance) {
//             return 1;
//           }
//           if (a.properties.distance < b.properties.distance) {
//             return -1;
//           }
//           return 0;
//         });

//         const listings = document.getElementById('listings');
//         while (listings.firstChild) {
//           listings.removeChild(listings.firstChild);
//         }
//         this.buildLocationList(stores);

//         this.createPopUp(stores.location[0]);

//         const activeListing = document.getElementById(`listing-${stores.location[0].properties.id}`);
//         activeListing.classList.add('active');

//         const bbox = this.getBbox(stores, 0, searchResult);
//         map.fitBounds(bbox, {
//           padding: 100
//         });
//       });
//       console.log("Map loaded."); // Add logging
//     });
//   }


//   getBbox(sortedStores, storeIdentifier, searchResult) {
//     const lats = [
//       sortedStores.location[storeIdentifier].geolocation.coordinates[1],
//       searchResult.coordinates[1]
//     ];
//     const lons = [
//       sortedStores.location[storeIdentifier].geolocation.coordinates[0],
//       searchResult.coordinates[0]
//     ];
//     const sortedLons = lons.sort((a, b) => {
//       if (a > b) {
//         return 1;
//       }
//       if (a.distance < b.distance) {
//         return -1;
//       }
//       return 0;
//     });
//     const sortedLats = lats.sort((a, b) => {
//       if (a > b) {
//         return 1;
//       }
//       if (a.distance < b.distance) {
//         return -1;
//       }
//       return 0;
//     });
//     return [
//       [sortedLons[0], sortedLats[0]],
//       [sortedLons[1], sortedLats[1]]
//     ];
//   }

  


//   addMarkers(map, stores) {
//     for (const marker of stores.location) {
//       const el = document.createElement('div');
//       el.id = `marker-${marker.properties.id}`;
//       el.className = 'marker';

//       new mapboxgl.Marker(el, { offset: [0, -23] })
//         .setLngLat(marker.geolocation.coordinates)
//         .addTo(map);

//       el.addEventListener('click', (e) => {
//         this.flyToStore(map, marker);
//         this.createPopUp(marker);
//         const activeItem = document.getElementsByClassName('active');
//         e.stopPropagation();
//         if (activeItem[0]) {
//           activeItem[0].classList.remove('active');
//         }
//         const listing = document.getElementById(`listing-${marker.properties.id}`);
//         listing.classList.add('active');
//       });
//     }
//   }

//   buildLocationList(stores) {
//     const self = this; // save the context of 'this'
//     for (const store of stores.location) {
//       const listings = document.getElementById('listings');
//       const listing = listings.appendChild(document.createElement('div'));
//       listing.id = `listing-${store.properties.id}`;
//       listing.className = 'item';
  
//       const link = listing.appendChild(document.createElement('a'));
//       link.href = '#';
//       link.className = 'title';
//       link.id = `link-${store.properties.id}`;
//       link.innerHTML = `${store.properties.address}`;
  
//       const details = listing.appendChild(document.createElement('div'));
//       details.innerHTML = `${store.properties.city}`;
//       if (store.properties.phone) {
//         details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
//       }
//       if (store.properties.distance) {
//         const roundedDistance = Math.round(store.properties.distance * 100) / 100;
//         details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
//       }
  
//       link.addEventListener('click', function () {
//         for (const feature of stores.location) {
//           if (this.id === `link-${feature.properties.id}`) {
//             self.flyToStore(map, feature); // use 'self' instead of 'this'
//             self.createPopUp(feature); // use 'self' instead of 'this'
//           }
//         }
//         const activeItem = document.getElementsByClassName('active');
//         if (activeItem[0]) {
//           activeItem[0].classList.remove('active');
//         }
//         this.parentNode.classList.add('active');
//       });
//     }
//   }
  

//   flyToStore(map, currentFeature) {
//     map.flyTo({
//       center: currentFeature.geolocation.coordinates,
//       zoom: 15
//     });
//   }

//   createPopUp(currentFeature) {
//     const popUps = document.getElementsByClassName('mapboxgl-popup');
//     if (popUps[0]) popUps[0].remove();

//     const popup = new mapboxgl.Popup({ closeOnClick: false })
//       .setLngLat(currentFeature.geolocation.coordinates)
//       .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
//       .addTo(map);
//   }
// }


// export default MapApi;



      // mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww';

      // const map = new mapboxgl.Map({
      //   container: 'map',
      //   style: 'mapbox://styles/mapbox/light-v11',
      //   center: [-77.034084142948, 38.909671288923],
      //   zoom: 13,
      //   scrollZoom: false
      // });

      // const stores = {
      //   'type': 'FeatureCollection',
      //   'location': [
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.034084142948, 38.909671288923]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(202) 234-7336',
      //         'phone': '2022347336',
      //         'address': '1471 P St NW',
      //         'city': 'Washington DC',
      //         'country': 'United States',
      //         'crossStreet': 'at 15th St NW',
      //         'postalCode': '20005',
      //         'state': 'D.C.'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.049766, 38.900772]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(202) 507-8357',
      //         'phone': '2025078357',
      //         'address': '2221 I St NW',
      //         'city': 'Washington DC',
      //         'country': 'United States',
      //         'crossStreet': 'at 22nd St NW',
      //         'postalCode': '20037',
      //         'state': 'D.C.'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.043929, 38.910525]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(202) 387-9338',
      //         'phone': '2023879338',
      //         'address': '1512 Connecticut Ave NW',
      //         'city': 'Washington DC',
      //         'country': 'United States',
      //         'crossStreet': 'at Dupont Circle',
      //         'postalCode': '20036',
      //         'state': 'D.C.'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.0672, 38.90516896]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(202) 337-9338',
      //         'phone': '2023379338',
      //         'address': '3333 M St NW',
      //         'city': 'Washington DC',
      //         'country': 'United States',
      //         'crossStreet': 'at 34th St NW',
      //         'postalCode': '20007',
      //         'state': 'D.C.'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.002583742142, 38.887041080933]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(202) 547-9338',
      //         'phone': '2025479338',
      //         'address': '221 Pennsylvania Ave SE',
      //         'city': 'Washington DC',
      //         'country': 'United States',
      //         'crossStreet': 'btwn 2nd & 3rd Sts. SE',
      //         'postalCode': '20003',
      //         'state': 'D.C.'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-76.933492720127, 38.99225245786]
      //       },
      //       'properties': {
      //         'address': '8204 Baltimore Ave',
      //         'city': 'College Park',
      //         'country': 'United States',
      //         'postalCode': '20740',
      //         'state': 'MD'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.097083330154, 38.980979]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(301) 654-7336',
      //         'phone': '3016547336',
      //         'address': '4831 Bethesda Ave',
      //         'cc': 'US',
      //         'city': 'Bethesda',
      //         'country': 'United States',
      //         'postalCode': '20814',
      //         'state': 'MD'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.359425054188, 38.958058116661]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(571) 203-0082',
      //         'phone': '5712030082',
      //         'address': '11935 Democracy Dr',
      //         'city': 'Reston',
      //         'country': 'United States',
      //         'crossStreet': 'btw Explorer & Library',
      //         'postalCode': '20190',
      //         'state': 'VA'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.10853099823, 38.880100922392]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(703) 522-2016',
      //         'phone': '7035222016',
      //         'address': '4075 Wilson Blvd',
      //         'city': 'Arlington',
      //         'country': 'United States',
      //         'crossStreet': 'at N Randolph St.',
      //         'postalCode': '22203',
      //         'state': 'VA'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-75.28784, 40.008008]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(610) 642-9400',
      //         'phone': '6106429400',
      //         'address': '68 Coulter Ave',
      //         'city': 'Ardmore',
      //         'country': 'United States',
      //         'postalCode': '19003',
      //         'state': 'PA'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-75.20121216774, 39.954030175164]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(215) 386-1365',
      //         'phone': '2153861365',
      //         'address': '3925 Walnut St',
      //         'city': 'Philadelphia',
      //         'country': 'United States',
      //         'postalCode': '19104',
      //         'state': 'PA'
      //       }
      //     },
      //     {
      //       'type': 'Feature',
      //       'geolocation': {
      //         'type': 'Point',
      //         'coordinates': [-77.043959498405, 38.903883387232]
      //       },
      //       'properties': {
      //         'phoneFormatted': '(202) 331-3355',
      //         'phone': '2023313355',
      //         'address': '1901 L St. NW',
      //         'city': 'Washington DC',
      //         'country': 'United States',
      //         'crossStreet': 'at 19th St',
      //         'postalCode': '20036',
      //         'state': 'D.C.'
      //       }
      //     }
      //   ]
      // };

      // stores.location.forEach((store, i) => {
      //   store.properties.id = i;
      // });

      // map.on('load', () => {
      //   map.addSource('places', {
      //     'type': 'geojsonStore',
      //     'data': stores
      //   });

      //   const geocoder = new MapboxGeocoder({
      //     accessToken: mapboxgl.accessToken,
      //     mapboxgl: mapboxgl,
      //     marker: true,
      //     bbox: [-77.210763, 38.803367, -76.853675, 39.052643]
      //   });

      //   buildLocationList(stores);
      //   map.addControl(geocoder, 'top-left');
      //   addMarkers();

      //   geocoder.on('result', (event) => {
      //     /* Get the coordinate of the search result */
      //     const searchResult = event.result.geolocation;

      //     const options = { units: 'miles' };
      //     for (const store of stores.location) {
      //       store.properties.distance = turf.distance(
      //         searchResult,
      //         store.geolocation,
      //         options
      //       );
      //     }

      //     stores.location.sort((a, b) => {
      //       if (a.properties.distance > b.properties.distance) {
      //         return 1;
      //       }
      //       if (a.properties.distance < b.properties.distance) {
      //         return -1;
      //       }
      //       return 0; // a must be equal to b
      //     });

      //     const listings = document.getElementById('listings');
      //     while (listings.firstChild) {
      //       listings.removeChild(listings.firstChild);
      //     }
      //     buildLocationList(stores);

      //     /* Open a popup for the closest store. */
      //     createPopUp(stores.location[0]);

      //     /** Highlight the listing for the closest store. */
      //     const activeListing = document.getElementById(
      //       `listing-${stores.location[0].properties.id}`
      //     );
      //     activeListing.classList.add('active');

      //     const bbox = getBbox(stores, 0, searchResult);
      //     map.fitBounds(bbox, {
      //       padding: 100
      //     });
      //   });
      // });

      // function getBbox(sortedStores, storeIdentifier, searchResult) {
      //   const lats = [
      //     sortedStores.location[storeIdentifier].geolocation.coordinates[1],
      //     searchResult.coordinates[1]
      //   ];
      //   const lons = [
      //     sortedStores.location[storeIdentifier].geolocation.coordinates[0],
      //     searchResult.coordinates[0]
      //   ];
      //   const sortedLons = lons.sort((a, b) => {
      //     if (a > b) {
      //       return 1;
      //     }
      //     if (a.distance < b.distance) {
      //       return -1;
      //     }
      //     return 0;
      //   });
      //   const sortedLats = lats.sort((a, b) => {
      //     if (a > b) {
      //       return 1;
      //     }
      //     if (a.distance < b.distance) {
      //       return -1;
      //     }
      //     return 0;
      //   });
      //   return [
      //     [sortedLons[0], sortedLats[0]],
      //     [sortedLons[1], sortedLats[1]]
      //   ];
      // }

      // function addMarkers() {
      //   for (const marker of stores.location) {
      //     const el = document.createElement('div');
      //     el.id = `marker-${marker.properties.id}`;
      //     el.className = 'marker';

      //     new mapboxgl.Marker(el, { offset: [0, -23] })
      //       .setLngLat(marker.geolocation.coordinates)
      //       .addTo(map);

      //     el.addEventListener('click', (e) => {
      //       flyToStore(marker);
      //       createPopUp(marker);
      //       const activeItem = document.getElementsByClassName('active');
      //       e.stopPropagation();
      //       if (activeItem[0]) {
      //         activeItem[0].classList.remove('active');
      //       }
      //       const listing = document.getElementById(
      //         `listing-${marker.properties.id}`
      //       );
      //       listing.classList.add('active');
      //     });
      //   }
      // }

      // function buildLocationList(stores) {
      //   for (const store of stores.location) {
      //     const listings = document.getElementById('listings');
      //     const listing = listings.appendChild(document.createElement('div'));
      //     listing.id = `listing-${store.properties.id}`;
      //     listing.className = 'item';

      //     const link = listing.appendChild(document.createElement('a'));
      //     link.href = '#';
      //     link.className = 'title';
      //     link.id = `link-${store.properties.id}`;
      //     link.innerHTML = `${store.properties.address}`;

      //     const details = listing.appendChild(document.createElement('div'));
      //     details.innerHTML = `${store.properties.city}`;
      //     if (store.properties.phone) {
      //       details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
      //     }
      //     if (store.properties.distance) {
      //       const roundedDistance =
      //         Math.round(store.properties.distance * 100) / 100;
      //       details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
      //     }

      //     link.addEventListener('click', function () {
      //       for (const feature of stores.location) {
      //         if (this.id === `link-${feature.properties.id}`) {
      //           flyToStore(feature);
      //           createPopUp(feature);
      //         }
      //       }
      //       const activeItem = document.getElementsByClassName('active');
      //       if (activeItem[0]) {
      //         activeItem[0].classList.remove('active');
      //       }
      //       this.parentNode.classList.add('active');
      //     });
      //   }
      // }

      // function flyToStore(currentFeature) {
      //   map.flyTo({
      //     center: currentFeature.geolocation.coordinates,
      //     zoom: 15
      //   });
      // }

      // function createPopUp(currentFeature) {
      //   const popUps = document.getElementsByClassName('mapboxgl-popup');
      //   if (popUps[0]) popUps[0].remove();

      //   const popup = new mapboxgl.Popup({ closeOnClick: false })
      //     .setLngLat(currentFeature.geolocation.coordinates)
      //     .setHTML(
      //       `<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`
      //     )
      //     .addTo(map);
      // }
    





















// src/components/MapApi.js
// import mapboxgl from 'mapbox-gl';
// mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww';


// // Placeholder for the geolocated stores
// var stores = {

//   'type': 'FeatureCollection',
//   'location': [
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.034084142948, 38.909671288923]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 234-7336',
//         'phone': '2022347336',
//         'address': '1471 P St NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 15th St NW',
//         'postalCode': '20005',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.049766, 38.900772]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 507-8357',
//         'phone': '2025078357',
//         'address': '2221 I St NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 22nd St NW',
//         'postalCode': '20037',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.043929, 38.910525]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 387-9338',
//         'phone': '2023879338',
//         'address': '1512 Connecticut Ave NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at Dupont Circle',
//         'postalCode': '20036',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.0672, 38.90516896]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 337-9338',
//         'phone': '2023379338',
//         'address': '3333 M St NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 34th St NW',
//         'postalCode': '20007',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.002583742142, 38.887041080933]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 547-9338',
//         'phone': '2025479338',
//         'address': '221 Pennsylvania Ave SE',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'btwn 2nd & 3rd Sts. SE',
//         'postalCode': '20003',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-76.933492720127, 38.99225245786]
//       },
//       'properties': {
//         'address': '8204 Baltimore Ave',
//         'city': 'College Park',
//         'country': 'United States',
//         'postalCode': '20740',
//         'state': 'MD'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.097083330154, 38.980979]
//       },
//       'properties': {
//         'phoneFormatted': '(301) 654-7336',
//         'phone': '3016547336',
//         'address': '4831 Bethesda Ave',
//         'cc': 'US',
//         'city': 'Bethesda',
//         'country': 'United States',
//         'postalCode': '20814',
//         'state': 'MD'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.359425054188, 38.958058116661]
//       },
//       'properties': {
//         'phoneFormatted': '(571) 203-0082',
//         'phone': '5712030082',
//         'address': '11935 Democracy Dr',
//         'city': 'Reston',
//         'country': 'United States',
//         'crossStreet': 'btw Explorer & Library',
//         'postalCode': '20190',
//         'state': 'VA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.10853099823, 38.880100922392]
//       },
//       'properties': {
//         'phoneFormatted': '(703) 522-2016',
//         'phone': '7035222016',
//         'address': '4075 Wilson Blvd',
//         'city': 'Arlington',
//         'country': 'United States',
//         'crossStreet': 'at N Randolph St.',
//         'postalCode': '22203',
//         'state': 'VA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-75.28784, 40.008008]
//       },
//       'properties': {
//         'phoneFormatted': '(610) 642-9400',
//         'phone': '6106429400',
//         'address': '68 Coulter Ave',
//         'city': 'Ardmore',
//         'country': 'United States',
//         'postalCode': '19003',
//         'state': 'PA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-75.20121216774, 39.954030175164]
//       },
//       'properties': {
//         'phoneFormatted': '(215) 386-1365',
//         'phone': '2153861365',
//         'address': '3925 Walnut St',
//         'city': 'Philadelphia',
//         'country': 'United States',
//         'postalCode': '19104',
//         'state': 'PA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.043959498405, 38.903883387232]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 331-3355',
//         'phone': '2023313355',
//         'address': '1901 L St. NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 19th St',
//         'postalCode': '20036',
//         'state': 'D.C.'
//       }
//     }
//   ]

// };



// // This function sorts locations by distance
// function sortStores() {
//   stores.location.sort(function(a, b) {
//     if (a.properties.distance < b.properties.distance) {
//       return -1;
//     }
//     if (a.properties.distance > b.properties.distance) {
//       return 1;
//     }
//     return 0; // a must be equal to b
//   });
// }

// // This function will make a directions request
// function getStores(map) {
//   // Make the API request
//   var apiRequest = 'https://api.mapbox.com/geocoding/v5/mapbox.places/your_location.json?proximity=' + map.getCenter().wrap().x + ',' + map.getCenter().wrap().y + '&access_token=' + mapboxgl.accessToken;
//   fetch(apiRequest)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       stores.location = data.location;
//       sortStores();
//       // Use Mapbox GL JS's `map.getSource` to get a Mapbox source
//       // Then use `setData` to set the API response as its data
//       map.getSource('single-point').setData(data);
//     });
// }

// // This function adds a marker to the map for each store found
// function addMarkers(map) {
//   stores.location.forEach(function(marker) {
//     // Create a div element for the marker
//     var el = document.createElement('div');
//     el.className = 'marker';
//     el.style.backgroundImage = 'url(./_assets/_brand/symbol/favicon/neumad-symbolContained-favicon-light.svg)'; // Replace with your own image url
//     el.style.width = '50px';
//     el.style.height = '50px';

//     // Create a new marker
//     new mapboxgl.Marker(el)
//       .setLngLat(marker.geolocation.coordinates)
//       .addTo(map);
//   });
// }

// const MapApi = {
//   initializeMap: (mapData) => {
//     var map = new mapboxgl.Map({
//       container: 'map', // Id of the container element
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-96, 37.8], 
//       zoom: 3 
//     });

//     // Initialize the single point geocode source
//     map.on('load', function() {
//       map.addSource('single-point', {
//         "type": "geojsonStore",
//         "data": {
//           "type": "FeatureCollection",
//           "location": []
//         }
//       });

//       getStores(map);
//       addMarkers(map);
//     });

//     // Listen for the `geocoder.input` event
//     map.on('moveend', function() {
//       getStores(map);
//       addMarkers(map);
//     });
//   }
// };

// export default MapApi;













// mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww';

// /**
//  * Add the map to the page
//  */
// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d',
//   center: [-77.034084142948, 38.909671288923],
//   zoom: 13,
//   scrollZoom: false
// });



// const stores = {
//   'type': 'FeatureCollection',
//   'location': [
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.034084142948, 38.909671288923]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 234-7336',
//         'phone': '2022347336',
//         'address': '1471 P St NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 15th St NW',
//         'postalCode': '20005',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.049766, 38.900772]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 507-8357',
//         'phone': '2025078357',
//         'address': '2221 I St NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 22nd St NW',
//         'postalCode': '20037',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.043929, 38.910525]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 387-9338',
//         'phone': '2023879338',
//         'address': '1512 Connecticut Ave NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at Dupont Circle',
//         'postalCode': '20036',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.0672, 38.90516896]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 337-9338',
//         'phone': '2023379338',
//         'address': '3333 M St NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 34th St NW',
//         'postalCode': '20007',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.002583742142, 38.887041080933]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 547-9338',
//         'phone': '2025479338',
//         'address': '221 Pennsylvania Ave SE',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'btwn 2nd & 3rd Sts. SE',
//         'postalCode': '20003',
//         'state': 'D.C.'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-76.933492720127, 38.99225245786]
//       },
//       'properties': {
//         'address': '8204 Baltimore Ave',
//         'city': 'College Park',
//         'country': 'United States',
//         'postalCode': '20740',
//         'state': 'MD'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.097083330154, 38.980979]
//       },
//       'properties': {
//         'phoneFormatted': '(301) 654-7336',
//         'phone': '3016547336',
//         'address': '4831 Bethesda Ave',
//         'cc': 'US',
//         'city': 'Bethesda',
//         'country': 'United States',
//         'postalCode': '20814',
//         'state': 'MD'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.359425054188, 38.958058116661]
//       },
//       'properties': {
//         'phoneFormatted': '(571) 203-0082',
//         'phone': '5712030082',
//         'address': '11935 Democracy Dr',
//         'city': 'Reston',
//         'country': 'United States',
//         'crossStreet': 'btw Explorer & Library',
//         'postalCode': '20190',
//         'state': 'VA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.10853099823, 38.880100922392]
//       },
//       'properties': {
//         'phoneFormatted': '(703) 522-2016',
//         'phone': '7035222016',
//         'address': '4075 Wilson Blvd',
//         'city': 'Arlington',
//         'country': 'United States',
//         'crossStreet': 'at N Randolph St.',
//         'postalCode': '22203',
//         'state': 'VA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-75.28784, 40.008008]
//       },
//       'properties': {
//         'phoneFormatted': '(610) 642-9400',
//         'phone': '6106429400',
//         'address': '68 Coulter Ave',
//         'city': 'Ardmore',
//         'country': 'United States',
//         'postalCode': '19003',
//         'state': 'PA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-75.20121216774, 39.954030175164]
//       },
//       'properties': {
//         'phoneFormatted': '(215) 386-1365',
//         'phone': '2153861365',
//         'address': '3925 Walnut St',
//         'city': 'Philadelphia',
//         'country': 'United States',
//         'postalCode': '19104',
//         'state': 'PA'
//       }
//     },
//     {
//       'type': 'Feature',
//       'geolocation': {
//         'type': 'Point',
//         'coordinates': [-77.043959498405, 38.903883387232]
//       },
//       'properties': {
//         'phoneFormatted': '(202) 331-3355',
//         'phone': '2023313355',
//         'address': '1901 L St. NW',
//         'city': 'Washington DC',
//         'country': 'United States',
//         'crossStreet': 'at 19th St',
//         'postalCode': '20036',
//         'state': 'D.C.'
//       }
//     }
//   ]
// };

// /**
//  * Assign a unique id to each store. You'll use this `id`
//  * later to associate each point on the map with a listing
//  * in the sidebar.
//  */
// stores.location.forEach((store, i) => {
//   store.properties.id = i;
// });

// /**
//  * Wait until the map loads to make changes to the map.
//  */
// map.on('load', () => {
//   /**
//    * This is where your '.addLayer()' used to be, instead
//    * add only the source without styling a layer
//    */
//   map.addSource('places', {
//     'type': 'geojsonStore',
//     'data': stores
//   });

//   /**
//    * Create a new MapboxGeocoder instance.
//    */
//   const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl,
//     marker: true,
//     bbox: [-77.210763, 38.803367, -76.853675, 39.052643]
//   });
  

//   /**
//    * Add all the things to the page:
//    * - The location listings on the side of the page
//    * - The search box (MapboxGeocoder) onto the map
//    * - The markers onto the map
//    */
//   buildLocationList(stores);
//   map.addControl(geocoder, 'top-left');
//   addMarkers();

//   /**
//    * Listen for when a geocoder result is returned. When one is returned:
//    * - Calculate distances
//    * - Sort stores by distance
//    * - Rebuild the listings
//    * - Adjust the map camera
//    * - Open a popup for the closest store
//    * - Highlight the listing for the closest store.
//    */
//   geocoder.on('result', (event) => {
//     /* Get the coordinate of the search result */
//     const searchResult = event.result.geolocation;

//     /**
//      * Calculate distances:
//      * For each store, use turf.disance to calculate the distance
//      * in miles between the searchResult and the store. Assign the
//      * calculated value to a property called `distance`.
//      */
//     const options = { units: 'miles' };
//     for (const store of stores.location) {
//       store.properties.distance = turf.distance(
//         searchResult,
//         store.geolocation,
//         options
//       );
//     }

//     /**
//      * Sort stores by distance from closest to the `searchResult`
//      * to furthest.
//      */
//     stores.location.sort((a, b) => {
//       if (a.properties.distance > b.properties.distance) {
//         return 1;
//       }
//       if (a.properties.distance < b.properties.distance) {
//         return -1;
//       }
//       return 0; // a must be equal to b
//     });

//     /**
//      * Rebuild the listings:
//      * Remove the existing listings and build the location
//      * list again using the newly sorted stores.
//      */
//     const listings = document.getElementById('listings');
//     while (listings.firstChild) {
//       listings.removeChild(listings.firstChild);
//     }
//     buildLocationList(stores);

//     /* Open a popup for the closest store. */
//     createPopUp(stores.location[0]);

//     /** Highlight the listing for the closest store. */
//     const activeListing = document.getElementById(
//       `listing-${stores.location[0].properties.id}`
//     );
//     activeListing.classList.add('active');

//     /**
//      * Adjust the map camera:
//      * Get a bbox that contains both the geocoder result and
//      * the closest store. Fit the bounds to that bbox.
//      */
//     const bbox = getBbox(stores, 0, searchResult);
//     map.fitBounds(bbox, {
//       padding: 100
//     });
//   });
// });

// /**
//  * Using the coordinates (lng, lat) for
//  * (1) the search result and
//  * (2) the closest store
//  * construct a bbox that will contain both points
//  */
// function getBbox(sortedStores, storeIdentifier, searchResult) {
//   const lats = [
//     sortedStores.location[storeIdentifier].geolocation.coordinates[1],
//     searchResult.coordinates[1]
//   ];
//   const lons = [
//     sortedStores.location[storeIdentifier].geolocation.coordinates[0],
//     searchResult.coordinates[0]
//   ];
//   const sortedLons = lons.sort((a, b) => {
//     if (a > b) {
//       return 1;
//     }
//     if (a.distance < b.distance) {
//       return -1;
//     }
//     return 0;
//   });
//   const sortedLats = lats.sort((a, b) => {
//     if (a > b) {
//       return 1;
//     }
//     if (a.distance < b.distance) {
//       return -1;
//     }
//     return 0;
//   });
//   return [
//     [sortedLons[0], sortedLats[0]],
//     [sortedLons[1], sortedLats[1]]
//   ];
// }

// /**
//  * Add a marker to the map for every store listing.
//  **/
// function addMarkers() {
//   /* For each feature in the GeoJSON object above: */
//   for (const marker of stores.location) {
//     /* Create a div element for the marker. */
//     const el = document.createElement('div');
//     /* Assign a unique `id` to the marker. */
//     el.id = `marker-${marker.properties.id}`;
//     /* Assign the `marker` class to each marker for styling. */
//     el.className = 'marker';

//     /**
//      * Create a marker using the div element
//      * defined above and add it to the map.
//      **/
//     new mapboxgl.Marker(el, { offset: [0, -23] })
//       .setLngLat(marker.geolocation.coordinates)
//       .addTo(map);

//     /**
//      * Listen to the element and when it is clicked, do three things:
//      * 1. Fly to the point
//      * 2. Close all other popups and display popup for clicked store
//      * 3. Highlight listing in sidebar (and remove highlight for all other listings)
//      **/
//     el.addEventListener('click', (e) => {
//       flyToStore(marker);
//       createPopUp(marker);
//       const activeItem = document.getElementsByClassName('active');
//       e.stopPropagation();
//       if (activeItem[0]) {
//         activeItem[0].classList.remove('active');
//       }
//       const listing = document.getElementById(
//         `listing-${marker.properties.id}`
//       );
//       listing.classList.add('active');
//     });
//   }
// }

// /**
//  * Add a listing for each store to the sidebar.
//  **/
// function buildLocationList(stores) {
//   for (const store of stores.location) {
//     /* Add a new listing section to the sidebar. */
//     const listings = document.getElementById('listings');
//     const listing = listings.appendChild(document.createElement('div'));
//     /* Assign a unique `id` to the listing. */
//     listing.id = `listing-${store.properties.id}`;
//     /* Assign the `item` class to each listing for styling. */
//     listing.className = 'item';

//     /* Add the link to the individual listing created above. */
//     const link = listing.appendChild(document.createElement('a'));
//     link.href = '#';
//     link.className = 'title';
//     link.id = `link-${store.properties.id}`;
//     link.innerHTML = `${store.properties.address}`;

//     /* Add details to the individual listing. */
//     const details = listing.appendChild(document.createElement('div'));
//     details.innerHTML = `${store.properties.city}`;
//     if (store.properties.phone) {
//       details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
//     }
//     if (store.properties.distance) {
//       const roundedDistance =
//         Math.round(store.properties.distance * 100) / 100;
//       details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
//     }

//     /**
//      * Listen to the element and when it is clicked, do four things:
//      * 1. Update the `currentFeature` to the store associated with the clicked link
//      * 2. Fly to the point
//      * 3. Close all other popups and display popup for clicked store
//      * 4. Highlight listing in sidebar (and remove highlight for all other listings)
//      **/
//     link.addEventListener('click', function () {
//       for (const feature of stores.location) {
//         if (this.id === `link-${feature.properties.id}`) {
//           flyToStore(feature);
//           createPopUp(feature);
//         }
//       }
//       const activeItem = document.getElementsByClassName('active');
//       if (activeItem[0]) {
//         activeItem[0].classList.remove('active');
//       }
//       this.parentNode.classList.add('active');
//     });
//   }
// }

// /**
//  * Use Mapbox GL JS's `flyTo` to move the camera smoothly
//  * a given center point.
//  **/
// function flyToStore(currentFeature) {
//   map.flyTo({
//     center: currentFeature.geolocation.coordinates,
//     zoom: 15
//   });
// }

// /**
//  * Create a Mapbox GL JS `Popup`.
//  **/
// function createPopUp(currentFeature) {
//   const popUps = document.getElementsByClassName('mapboxgl-popup');
//   if (popUps[0]) popUps[0].remove();

//   const popup = new mapboxgl.Popup({ closeOnClick: false })
//     .setLngLat(currentFeature.geolocation.coordinates)
//     .setHTML(
//       `<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`
//     )
//     .addTo(map);
// }
























// import mapboxgl from "mapbox-gl";
// const MapApi = {
//   apiKey:
//     "pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q",
//   initializeMap: (mapData) => {
//     mapboxgl.accessToken = MapApi.apiKey;
//     //   const { title, slug, thumbnail, category, section, tag } = featuredBlog;
//     const map = new mapboxgl.Map({
//       container: "map", // Replace with the ID of your map container element
//       style: "mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d", // Replace with your desired map style
//       center: [-77.04, 38.907], // Replace with the geolocation of your map center or use mapData
//       zoom: 12  , // Replace with your desired initial zoom level
//     });
//     map.on("load", () => {
//       map.addSource("places", {
//         // This GeoJSON contains location that include an "icon"
//         // property. The value of the "icon" property corresponds
//         // to an image in the Mapbox Streets style's sprite.
//         type: "geojsonStore",
//         data: {
//           type: "FeatureCollection",
//           location: [
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
//                 icon: "theatre",
//                 // thumbnail: "https://images.ctfassets.net/i1hcb4885ci0/2h2N1ZQeMcogi3AszCYHD8/09d375d3b7686768cfdd0766ba64606a/article_work_topWeworkAmerica_thumbnail_20230319.png",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.038659, 38.931567],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
//                 icon: "theatre",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.003168, 38.894651],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
//                 icon: "bar",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.090372, 38.881189],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
//                 icon: "art-gallery",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.111561, 38.882342],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
//                 icon: "bicycle",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.052477, 38.943951],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
//                 icon: "rocket",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.043444, 38.909664],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
//                 icon: "music",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.031706, 38.914581],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
//                 icon: "music",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.020945, 38.878241],
//               },
//             },
//             {
//               type: "Feature",
//               properties: {
//                 description:
//                   '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
//                 icon: "music",
//               },
//               geolocation: {
//                 type: "Point",
//                 geolocation: [-77.007481, 38.876516],
//               },
//             },
//           ],
//         },
//       });
//       // Add a layer showing the places.
//       map.addLayer({
//         id: "places",
//         type: "symbol",
//         source: "places",
//         layout: {
//           "icon-image": ["get", "icon"],
//           "icon-allow-overlap": true,
//         },
//       });

//       // When a click event occurs on a feature in the places layer, open a popup at the
//       // location of the feature, with description HTML from its properties.
//       map.on("click", "places", (e) => {
//         // Copy geolocation array.
//         const geolocation = e.location[0].geolocation.geolocation.slice();
//         const description = e.location[0].properties.description;

//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - geolocation[0]) > 180) {
//           geolocation[0] += e.lngLat.lng > geolocation[0] ? 360 : -360;
//         }

//         new mapboxgl.Popup()
//           .setLngLat(geolocation)
//           .setHTML(description)
//           .addTo(map);
//       });

//       // Change the cursor to a pointer when the mouse is over the places layer.
//       map.on("mouseenter", "places", () => {
//         map.getCanvas().style.cursor = "pointer";
//       });

//       // Change it back to a pointer when it leaves.
//       map.on("mouseleave", "places", () => {
//         map.getCanvas().style.cursor = "";
//       });
//     });
//   },
// };

// export default MapApi;
