// src/screens/NearbyMap.js
import { pins, blog, geolocation, user, search } from "../components/MapFeatures.js";
import { Style2DPrimary } from "../components/MapStyles.js";
import MapApi from "../components/MapApi.js";

const NearbyMap = () => {
  const initializeMap = () => {
    mapboxgl.accessToken = MapApi.apiKey;
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-103.5917, 40.6699],
        zoom: 3
    });

    // Add map features using imported variables (pins, blog, geolocation, user, search)
    // Example:
    map.addControl(pins);
    map.addControl(blog);
    map.addControl(geolocation);
    map.addControl(user);
    map.addControl(search);
  };

  initializeMap();
};

export default NearbyMap;
