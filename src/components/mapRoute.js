const mapbox = require('@mapbox/mapbox-sdk');
const polyline = require('@mapbox/polyline');

const baseClient = mapbox({accessToken: "sk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsazNwMGQ4eTA4NzYzcHA4cGR3MGlma3cifQ.xAuys1kIerD_X3JS6hnl4A"});

function generateRoute(map, start, end) {
  baseClient.directions.getDirections({
    profile: 'driving',
    geometries: 'polyline',
    waypoints: [
      { coordinates: start },
      { coordinates: end }
    ]
  })
  .send()
  .then(response => {
    const route = response.body.routes[0];
    const routeCoordinates = polyline.decode(route.geometry);
    drawRoute(map, routeCoordinates);
  });
}

function drawRoute(map, coordinates) {
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  }

  map.addSource('route', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': coordinates
      }
    }
  });

  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8
    }
  });
}

module.exports = {
  generateRoute
};