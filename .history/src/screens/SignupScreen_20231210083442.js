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
import AllBlog from "../components/AllBlog.js";
import storeSelectedLocation from "../components/Header";
import mapRoute from "../components/mapRoute";
import polyline from '@mapbox/polyline';
import HeaderHome from '../components/HeaderHome';

const DineScreen = {
  render: async () => {
    return `
    <div class="">
        Sign Up
    </div>
    `;
  },

  after_render: async () => {

    setCurrentLocation(map, features);
  },
};
