// src/components/GeocoderInput.js
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaHZxdzJrMDBhbjkzZm4weXI1bGlybTMifQ.oQDmvQmIA04AVPDNOV-l8Q';

export function createGeocoderInput(features) {
  const forwardGeocoder = (query) => {
    const matchingFeatures = [];
    const storeMatches = [];
    const locationMatches = [];

    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      if (feature.properties.title.toLowerCase().includes(query.toLowerCase()) ||
          feature.properties.address.toLowerCase().includes(query.toLowerCase())) {
        // Map matching feature to the format expected by Mapbox Geocoder
        const match = {
          place_name: feature.properties.title,  // Displayed suggestion
          center: feature.geometry.coordinates,  // Used to position the marker on selection
          geometry: feature.geometry,  // Used to position the marker on selection
          // Include any additional data you want accessible when a suggestion is selected
          properties: feature.properties
        };
        if (feature.properties.headline) {
          storeMatches.push(match);
        } else {
          locationMatches.push(match);
        }
      }
    }

    // Prioritize store matches over location matches
    return [...storeMatches, ...locationMatches];
  };

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search Stores and Locations',
    localGeocoder: forwardGeocoder,
    flyTo: false,
    trackProximity: true,
    render: function(item) {
      const locationIcon = '<span class="location-icon">📍</span>';
      const storeIcon = '<span class="store-icon">🏪</span>';
      const isStore = item.properties.headline;
      const icon = isStore ? storeIcon : locationIcon;

      return `${icon} ${item.place_name}`;
    }
  });

  return geocoder;
}





// const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
//     });
     
//     document.getElementById('geocoder').appendChild(geocoder.onAdd(map));