// src/components/MapApi.js
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q";

export function initMap() {
  const defaultCoordinates = [-118.1937, 33.7701]; // Long Beach coordinates

  const map = new mapboxgl.Map({
    container: "map-container",
    // style: "mapbox://styles/neumad/clj0u2c9b00o601pw61e31wdc",
    style: "mapbox://styles/neumad/clj35mzky00sa01q1btc85vwz",
    // style: "mapbox://styles/neumad/cljbyenya003401ps5vqkdya3",
    center: defaultCoordinates,
    pitch: 0,
    bearing: 0,
    zoom: 12,
  });

  // Boundaries
  map.on("load", function () {
    map.resize();

    // -----------------FOG----------------- //
    map.setFog({
      range: [-1, 2],
      "horizon-blend": 0.15,
      color: "white",
      "high-color": "#add8e6",
      "space-color": "#d8f2ff",
      "star-intensity": 0.0,
    });
    // -----------------FOG----------------- //

    // map.setPaintProperty('building', 'fill-opacity', [
    //   'interpolate',
    //   // Set the exponential rate of change to 0.5
    //   ['exponential', 0.5],
    //   ['zoom'],
    //   // When zoom is 10, buildings will be 100% transparent.
    //   ,
    //   0.5,
    //   // When zoom is 18 or higher, buildings will be 100% opaque.
    //   18,
    //   1
    //   ]);
    map.addSource('my-building-footprints', {
      type: 'vector',
      url: '_assets/geojson/building/RhodeIsland.ldgeojson'
      });
      // Use the source to add a layer to the map.
      map.addLayer({
      'id': 'buildings-i1',
      'type': 'line',
      'source': 'my-building-footprints',
      'source-layer': 'building_footprints',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#ff69b4',
      'line-width': 1
      }
      });


    // -----------------BOUNDARIES----------------- //
    // // Add a vector source for admin-1 boundaries
    // map.addSource("admin-1", {
    //   type: "vector",
    //   url: "mapbox://mapbox.boundaries-adm1-v4",
    //   promoteId: "mapbox_id",
    // });

    // // Define a filter for US worldview boundaries
    // let worldviewFilter = [
    //   "any",
    //   ["==", "all", ["get", "worldview"]],
    //   ["in", "US", ["get", "worldview"]],
    // ];

    // Add a style layer with the admin-1 source below map labels
    // map.addLayer(
    //   {
    //     id: "admin-1-fill",
    //     type: "fill",
    //     source: "admin-1",
    //     "source-layer": "boundaries_admin_1",
    //     filter: worldviewFilter,
    //     paint: {
    //       "fill-color": "#CCCCCC",
    //       "fill-opacity": 0.5,
    //     },
    //   },
    //   // This final argument indicates that we want to add the Boundaries layer
    //   // before the `waterway-label` layer that is in the map from the Mapbox
    //   // Light style. This ensures the admin polygons are rendered below any labels
    //   "waterway-label"
    // );

    map.addSource("counties", {
      type: "vector",
      url: "mapbox://mapbox.82pkq93d",
    });

    // map.addLayer(
    //   {
    //     id: "counties",
    //     type: "fill",
    //     source: "counties",
    //     "source-layer": "original",
    //     paint: {
    //       "fill-outline-color": "rgba(0,0,0,0.1)",
    //       "fill-color": "rgba(0,0,0,0.1)",
    //     },
    //   },
    //   // Place polygons under labels, roads and ildings.
    //   "building"
    // );

    map.addLayer(
      {
        id: "counties-highlighted",
        type: "fill",
        source: "counties",
        "source-layer": "original",
        // paint: {
        //   "fill-outline-color": "#484896",
        //   "fill-color": "#6e599f",
        //   "fill-opacity": 0.75,
        // },
        filter: ["in", "FIPS", ""],
      },
      // Place polygons under labels, roads and buildings.
      "building"
    );

    // COUNTY

    // -----------------BOUNDARIES----------------- //
    // CITY
    // map.addSource("city-boundaries", {
    //   type: "geojson",
    //   data: "https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/county_unemployment/data.geojson",
    // });

    // // Create a layer to display city boundaries
    // map.addLayer({
    //   id: "city-boundaries-layer",
    //   type: "line",
    //   source: "city-boundaries",
    //   // paint: {
    //   //   "line-color": "#000",
    //   //   "line-width": 1,
    //   // },
    // });
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
      // paint: {
      //   "circle-radius": 8,
      //   "circle-color": "rgba(55,148,179,1)",
      // },
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
        // paint: {
        //   "fill-extrusion-color": "#aaa",

        //   // Use an 'interpolate' expression to
        //   // add a smooth transition effect to
        //   // the buildings as the user zooms in.
        //   "fill-extrusion-height": [
        //     "interpolate",
        //     ["linear"],
        //     ["zoom"],
        //     15,
        //     0,
        //     15.05,
        //     ["get", "height"],
        //   ],
        //   "fill-extrusion-base": [
        //     "interpolate",
        //     ["linear"],
        //     ["zoom"],
        //     15,
        //     0,
        //     15.05,
        //     ["get", "min_height"],
        //   ],
        //   "fill-extrusion-opacity": 0.6,
        // },
      },
      labelLayerId
    );
  });

//   const layer = map
// .getStyle()
// .layers.find((layer) => layer.id === 'natural-point-label');
// // Add in a pitch condition to the existing layers filter
// // so that it only renders when the pitch is low
// const lowPitchFilter = ['all', layer.filter, ['<', ['pitch'], 60]];
// map.setFilter('natural-point-label', lowPitchFilter);
 
// // Add in styling for leader lines into the layer
// layer.id = 'natural-point-label-elevated';
// // Add a leader line using `icon-image`
// layer.layout['icon-image'] = 'leader_line';
// layer.layout['icon-anchor'] = 'bottom';
// // Elevate the text using text-offset
// layer.layout['text-offset'] = [0, -12.5];
// // Set the filter to only render at high pitch
// const highPitchFilter = ['all', layer.filter, ['>=', ['pitch'], 60]];
// layer.filter = highPitchFilter;
 
// // Add in a new layer with the updated styling
// map.addLayer(layer, 'natural-point-label');
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

  // Run a timing loop to switch between day and night

  // function frame(time) {
  //   const elapsedTime = (time - lastTime) / 1000.0;

  //   animationTime += elapsedTime;
  //   cycleTime += elapsedTime;

  //   if (cycleTime >= 10.0) {
  //     if (night) {
  //       // night fog styling
  //       map.setFog({
  //         range: [-1, 2],
  //         "horizon-blend": 0.3,
  //         color: "#242B4B",
  //         "high-color": "#161B36",
  //         "space-color": "#0B1026",
  //         "star-intensity": 0.8,
  //       });
  //     } else {
  //       // day fog styling
  //       map.setFog({
  //         range: [-1, 2],
  //         "horizon-blend": 0.3,
  //         color: "white",
  //         "high-color": "#add8e6",
  //         "space-color": "#d8f2ff",
  //         "star-intensity": 0.0,
  //       });
  //     }

  //     night = !night;
  //     cycleTime = 0.0;
  //   }

  //   const rotation = initialBearing + animationTime * 2.0;
  //   map.setBearing(rotation % 360);

  //   lastTime = time;

  //   window.requestAnimationFrame(frame);
  // }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [
        position.coords.longitude,
        position.coords.latitude,
      ];
      map.setCenter(userCoordinates);
    });
  }
  // window.requestAnimationFrame(frame);
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
