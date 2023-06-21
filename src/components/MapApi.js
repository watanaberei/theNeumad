// src/components/MapApi.js
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
"pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q";

export function initMap() {
  const defaultCoordinates = [-118.1937, 33.7701]; // Long Beach coordinates

  const map = new mapboxgl.Map({
    container: "map-container",
    style: 'mapbox://styles/mapbox/streets-v12',
    center: defaultCoordinates,
    pitch: 0,
    bearing: 0,
    minZoom: 2,
    zoom: 12,
  });


  // Boundaries
  map.on("load", function () {
    map.resize();
    // -----------------BOUNDARIES----------------- //
    map.addSource('counties', {
      'type': 'vector',
      'url': 'mapbox://mapbox.82pkq93d'
      });
       
      map.addLayer(
      {
      'id': 'counties',
      'type': 'fill',
      'source': 'counties',
      'source-layer': 'original',
      'paint': {
      'fill-outline-color': 'rgba(0,0,0,0.1)',
      'fill-color': 'rgba(0,0,0,0.1)'
      }
      },
      // Place polygons under labels, roads and buildings.
      'building'
      );
       
      map.addLayer(
      {
      'id': 'counties-highlighted',
      'type': 'fill',
      'source': 'counties',
      'source-layer': 'original',
      'paint': {
      'fill-outline-color': '#484896',
      'fill-color': '#6e599f',
      'fill-opacity': 0.75
      },
      'filter': ['in', 'FIPS', '']
      },
      // Place polygons under labels, roads and buildings.
      'building'
      );

    // COUNTY


    // -----------------BOUNDARIES----------------- //
    // CITY
    map.addSource("city-boundaries", {
      type: "geojson",
      data: "https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/county_unemployment/data.geojson",
    });

    // Create a layer to display city boundaries
    map.addLayer({
      id: "city-boundaries-layer",
      type: "line",
      source: "city-boundaries",
      paint: {
        "line-color": "#000",
        "line-width": 1,
      },
    });
    // CITY
    // -----------------BOUNDARIES----------------- //


    // -----------------POIS----------------- //
    // MUSEUMS
    map.addSource("museums", {
      type: "vector",
      url: "mapbox://mapbox.2opop9hr",
    });
    map.addLayer({
      id: "museums",
      type: "circle",
      source: "museums",
      layout: {
        // Make the layer visible by default.
        visibility: "visible",
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "rgba(55,148,179,1)",
      },
      "source-layer": "museum-cusco",
    });
    // -----------------POIS----------------- //

    
    
    // -----------------BUILDINGS----------------- //
    // 3D building
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
  ).id;

  // The 'building' layer in the Mapbox Streets
  // vector tileset contains building height data
  // from OpenStreetMap.
  map.addLayer(
    {
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    },
    labelLayerId
  );
  });
  // MUseums
  // -----------------BUILDINGS----------------- //




    // // -----------------ROADS----------------- //
    // // MUSEUMS
    // map.addSource("museums", {
    //   type: "vector",
    //   url: "mapbox://mapbox.2opop9hr",
    // });
    // map.addLayer({
    //   id: "museums",
    //   type: "circle",
    //   source: "museums",
    //   layout: {
    //     // Make the layer visible by default.
    //     visibility: "visible",
    //   },
    //   paint: {
    //     "circle-radius": 8,
    //     "circle-color": "rgba(55,148,179,1)",
    //   },
    //   "source-layer": "museum-cusco",
    // });
    // // -----------------ROADS----------------- //

    // Get user's current location and set it as the center point

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
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
