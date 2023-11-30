
// src/screens/DineScreen.js
import mapboxgl from "mapbox-gl";
import { initMap } from "../components/MapApi";
import { geojsonStore } from "../components/GeojsonStores";
import { createMapMarker } from "../components/MapMarker";
import { createGeojsonListing } from "../components/GeojsonListing";
import { createGeojsonStoreListing } from "../components/GeojsonStoreListing";
import { createGeojsonReviewListing } from "../components/GeojsonReviewListing";
import { createGeojsonArticleListing } from "../components/GeojsonArticleListing";
import { createGeojsonBlogListing } from "../components/GeojsonBlogListing";
import { createGeocoderInput } from "../components/GeocoderInput";
import AllBlog from "../components/AllBlog.js"; // Import AllBlog component
import storeSelectedLocation from "../components/Header";
import mapRoute from "../components/mapRoute";
import polyline from '@mapbox/polyline';
import HeaderHome from '../components/HeaderHome'

const DineScreen = {
  render: async () => {
    return `
    <div class="map-container grid platinum postContainer">
      <div class="m sidebar">
        <div class="sidebar-container">

          <div class="listing-item" id="listing-store">
            <div class="heading">
              <span class="header01">21 Stores</span>
            </div>
            <div id="postStore" class="postStore">
            </div>
          </div>

          <div class="listing-item" id="listing-blog">
            <div class="heading">
              <span class="header01">Blog</span>
            </div>
            <div id="postBlog" class="postBlog">
            </div>
          </div>

           <div class="listing-item" id="listing-article">
            <div class="heading">
              <span class="header01">Article</span>
            </div>
            <div id="postArticle" class="postArticle">
            </div>
          </div>

          <div class="listing-item" id="listing-review">
            <div class="heading">
              <span class="header01">Reviewed</span>
            </div>
            <div id="postReview" class="postReview">
            </div>
          </div>

          <div class="listing-item" id="listing-store">
            <div class="heading">
              <span class="header01">Nearby Stores</span>
            </div>
            <div id="postListing" class="postListing">
            </div>
          </div>

        </div>
      </div>
      <div class="s map" id="map">
        <div id="map-container" class="fullBleed"></div>
      </div>
    </div>
    `;
  },
  after_render: async () => {
    const map = initMap();
    window.map = map;
    const { features } = await geojsonStore();

    // console.log("features",features)

    // Initialize the geocoder object
    const geocoder = createGeocoderInput(HeaderHome.getLastSelectedResult());

    // Attach the 'result' event listener to the geocoder
    geocoder.on("result", handleGeocoderResult);

    // Attach the 'clear' event listener to the geocoder
    geocoder.on('clear', () => {
        results.innerText = '';
    });







        // Assuming setCurrentLocation sets a variable like this:
    // this.userLocation = { latitude: x, longitude: y };
    await setCurrentLocation();
    let userLocation;
    try {
        userLocation = await setCurrentLocation();
    } catch (error) {
        console.error('Error getting user location:', error);
        return; // Exit if location is not available
    }

    // Now you have this.userLocation to use for sorting
    const sortedFeatures = sortFeaturesByDistance(features, userLocation);

    // Filter and slice the sorted features for each category
    const seriesPosts = sortedFeatures.filter(f => f.properties.type === 'series').slice(0, 6);
    const closestStores = sortedFeatures.filter(f => f.properties.type === 'store').slice(0, 6);
    const reviewedStores = sortedFeatures.filter(f => f.properties.type === 'reviewed').slice(0, 6);
    const secondClosestStores = sortedFeatures.filter(f => f.properties.type === 'store').slice(6, 9);
    const latestNearbyBlogs = sortedFeatures.filter(f => f.properties.type === 'blog')
                                            .sort((a, b) => new Date(b.properties.date) - new Date(a.properties.date))
                                            .slice(0, 12);
    const thirdClosestStores = sortedFeatures.filter(f => f.properties.type === 'store').slice(9, 12);

    // Render each category into its respective container
    renderSection('series-posts-container', seriesPosts);
    renderSection('stores-container', closestStores);
    renderSection('reviewed-stores-container', reviewedStores);
    renderSection('second-closest-stores-container', secondClosestStores);
    renderSection('latest-nearby-blogs-container', latestNearbyBlogs);
    renderSection('third-closest-stores-container', thirdClosestStores);








    // Add marker logic from DineScreen
    var markers = [];
    features.forEach(function(marker) {
      var el = document.createElement('div');
      el.className = 'marker';
      var newMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + marker.properties.title + '</h3><p>'  + '<div id="category">' + marker.properties.categoryType + '</div>'+ marker.properties.address + '</p>'))
        .addTo(map);
      markers.push({marker: newMarker, feature: marker});
    });

    const categories = markers.map(m => m.feature.properties.categoryType);
    // console.log("categories: ", categories);
      var allMarkers = markers;        

      document.getElementById('search-btn').addEventListener('click', function() {
        var location = HeaderHome.getLastSelectedResult();
        var categoryType = document.getElementById('category').value;
        if (categoryType || location) {
          allMarkers.forEach(m => {
            if (!categoryType || m.feature.properties.categoryType.toLowerCase() !== categoryType.toLowerCase()) {
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
          alert('Please enter a categoryType or select a location');
        }
        geocoder.on('clear', () => {
          results.innerText = '';
        });
        // HeaderHome.after_render(map);
      });

      map.on("moveend", function () {
        const mapBounds = map.getBounds();
        const center = map.getCenter();
        const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
        const sortedFeatures = sortFeaturesByDistance(filteredFeatures, center);
        renderFeatures(sortedFeatures, map);
      });
      map.on("click", (e) => {
        const bbox = [
          [e.point.x - 5, e.point.y - 5],
          [e.point.x + 5, e.point.y + 5],
        ];
        const selectedFeatures = map.queryRenderedFeatures(bbox, {
          layers: ["counties"],
        });
        const fips = selectedFeatures.map((feature) => feature.properties.FIPS);
        map.setFilter("counties-highlighted", ["in", "FIPS", ...fips]);
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.name)
          .addTo(map);
      });
      setCurrentLocation(map, features);
  },
};


function handleGeocoderResult(result) {
  storeSelectedLocation(result);
  // const searchedCityName = result.result.text;
  // const cityBoundaryFeatures = map.querySourceFeatures("city-boundaries", {
  //     filter: ["==", "NAME", searchedCityName],
  // });
  const searchedCityName = result.result.text;
    
  const cityBoundaryFeatures = map.querySourceFeatures("city-boundaries", {
    filter: ["==", "NAME", searchedCityName],
  });
  geocoder.on("result", storeSelectedLocation);
  
  if (cityBoundaryFeatures.length > 0) {
    const cityBoundary = cityBoundaryFeatures[0];
    const cityBoundaryCoordinates = cityBoundary.geometry.coordinates;

    const bounds = cityBoundaryCoordinates.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(cityBoundaryCoordinates[0][0], cityBoundaryCoordinates[0][0]));

    map.fitBounds(bounds, { padding: 50, duration: 1000 });

    if (map.getLayer("searched-city-boundary")) {
      map.removeLayer("searched-city-boundary");
    }

    if (map.getLayer("searched-city-fill")) {
      map.removeLayer("searched-city-fill");
    }
    map.addLayer({
      id: "searched-city-boundary",
      type: "line",
      source: "city-boundaries",
      filter: ["==", "NAME", searchedCityName],
    }); 
    map.addLayer({
      id: "searched-city-fill",
      type: "fill",
      source: "city-boundaries",
      filter: ["==", "NAME", searchedCityName],
    });
    map.addLayer(
      {
        id: "counties",
        type: "fill",
        source: "counties",
        "source-layer": "original",
        paint: {
          "fill-outline-color": "rgba(0,0,0,0.1)",
          "fill-color": "rgba(0,0,0,0.1)",
        },
      },
      "building"
    );
  
    map.addLayer(
      {
        id: "counties-highlighted",
        type: "fill",
        source: "counties",
        "source-layer": "original",
        paint: {
          "fill-outline-color": "#484896",
          "fill-color": "#6e599f",
          "fill-opacity": 0.75,
        },
        filter: ["in", "FIPS", ""],
      },
      // Place polygons under labels, roads and buildings.
      "building"
    );
      // ... [rest of your code for handling city boundaries]
  } else {
      const store = {
          geometry: {
              coordinates: result.result.geometry.coordinates,
          },
      };
      const bbox = event.result.bbox;
      flyToSearch(store, map, bbox);
  }
}





// function setCurrentLocation(map, features) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const userCoordinates = [
//         position.coords.longitude,
//         position.coords.latitude,
//       ];
//       const userLocationMarker = createUserLocationMarker(userCoordinates, map);

//       const mapBounds = map.getBounds();
//       const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
//       const sortedFeatures = sortFeaturesByDistance(
//         filteredFeatures,
//         userCoordinates
//       );
//       renderFeatures(sortedFeatures, map);

//       zoomToShowAtLeastThreePins(map, features, userCoordinates);
//     });
//   } else {
//     renderFeatures(features, map);
//   }
// }
// Define the function to get the current location
function setCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          resolve(userLocation);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
}


function mapRoutes(userCoordinates, features) {
  features.forEach((feature, index) => {
    const YOUR_MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsa3R6aG93YzAyeDUzZXBoY2h6ZDBjN2gifQ.ef675JLTqdzPlw1tu_wHOA";
    let userLonLat = [userCoordinates[1], userCoordinates[0]];
    let featureLonLat = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLonLat[0]}%2C${userLonLat[1]}%3B${featureLonLat[0]}%2C${featureLonLat[1]}?alternatives=false&geometries=polyline&language=en&overview=simplified&steps=true&access_token=${YOUR_MAPBOX_ACCESS_TOKEN}`;


    fetch(directionsUrl)
    .then(response => response.json())
    .then(data => {
      const route = data.routes[0].geometry;
      const routeId = `route-${index}`; // Unique id for each layer
      const decoded = polyline.toGeoJSON(route);
      // console.log(decoded);
      // If layer already exists, remove it
      if (map.getLayer(routeId)) {
        map.removeLayer(routeId);
        map.removeSource(routeId);
      }

        // Add new layer
        map.addLayer({
          id: routeId,
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: decoded,  // Use decoded geometry here
            },
          },
          paint: {
            'line-width': 2,
            'line-color': '#007cbf',
          },
        });
        
      })
      .catch(error => {
        console.error(`Failed to fetch route data: ${error}`);
      });
  });
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
  const container = document.getElementById(containerId);
  if (!container) {
      console.error(`Container with ID ${containerId} not found`);
      return;
  }

  container.innerHTML = ''; // Clear the container

  features.forEach(feature => {
      let element;
      // Determine the type of feature and create the appropriate listing element
      // This is a simplified example; adjust according to your actual feature structure
      if (feature.type === 'store') {
          element = createGeojsonStoreListing(feature);
      } else if (feature.type === 'reviewed') {
          element = createGeojsonReviewListing(feature);
      } // ... and so on for other types

      if (element) {
          container.appendChild(element);
      }
  });
}

// function renderFeatures(features, map) {
//   const elements = {
//     postListing: document.getElementById("postListing"),
//     postStore: document.getElementById("postStore"),
//     postReview: document.getElementById("postReview"),
//     postArticle: document.getElementById("postArticle"),
//     postBlog: document.getElementById("postBlog")
//   };

//   // Clear out old listings
//   for (let key in elements) {
//     elements[key].innerHTML = "";
//   }

//   features.forEach((store) => {
//     const listings = {
//       postListing: createGeojsonListing(store),
//       postStore: createGeojsonStoreListing(store),
//       postReview: createGeojsonReviewListing(store),
//       postArticle: createGeojsonArticleListing(store),
//       postBlog: createGeojsonBlogListing(store)
//     };

//     for (let key in listings) {
//       if (listings[key] && listings[key].innerHTML.trim() !== "") {
//         elements[key].appendChild(listings[key]);
//       }
//     }
//   });
// }





function flyToStore(store, map) {
  map.flyTo({
    center: store.geometry.coordinates,
    zoom: 15,
    // pitch: 80,
    bearing: 41,
    essential: true,
  });

  map.once("moveend", () => {
    map.on("move", () => {
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
function flyToSearch(store, map, bbox) {
  if (bbox) {
    map.fitBounds(bbox, {
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
      maxZoom: 15,
      essential: true,
    });
  } else {
    map.flyTo({
      center: store.geometry.coordinates,
      zoom: 15,
      essential: true,
    });
  }
}
function createPopUp(store, map) {
  const popup = new mapboxgl.Popup({ closeOnClick: true, offset: 50 })
    .setLngLat(store.geometry.coordinates)
    .setHTML(
      `
      <div class="title">
        <span class="header03">${store.properties.headline}</span>
      </div>
      <div class="subtitle">
        <span class="text01">${store.properties.address}</span>
      </div>
      <div class="subtitle">
      <i class="icon-${store.properties.categoryType}"></i>
        <span class="text01">${store.properties.categoryType}</span>
      </div>
      `
    )

    .addTo(map);
}


// function createUserLocationMarker(userLocation, map) {
//   createMapMarker(userLocation, map, someClickHandlerFunction);
//   const marker = document.createElement("div");
//   marker.className = "icon-mapMarker-userLocation";
//   return new mapboxgl.Marker(marker).setLngLat(coordinates).addTo(map);
// }
function createUserLocationMarker(userCoordinates, map) {
  const marker = document.createElement("div");
  marker.className = "icon-mapMarker-userLocation";
  return new mapboxgl.Marker(marker).setLngLat(userCoordinates).addTo(map);
}
function zoomToShowAtLeastThreePins(map, features, center) {
  const zoomOut = () => {
    const mapBounds = map.getBounds();
    const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
    if (filteredFeatures.length < 3) {
      map.zoomOut(1, { around: center });
      setTimeout(zoomOut, 100);
    } else {
      renderFeatures(filteredFeatures, map);
    }
  };
  zoomOut();
}
function getDistance(coord1, coord2) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 6371e3; // Earth's radius in meters
  const lat1 = toRadians(coord1[1]);
  const lat2 = toRadians(coord2[1]);
  const deltaLat = toRadians(coord2[1] - coord1[1]);
  const deltaLng = toRadians(coord2[0] - coord1[0]);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


export default DineScreen;

