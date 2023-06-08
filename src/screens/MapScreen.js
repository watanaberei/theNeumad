// src/screens/MapScreen.js
import { getArticleNeumadsTrail } from "../api.js";
import MapApi from '../components/MapApi.js';



const MapScreen = {
  render: async () => {
    return `
    <div class="content">
      <div class="mapContainer">
        <div class="sidebar">
          <div class="heading">
            <h1>Nearby Articles</h1>
          </div>
          <div id="listings" class="listings"></div>
        </div>
        <div id="map" class="map"></div>
      </div> 
    </div>
    `;
  },
  after_render: async () => {
    const mapComponent = new MapApi();
    
    const contentElement = document.getElementById("content");
    const listingsElement = contentElement.querySelector("#listings");
    const mapElement = contentElement.querySelector("#map");

    console.log("Listings Element:", listingsElement); // Add logging
    console.log("Map Element:", mapElement); // Add logging

    const mapData = await getArticleNeumadsTrail();
    console.log("Map Data:", mapData); // Add logging

    mapComponent.initializeMap(mapData, mapElement, listingsElement);
    console.log("mapComponent has been loaded", mapData);
  }
};

export default MapScreen;












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
