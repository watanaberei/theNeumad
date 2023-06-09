// src/screens/MapScreen.js
import MapApi from '../components/MapApi.js';
import { geojsonStore } from '../components/GeojsonStores.js';  
import CustomMarker from '../components/MapMarker.js';
import GeojsonListing from '../components/GeojsonListing.js';
import { getArticleNeumadsTrail } from "../api.js";



const MapScreen = {
  render: async () => {
    return `
      <div class="content">
        <div class="map-container">
          <div class="sidebar">
            <div class="heading">
              <h1>Nearby Storesf</h1>
              <input id="search-input" type="text" placeholder="Search Stores">
              <button id="search-button">Go</button>
            </div>
            <div id="listings-container" class="listings"></div>
          </div>
          <div id="map-container" class="map"></div>
        </div>
      </div>
    `;
  }, 
  after_render: async () => {
    // Initialize the map and markers
    const { map, markers } = MapApi.initMap();
  
    const storeData = await getArticleNeumadsTrail(); // Use the function that fetches your data
    const Geojson = geojsonStore(storeData);

    console.log("storeData",storeData);
    console.log("Geojson",Geojson);
    console.log("markers",markers);
    // Create custom markers for each store
    Geojson.forEach((feature, index) => {
      const { geometry, properties } = feature;
      const { coordinates } = geometry;
      const { title, description } = properties;

      console.log("geometry",geometry);
      console.log("properties",properties);

    
      const marker = CustomMarker(feature);
      console.log("marker",marker);
      marker.addTo(map);
      markers[index] = marker;
    });
  
    // Create and add listings to the map screen
    const listings = GeojsonListing(Geojson);
    document.getElementById('listings-container').appendChild(listings);

    // Add search input and button event listeners
    document.getElementById('search-input').addEventListener('input', (e) => {
      const filter = e.target.value.trim().toLowerCase();
      listings.querySelectorAll('.store').forEach((store) => {
        const { name, address } = Geojson.features[store.dataset.id].properties;
        const text = `${name} ${address}`.toLowerCase();
        store.style.display = text.includes(filter) ? 'block' : 'none';
      });
    });
    document.getElementById('search-button').addEventListener('click', () => {
      const id = listings.querySelector('.store.active').dataset.id;
      const marker = markers[id];
      map.flyTo({ center: marker.getLngLat(), zoom: 16 });
    });

    console.log("Markers:", markers); // Add logging
  }
};

export default MapScreen;



// initialize Mapbox API and create custom markers
// const { map, markers } = MapApi.initMap();
// Geojson.features.forEach((feature) => {
//   const marker = CustomMarker(feature);
//   marker.addTo(map);
//   markers.push(marker);
// });

// // create and add listings to the map screen
// const listings = GeojsonListing(Geojson);
// document.getElementById('listings-container').appendChild(listings);
// // add search input and button event listeners
// document.getElementById('search-input').addEventListener('input', (e) => {
//   const filter = e.target.value.trim().toLowerCase();
//   listings.querySelectorAll('.store').forEach((store) => {
//     const { name, address } = Geojson.features[store.dataset.id].properties;
//     const text = `${name} ${address}`.toLowerCase();
//     store.style.display = text.includes(filter) ? 'block' : 'none';
//   });
// });
// document.getElementById('search-button').addEventListener('click', () => {
//   const id = listings.querySelector('.store.active').dataset.id;
//   const marker = markers[id];
//   map.flyTo({ center: marker.getLngLat(), zoom: 16 });
// });
// // render the map screen
// document.getElementById('map-container').appendChild(map.getCanvasContainer());





// import { getArticleNeumadsTrail } from "../api.js";
// import MapApi from '../components/MapApi.js';
// import GeopostReviews from '../components/GeopostReviews.js';

// const MapScreen = {
//   render: async () => {
//     return `
//     <div class="content">
//       <div class="mapContainer">
//         <div class="sidebar">
//           <div class="heading">
//             <h1>Nearby Articles</h1>
//           </div>
//           <div id="listings" class="listings"></div>
//         </div>
//         <div id="map" class="map"></div>
//       </div> 
//     </div>
//     `;
//   },
//   after_render: async () => {
//     const mapComponent = await MapApi(); // You need to await for MapApi() to resolve
//     await mapComponent.initMap();

//     const contentElement = document.getElementById("content");
//     const listingsElement = contentElement.querySelector("#listings");
//     const mapElement = contentElement.querySelector("#map");

//     console.log("Listings Element:", listingsElement); // Add logging
//     console.log("Map Element:", mapElement); // Add logging
//   }
// };

// export default MapScreen;














// import { getArticleNeumadsTrail } from "../api.js";
// import MapApi from '../components/MapApi.js';
// import GeopostReviews from '../components/GeopostReviews.js';

// const MapScreen = {
//   render: async () => {
//     return `
//     <div class="content">
//       <div class="mapContainer">
//         <div class="sidebar">
//           <div class="heading">
//             <h1>Nearby Articles</h1>
//           </div>
//           <div id="listings" class="listings"></div>
//         </div>
//         <div id="map" class="map"></div>
//       </div> 
//     </div>
//     `;
//   },
//   after_render: async () => {
//     const mapComponent = MapApi();
//     await mapComponent.initMap();

//     const contentElement = document.getElementById("content");
//     const listingsElement = contentElement.querySelector("#listings");
//     const mapElement = contentElement.querySelector("#map");

//     console.log("Listings Element:", listingsElement); // Add logging
//     console.log("Map Element:", mapElement); // Add logging
//   }
// };

// export default MapScreen;











// import { getArticleNeumadsTrail } from "../api.js";
// import MapApi from '../components/MapApi.js'; // assuming correct relative path
// import NonFeaturedBlog from "../components/NonFeaturedBlog.js";



// const MapScreen = {
//   render: async () => {
//     const mapData = await getArticleNeumadsTrail(); // Assuming there is a similar function for getting map data
//     console.log("getArticleNeumadsTrail:" + mapData); 
//     console.log("Map Data getArticleNeumadsTrail:" + MapApi().title);
//     return `
//     <!DOCTYPE html>
//     <html lang="en">

//     <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//         <title>Places Explorer Map</title>
//         <script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></script>
//         <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet" />
//     </head>
//     <body>
//         <div class="explorer">
//         <div id="map" class="explorer-map"></div>
//         <div class="explorer--text">
//             <input
//             type="text"
//             class="explorer--search explorer--background-icon explorer--text"
//             id="explorer-search"
//             placeholder="Search Foursquare Places"
//             />
//             <div id="explorer-dropdown">
//             <ul id="explorer-suggestions"></ul>
//             <div id="explorer-error" class="explorer--error explorer--background-icon">
//                 Something went wrong. Please refresh and try again.
//             </div>
//             <div id="explorer-not-found" class="explorer--error explorer--background-icon"></div>
//             <div class="explorer--copyright">
//                 <img src="https://files.readme.io/7835fdb-powerByFSQ.svg" alt="powered by foursquare" />
//             </div>
//             </div>
//             ${MapApi()} <!-- this will insert the HTML returned by MapApi -->
//         </div>
//     </body>
//     </html>
          
//     `;
//   },
//   after_render: () => {
//     MapApi(); // Add MapApi call here, as DOM elements are ready after the render.
//   },
// };

// export default MapScreen;







// import { getArticleNeumadsTrail } from "../api.js";
// import MapApi from '../components/MapApi.js';


// const MapScreen = {
//   render: async () => {
//     const mapData = await getArticleNeumadsTrail(); // Assuming there is a similar function for getting map data

//     return `

//           <div class="explorer">
//           <div id="map" class="explorer-map"></div>
//           <div class="explorer--text">
//               <input
//               type="text"
//               class="explorer--search explorer--background-icon explorer--text"
//               id="explorer-search"
//               placeholder="Search Foursquare Places"
//               />
//               <div id="explorer-dropdown">
//               <ul id="explorer-suggestions"></ul>
//               <div id="explorer-error" class="explorer--error explorer--background-icon">
//                   Something went wrong. Please refresh and try again.
//               </div>
//               <div id="explorer-not-found" class="explorer--error explorer--background-icon"></div>
//               <div class="explorer--copyright">
//                   <img src="https://files.readme.io/7835fdb-powerByFSQ.svg" alt="powered by foursquare" />
//               </div>
//               </div>
//           </div>

//     `;
//   },
//   after_render: () => {
//     // JavaScript code to run after the render.
//     // Example: event listeners, dynamic content updates, etc.
//     // This is where you could initialize your map with the mapData, for example.
//   },
// };

// export default MapScreen;









// // src/components/MapBlog.js
// import API from "../api.js";
// import MapLocation from "../components/MapLocation.js";

// const MapBlog = {
//   // Render function to fetch data from API and render HTML
//   render: async () => {
//     const locationDetails = await API.fetchLocationDetails(input, token);

//     return `<div>
//       <div class="section-header container" id="section-header">
//         <div class="map-title">
//           <span class="display03">Map Locations</span>
//         </div>
//       </div>
//       <div class="location-details-layout container" id="location-details-layout">
//         ${locationDetails.map(MapLocation.render).join("\n")}
//       </div>
//       <div class="load-btn">
//         <button class="load" id="load">Load more</button>
//       </div>
//     </div>`;
//   },

//   // Event handlers and interactive functionalities
//   after_render: () => {
//     const btn = document.getElementById("load");
//     let index = 0;
//     btn.addEventListener("click", async () => {
//       const locationDetails = await API.fetchLocationDetails(input, token);
//       const template = document.getElementById("location-details-layout");
//       const data = locationDetails.map(MapLocation.render).join("\n");
//       template.insertAdjacentHTML("beforeend", data);
//       if (locationDetails.length === 0) {
//         btn.disabled = true;
//         btn.innerText = "no more location details";
//       }
//     });
//   },
// };

// export default MapBlog;
