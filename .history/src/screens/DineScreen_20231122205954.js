
// src/screens/DineScreen.js
import mapboxgl from "mapbox-gl";
import { initMap } from "../components/MapApi";
import { geojsonStore } from "../components/GeojsonStores";
import { createMapMarker } from "../components/MapMarker";
import { createGeojsonListing } from "../components/GeojsonListing";
import { createGeocoderInput } from "../components/GeocoderInput";
import AllBlog from "../components/AllBlog.js"; // Import AllBlog component
import storeSelectedLocation from "../components/Header";
import {mapRoute} from "../components/mapRoute";
import polyline from '@mapbox/polyline';
import HeaderHome from '../components/HeaderHome'

const DineScreen = {
  render: async () => {
    return `
    <!--
    <div class="grid platinum postContainer">
    <div id="postListing" class="m postListing"></div>
    <div class="s map" id="map">
      <div id="map-container" class="fullBleed"></div>
    </div>
  </div>
    --> 


 
    <div class="map-container grid platinum postContainer">
      <div class="m sidebar">
        <div class="heading">
          <span class="header01">Nearby Stores</span>
        </div>
        <div id="postListing" class="postListing"></div>
      </div>
      <div class="s map" id="map">
        <div id="map-container" class="fullBleed"></div>
      </div>
    </div>
    `;
  },
  after_render: async () => {
    // mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsa3R6aG93YzAyeDUzZXBoY2h6ZDBjN2gifQ.ef675JLTqdzPlw1tu_wHOA';
    // const map = initMap();
    const map = initMap();
    window.map = map;
    const { features } = await geojsonStore();
  

    // Add marker logic from DineScreen
    var markers = [];
    features.forEach(function(marker) {
      var el = document.createElement('div');
      el.className = 'marker';
      var newMarker = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + marker.properties.title + '</h3><p>'  + '<div id="category">' + marker.properties.category + '</div>'+ marker.properties.address + '</p>'))
        .addTo(map);
      markers.push({marker: newMarker, feature: marker});
    });






    // mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww'; 
    // var map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-74.5, 40], // starting position
    //   zoom: 9 // starting zoom
    // });

    // const { features } = await geojsonStore();

    // // Add marker logic from DineScreen
    // var markers = [];
    // features.forEach(function(marker) {
    //   var el = document.createElement('div');
    //   el.className = 'marker';
    //   var newMarker = new mapboxgl.Marker(el)
    //     .setLngLat(marker.geometry.coordinates)
    //     .setPopup(new mapboxgl.Popup({ offset: 25 })
    //     .setHTML('<h3>' + marker.properties.title + '</h3><p>'  + '<div id="category">' + marker.properties.category + '</div>'+ marker.properties.address + '</p>'))
    //     .addTo(map);
    //   markers.push({marker: newMarker, feature: marker});
    // });




    const geocoder = createGeocoderInput( HeaderHome.getLastSelectedResult());
          // FROM MAPSCREEN
    geocoder.on("result", function (result) {
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
      } else {
        geocoder.on("result", function (event) {
          const store = {
            geometry: {
              coordinates: event.result.geometry.coordinates,
            },
          };
          const bbox = event.result.bbox;
          flyToSearch(store, map, bbox);
        });
      }
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

    const categories = markers.map(m => m.feature.properties.category);
    console.log("categories: ", categories);
      var allMarkers = markers;        

      document.getElementById('search-btn').addEventListener('click', function() {
        var location = HeaderHome.getLastSelectedResult();
        var category = document.getElementById('category').value;
        if (category || location) {
          allMarkers.forEach(m => {
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
        }
        geocoder.on('clear', () => {
          results.innerText = '';
        });
        HeaderHome.after_render(map);
      });

  },
};



function setCurrentLocation(map, features) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      const listing = createGeojsonListing(store, map, userCoordinates);

      const userLocationMarker = createUserLocationMarker(userCoordinates, map);
      const mapBounds = map.getBounds();
      const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
      const sortedFeatures = sortFeaturesByDistance(
        filteredFeatures,
        userCoordinates
      );
      renderFeatures(sortedFeatures, map);

      zoomToShowAtLeastThreePins(map, features, userCoordinates);
      let correctedUserCoordinates = [userCoordinates[1], userCoordinates[0]];
      mapRoutes(correctedUserCoordinates, features);  // call mapRoute here
    });
  } else {
    renderFeatures(features, map);
  }
}
function mapRoutes(userCoordinates, features) {
  features.forEach((feature, index) => {
    // Ensure coordinates are in the right order [longitude, latitude]
    const YOUR_MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsa3R6aG93YzAyeDUzZXBoY2h6ZDBjN2gifQ.ef675JLTqdzPlw1tu_wHOA";
    let userLonLat = [userCoordinates[1], userCoordinates[0]];
    let featureLonLat = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/-118.174%2C33.85325%3B-118.08%2C33.8582?alternatives=false&geometries=polyline&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsa3R6aG93YzAyeDUzZXBoY2h6ZDBjN2gifQ.ef675JLTqdzPlw1tu_wHOA`;


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
  document.getElementById("postListing").innerHTML = "";
  features.forEach((store) => {
    const onClick = (store) => {
      flyToStore(store, map);
      createPopUp(store, map);
    };

    const marker = createMapMarker(store, map, onClick); // Changed 'feature' to 'store'
    const listing = createGeojsonListing(store, onClick);

    document.getElementById("postListing").appendChild(listing);
  });
}

// ... [rest of t

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
      <i class="icon-${store.properties.category}"></i>
        <span class="text01">${store.properties.category}</span>
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
function createUserLocationMarker(userLocation, map) {
  const marker = document.createElement("div");
  marker.className = "icon-mapMarker-userLocation";
  return new mapboxgl.Marker(marker).setLngLat(userLocation).addTo(map);
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

