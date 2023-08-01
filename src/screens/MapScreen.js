// src/screens/MapScreen.js
import mapboxgl from "mapbox-gl";
import { initMap } from "../components/MapApi";
import { geojsonStore } from "../components/GeojsonStores";
import { createMapMarker } from "../components/MapMarker";
import { createGeojsonListing } from "../components/GeojsonListing";
import { createGeocoderInput } from "../components/GeocoderInput";
import AllBlog from "../components/AllBlog.js"; // Import AllBlog component

const MapScreen = {
  render: () => {
    return `
      <div class="grid platinum blogContainer">
        <div id="blogListing" class="m blogListing"></div>
        <div class="s map">
          <div id="map-container" class="fullBleed"></div>
        </div>
      </div>
    `;
},
  after_render: async () => {
    const map = initMap();
    window.map = map;
    const { features } = await geojsonStore();

    // console.log("features", features);
    const geocoder = createGeocoderInput(features);
    document
      .getElementById("geocoder")
      .appendChild(geocoder.onAdd(map));
    
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
          // paint: {
          //   "line-color": "#f00",
          //   "line-width": 3,
          // },
          filter: ["==", "NAME", searchedCityName],
        });

        map.addLayer({
          id: "searched-city-fill",
          type: "fill",
          source: "city-boundaries",
          // paint: {
          //   "fill-color": "#ff0000",
          //   "fill-opacity": 31,
          // },
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
          // Place polygons under labels, roads and buildings.
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
      // Set `bbox` as 5px reactangle area around clicked point.
      const bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5],
      ];
      // Find features intersecting the bounding box.
      const selectedFeatures = map.queryRenderedFeatures(bbox, {
        layers: ["counties"],
      });
      const fips = selectedFeatures.map((feature) => feature.properties.FIPS);
      // Set a filter matching selected features by FIPS codes
      // to activate the 'counties-highlighted' layer.
      map.setFilter("counties-highlighted", ["in", "FIPS", ...fips]);
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.name)
        .addTo(map);
    });

    setCurrentLocation(map, features);
  },
};

function setCurrentLocation(map, features) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      const userLocationMarker = createUserLocationMarker(userCoordinates, map);

      const mapBounds = map.getBounds();
      const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
      const sortedFeatures = sortFeaturesByDistance(
        filteredFeatures,
        userCoordinates
      );
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
  document.getElementById("blogListing").innerHTML = "";
  features.forEach((store) => {
    const onClick = (store) => {
      flyToStore(store, map);
      createPopUp(store, map);
    };

    const marker = createMapMarker(store, map, onClick);
    const listing = createGeojsonListing(store, onClick);

    document.getElementById("blogListing").appendChild(listing);
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

function createUserLocationMarker(coordinates, map) {
  const marker = document.createElement("div");
  marker.className = "icon-mapMarker-userLocation";

  return new mapboxgl.Marker(marker).setLngLat(coordinates).addTo(map);
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
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default MapScreen;













