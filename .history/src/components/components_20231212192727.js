////////////////////////////////// API //////////////////////////////////
// MAPBOX
import mapRoute from "./mapRoute";
import polyline from '@mapbox/polyline';
import mapboxgl from "mapbox-gl";
import { initMap } from "./MapApi";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Style2DPrimary, StyleSatellitePrimary } from "./MapStyles";
import * as turf from '@turf/turf';

// CONTENTFUL
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// YELP
import YelpReviews from "./YelpReviews";
import { YelpApi } from "./YelpApi"; 

// TIME
import fetchDateTime from "./timeApi";

// WEATHER
import { processGroupedItems } from "./processGroupedItems";
import { getWeather } from "./weatherApi";
// import "./weatherReport";






////////////////////////////////// HOME //////////////////////////////////
// DINESCREEN COMPONENTS
import { geojsonStore } from "./GeojsonStores";
import AllBlog from "./AllBlog";
import DineScreen from '../screens/DineScreen'


////////////////////////////////// RENDERING //////////////////////////////////
// RENDER COMPONENTS
import { parseRequestUrl } from "../utils";
import { format, parseISO } from "date-fns";






////////////////////////////////// CARD //////////////////////////////////
import createArticleCard from "./card-article";
import createBlogCard from "./card-blog";
import createDefaultCard from "./card-default";
import createReviewCard from "./card-review";
import createStoreCard from "./card-store";
import { createMapMarker } from "./MapMarker";
import { createGeojsonListing } from "./GeojsonListing";
import { createGeojsonStoreListing } from "./GeojsonStoreListing";
import { createGeojsonReviewListing } from "./GeojsonReviewListing";
import { createGeojsonArticleListing } from "./GeojsonArticleListing";
import { createGeojsonBlogListing } from "./GeojsonBlogListing";
import { createGeocoderInput } from "./GeocoderInput";
// OLD COMPONENTS
import DataBlog from "./DataPost";
import DinePost from "./DineBlog";
import DineFeaturedBlog from "./DineFeaturedBlog";
import FeaturedBlog from "./FeaturedBlog";
import Blog from "./Blog";



////////////////////////////////// STORE //////////////////////////////////
import { storePopularTimes } from "./StorePopularTimes";





////////////////////////////////// GLOBAL //////////////////////////////////
import Advertisement from "./Advertisement";



////////////////////////////////// DATA //////////////////////////////////
import AllStore from "./AllStore";
import ArticleNeumadsTrail from "./ArticleNeumadsTrail";



////////////////////////////////// SEARCH //////////////////////////////////
// FILTER COMPONENTS
import DataFilter from "./DataFilter";
// SEARCH COMPONENTS
import Search from "./Search";
import SearchFunction from "./SearchFunction";
import SearchResultsCategory from "./SearchResultsCategory";
import SearchResultsLocation from "./SearchResultsLocation";

import allTags from './DataTags';
import Form from "./Form";




import GeopostReviews from "./GeopostReviews";







// import "./MapBlog";
// import "./MapFeatures";
// POST COMPONENTS
import ArticlePost from "./NonFeaturedBlog";

// BLOG COMPONENTS
import PrimaryFeaturedBlog from "./PrimaryFeaturedBlog";
import ShortsBlog from "./ShortsBlog";
import ShortsFeaturedBlog from "./ShortsFeaturedBlog";
import UnwindBlog from "./UnwindBlog";
import UnwindFeaturedBlog from "./UnwindFeaturedBlog";
import WorkBlog from "./WorkBlog";
import WorkFeaturedBlog from "./WorkFeaturedBlog";




// GRID COMPONENTS
// import "./grid";
import GridOverlay from "./gridOverlay";
import { getParentDivForVariant } from "./listingVariant";











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