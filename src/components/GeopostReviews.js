// src/component/GeopostReviews.js
import { getArticleNeumadsTrail } from '../api';

class GeopostReviews {
  constructor() {
    this.stores = null;
    this.mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww';
    this.map = null;
  }

  async initializeMap() {
    this.stores = await this.getStoreData();
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/neumad/cli7nxj9700wz01r50nn9d19d',
      center: [this.stores.features[0].geometry.coordinates[0], this.stores.features[0].geometry.coordinates[1]],
      zoom: 13,
      scrollZoom: false
    });

    // Proceed with the same map functionalities as in the MapApi.js file...
  }

  async getStoreData() {
    let articles = await getArticleNeumadsTrail();
    let features = articles.map((article, i) => {
      let feature = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            article.storeNeumadsReviewCollection.storeGeolocation.lon,
            article.storeNeumadsReviewCollection.storeGeolocation.lat
          ]
        },
        "properties": {
          "id": i,
          "address": article.storeNeumadsReviewCollection.address,
          "phone": article.storeNeumadsReviewCollection.phone,
          // Add here the other properties required for the marker...
        }
      };
      return feature;
    });

    return {
      "type": "FeatureCollection",
      "features": features
    };
  }

  // Add here other functions like addMarkers(), buildLocationList()...
}

export default GeopostReviews;
