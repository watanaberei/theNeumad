// src/screens/MapScreen.js
import mapboxgl from "mapbox-gl";
import { geojsonStore } from "../components/GeojsonStores";
import { createMapMarker } from "../components/MapMarker";
import { createGeojsonListing } from "../components/GeojsonListing";
import { createGeocoderInput } from "../components/GeocoderInput";
import AllBlog from "../components/AllBlog.js"; // Import AllBlog component
import {mapRoute} from "../components/mapRoute";
import polyline from '@mapbox/polyline';
import HeaderHome from '../components/HeaderHome';

const DineScreen = {
  render: async () => {
    return `
      <div id='map'></div>
    `;
  },
  after_render: () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww'; 
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // starting position
      zoom: 9 // starting zoom
    });
  

  
    var geojson = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "title": "Rose Park Roasters: A Rare Gem Glowing in the Heart of Long Beach",
            "category": "Work",
            "address": "800 Pine Ave Long Beach, CA 90813"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-118.192, 33.77673]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Rose dffdfs Roasters: A Rare Gem Glowing in the Heart of Long Beach",
            "category": "Rest",
            "address": "-122.678, 43.1523 800 Pine Ave Long Beach, CA 90813"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-122.678, 43.51523]
          }
        },
            {
          "type": "Feature",
          "properties": {
            "title": "Rose Park Roasters: A Rare Gem Glowing in the Heart of Long Beach",
            "category": "Dine",
            "address": "Portland, OR, USA"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-122.678, 46.1523]
          }
        },
            {
          "type": "Feature",
          "properties": {
            "title": "Good Price, Quality, and Flexible Hotel Soho NYC",
            "category": "Rest",
            "address": "800 Pine Ave Long Beach, CA 90813"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-73.96297436557998, 40.68799963860863]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Good Price, Quality, and Flexible Hotel Soho NYC",
            "category": "Dine",
            "address": "800 Pine Ave Long Beach, CA 90813"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-74.96297436557998, 39.68799963860863]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "title": "Good Price, Quality, and Flexible Hotel Soho NYC",
            "category": "Work",
            "address": "800 Pine Ave Long Beach, CA 90813"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [-74.36297436557998, 40.68799963860863]
          }
        },
      ]
    };
    var markers = [];
    geojson.features.forEach(function(marker) {
      var el = document.createElement('div');
      el.className = 'marker';
      var newMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + marker.properties.title + '</h3><p>'  + '<div id="category">' + marker.properties.category + '</div>'+ marker.properties.address + '</p>'))
        .addTo(map);
      markers.push({marker: newMarker, feature: marker});
    });
    
    const categories = markers.map(m => m.feature.properties.category);
    console.log("categories: ", categories);
        // Store all markers in a separate variable
        var allMarkers = markers;
    document.getElementById('search-btn').addEventListener('click', function() {
      var location = HeaderHome.getLastSelectedResult();
      var category = document.getElementById('category').value;
      if (category || location) {
        allMarkers.forEach(m => {
          // If the marker does not match the filter, change its style
          if (!category || m.feature.properties.category.toLowerCase() !== category.toLowerCase()) {
            var el = m.marker.getElement();
            el.id = 'markerInactive';
          } else {
            var el = m.marker.getElement();
            el.id = 'markerActive';
          }
        });
       
        if (location) {
          map.flyTo({center: location.geometry.coordinates, zoom: 14});
        }
      } else {
        alert('Please enter a category or select a location');
      } HeaderHome.after_render(map);
    });
  },
};
export default DineScreen;








// // src/screens/MapScreen.js
// import mapboxgl from "mapbox-gl";
// import { initMap } from "../components/MapApi";
// import { geojsonStore } from "../components/GeojsonStores";
// import { createMapMarker } from "../components/MapMarker";
// import { createGeojsonListing } from "../components/GeojsonListing";
// import { createGeocoderInput } from "../components/GeocoderInput";
// import AllBlog from "../components/AllBlog.js"; // Import AllBlog component
// import storeSelectedLocation from "../components/Header";
// import {mapRoute} from "../components/mapRoute";
// import polyline from '@mapbox/polyline';
// // import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import HeaderHome from '../components/HeaderHome';

// // import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// const DineScreen = {
//   render: async () => {
//     return `
    
//       <div id='map'></div>
//     `;
//   },
//   after_render: () => {
//     HeaderHome.after_render(map);
//     mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww'; 
//     var map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [-74.5, 40], // starting position
//       zoom: 9 // starting zoom
//     });
//     // var geocoder = new MapboxGeocoder({
//     //   accessToken: mapboxgl.accessToken,
//     //   mapboxgl: mapboxgl,
//     //   placeholder: 'Location',
//     //   flyTo: false // Disable the default behavior to fly to the location
//     // });

//     // geocoder.on('result', function(e) {
//     //   lastSelectedResult = e.result;
//     // });
    

//     // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
//     var geojson = {
//       "type": "FeatureCollection",
//       "features": [
//         {
//           "type": "Feature",
//           "properties": {
//             "title": "Rose Park Roasters: A Rare Gem Glowing in the Heart of Long Beach",
//             "category": "Work",
//             "address": "800 Pine Ave Long Beach, CA 90813"
//           },
//           "geometry": {
//             "type": "Point",
//             "coordinates": [-118.192, 33.77673]
//           }
//         },
//         {
//           "type": "Feature",
//           "properties": {
//             "title": "Rose dffdfs Roasters: A Rare Gem Glowing in the Heart of Long Beach",
//             "category": "Rest",
//             "address": "-122.678, 43.1523 800 Pine Ave Long Beach, CA 90813"
//           },
//           "geometry": {
//             "type": "Point",
//             "coordinates": [-122.678, 43.51523]
//           }
//         },
//             {
//           "type": "Feature",
//           "properties": {
//             "title": "Rose Park Roasters: A Rare Gem Glowing in the Heart of Long Beach",
//             "category": "Dine",
//             "address": "Portland, OR, USA"
//           },
//           "geometry": {
//             "type": "Point",
//             "coordinates": [-122.678, 46.1523]
//           }
//         },
//             {
//           "type": "Feature",
//           "properties": {
//             "title": "Good Price, Quality, and Flexible Hotel Soho NYC",
//             "category": "Rest",
//             "address": "800 Pine Ave Long Beach, CA 90813"
//           },
//           "geometry": {
//             "type": "Point",
//             "coordinates": [-73.96297436557998, 40.68799963860863]
//           }
//         },
//         {
//           "type": "Feature",
//           "properties": {
//             "title": "Good Price, Quality, and Flexible Hotel Soho NYC",
//             "category": "Dine",
//             "address": "800 Pine Ave Long Beach, CA 90813"
//           },
//           "geometry": {
//             "type": "Point",
//             "coordinates": [-74.96297436557998, 39.68799963860863]
//           }
//         },
//         {
//           "type": "Feature",
//           "properties": {
//             "title": "Good Price, Quality, and Flexible Hotel Soho NYC",
//             "category": "Work",
//             "address": "800 Pine Ave Long Beach, CA 90813"
//           },
//           "geometry": {
//             "type": "Point",
//             "coordinates": [-74.36297436557998, 40.68799963860863]
//           }
//         },
//       ]
//     };

   

//     var markers = [];
//     geojson.features.forEach(function(marker) {
//       var el = document.createElement('div');
//       el.className = 'marker';
//       var newMarker = new mapboxgl.Marker(el)
//         .setLngLat(marker.geometry.coordinates)
//         .setPopup(new mapboxgl.Popup({ offset: 25 })
//         .setHTML('<h3>' + marker.properties.title + '</h3><p>'  + '<div id="category">' + marker.properties.category + '</div>'+ marker.properties.address + '</p>'))
//         .addTo(map);
//       markers.push({marker: newMarker, feature: marker});
//     });
//     // let lastSelectedResult = null;
    
//     const categories = markers.map(m => m.feature.properties.category);
//     console.log("categories: ", categories);
//         // Store all markers in a separate variable
//         var allMarkers = markers;
    
    
//     // document.getElementById('search-btn').addEventListener('click', function() {
//     //   var category = document.getElementById('category').value;
//     //   var location = lastSelectedResult;
//     //   if (category || location) {
//     //     allMarkers.forEach(m => m.marker.remove());
//     //     var filteredMarkers = allMarkers;
//     //     if (category) {
//     //       filteredMarkers = allMarkers.filter(m => m.feature.properties.category.toLowerCase() === category.toLowerCase());
//     //     }
//     //     filteredMarkers.forEach(m => m.marker.addTo(map));
//     //     if (location) {
//     //       map.flyTo({center: location.geometry.coordinates, zoom: 14}); // Fly to the location when the search button is clicked
//     //     }
//     //   } else {
//     //     alert('Please enter a category or select a location');
//     //   }
//     // });
//     document.getElementById('search-btn').addEventListener('click', function() {
//       var location = HeaderHome.getLastSelectedResult();
//       var category = document.getElementById('category').value;
//       if (category || location) {
//         allMarkers.forEach(m => {
//           // If the marker does not match the filter, change its style
//           if (!category || m.feature.properties.category.toLowerCase() !== category.toLowerCase()) {
//             var el = m.marker.getElement();
//             el.id = 'markerInactive';
//             // el.style.backgroundColor = 'black';
//             // el.style.width = '9px';
//             // el.style.height = '9px';
//           } else {
//             // If the marker matches the filter, reset its style
//             var el = m.marker.getElement();
//             el.id = 'markerActive';
//             // el.style.backgroundColor = ''; // Reset to the original color
//             // el.style.width = ''; // Reset to the original width
//             // el.style.height = ''; // Reset to the original height
//           }
//         });
//         if (location) {
//           map.flyTo({center: location.geometry.coordinates, zoom: 14});
//         }
//       } else {
//         alert('Please enter a category or select a location');
//       }
//     });
//   },
// };

// export default DineScreen;