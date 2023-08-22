// ../components/HeaderHome.js
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import DineScreen from '../screens/DineScreen'
let lastSelectedResult = null;
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Location',
  flyTo: false
});
geocoder.on('result', function(e) {
  lastSelectedResult = e.result;
});
const HeaderHome = {
  render: async () => {
    return `
      <div id="search-bar">
        <input type="text" id="category" placeholder="Category" />
        <div id='geocoder' class='geocoder'></div>
        <button id="search-btn">Search</button>
      </div>
    `;
  },
after_render: async (map) => {
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    document.getElementById('search-btn').addEventListener('click', function() {
      // Your search button click handler code here...
    });
  },
  getLastSelectedResult: () => lastSelectedResult
};
export default HeaderHome;