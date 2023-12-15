// DINESCREEN COMPONENTS
import { geojsonStore } from "../components/GeojsonStores";
import { createMapMarker } from "../components/MapMarker";
import { createGeojsonListing } from "../components/GeojsonListing";
import { createGeojsonStoreListing } from "../components/GeojsonStoreListing";
import { createGeojsonReviewListing } from "../components/GeojsonReviewListing";
import { createGeojsonArticleListing } from "../components/GeojsonArticleListing";
import { createGeojsonBlogListing } from "../components/GeojsonBlogListing";
import { createGeocoderInput } from "../components/GeocoderInput";
import AllBlog from "../components/AllBlog";
import DineScreen from '../screens/DineScreen'

// MAP COMPONENTS
import mapRoute from "../components/mapRoute";
import polyline from '@mapbox/polyline';
import mapboxgl from "mapbox-gl";
import { initMap } from "../components/MapApi";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';



// CONTENTFUL API
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api";
import DataBlog from "../components/DataPost";


// YELP API
import YelpReviews from "../components/YelpReviews";
import { YelpApi } from "../components/YelpApi"; 

// RENDER COMPONENTS
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";


import DataBlog from "../components/DataPost";

// STORE COMPONENTS
import { storePopularTimes } from "../components/StorePopularTimes";

import Advertisement from "../components/Advertisement";

import AllStore from "../components/AllStore";
import ArticleNeumadsTrail from "../components/ArticleNeumadsTrail";
import Blog from "../components/Blog";
import DataFilter from "../components/DataFilter";

import allTags from "../components/DataTags";
import DinePost from "../components/DineBlog";
import DineFeaturedBlog from "../components/DineFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import Form from "../components/Form";




import GeopostReviews from "../components/GeopostReviews";

// import "../components/MapBlog";
// import "../components/MapFeatures";
import { createMapMarker } from "../components/MapMarker";
import { Style2DPrimary, StyleSatellitePrimary } from "../components/MapStyles";
import ArticlePost from "../components/NonFeaturedBlog";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import Search from "../components/Search";
import SearchFunction from "../components/SearchFunction";
import SearchResultsCategory from "../components/SearchResultsCategory";
import SearchResultsLocation from "../components/SearchResultsLocation";
import ShortsBlog from "../components/ShortsBlog";
import ShortsFeaturedBlog from "../components/ShortsFeaturedBlog";
import { storePopularTimes } from "../components/StorePopularTimes";
import UnwindBlog from "../components/UnwindBlog";
import UnwindFeaturedBlog from "../components/UnwindFeaturedBlog";
import WorkBlog from "../components/WorkBlog";
import WorkFeaturedBlog from "../components/WorkFeaturedBlog";
import createArticleCard from "../components/card-article";
import createBlogCard from "../components/card-blog";
import createDefaultCard from "../components/card-default";
import createReviewCard from "../components/card-review";
import createStoreCard from "../components/card-store";
import "../components/grid";
import GridOverlay from "../components/gridOverlay";
import { getParentDivForVariant } from "../components/listingVariant";
import mapRoute from "../components/mapRoute";
import { processGroupedItems } from "../components/processGroupedItems";
import fetchDateTime from "../components/timeApi";
import { getWeather } from "../components/weatherApi";
import "../components/weatherReport";








export { 
    Advertisement,
    AllPost,
    AllStore,
    ArticleNeumadsTrail,
    Blog,
    DataFilter,
    DataPost,
    DataTags,
    DineBlog,
    DineFeaturedBlog,
    FeaturedBlog,
    Form,
    createGeocoderInput,
    createGeojsonArticleListing,
    createGeojsonBlogListing,
    createGeojsonListing,
    createGeojsonReviewListing,
    createGeojsonStoreListing,
    geojsonStore,
    GeopostReviews,
    initMap,
    createMapMarker,
    Style2DPrimary,
    StyleSatellitePrimary,
    ArticlePost,
    PrimaryFeaturedBlog,
    Search,
    SearchFunction,
    SearchResultsCategory,
    SearchResultsLocation,
    ShortsBlog,
    ShortsFeaturedBlog,
    storePopularTimes,
    UnwindBlog,
    UnwindFeaturedBlog,
    WorkBlog,
    WorkFeaturedBlog,
    YelpApi,
    YelpReviews,
    createArticleCard,
    createBlogCard,
    createDefaultCard,
    createReviewCard,
    createStoreCard,
    GridOverlay,
    getParentDivForVariant,
    mapRoute,
    processGroupedItems,
    fetchDateTime,
    getWeather
 }