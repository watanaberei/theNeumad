////////////////////////////////// API //////////////////////////////////
// MAPBOX
import mapRoute from "./mapRoute";
import polyline from '@mapbox/polyline';
import mapboxgl from "mapbox-gl";
import { initMap } from "./MapApi";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Style2DPrimary, StyleSatellitePrimary } from "./MapStyles";
import * as turf from '@turf/turf';
import GeopostReviews from "./GeopostReviews";
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
// STRUCTURAL COMPONENTS
import { getParentDivForVariant } from "./listingVariant";
// OLD COMPONENTS
import DataBlog from "./DataPost";
import DinePost from "./DineBlog";
import DineFeaturedBlog from "./DineFeaturedBlog";
import FeaturedBlog from "./FeaturedBlog";
import Blog from "./Blog";
import ArticlePost from "./NonFeaturedBlog";
// OLD BLOG COMPONENTS
import PrimaryFeaturedBlog from "./PrimaryFeaturedBlog";
import ShortsBlog from "./ShortsBlog";
import ShortsFeaturedBlog from "./ShortsFeaturedBlog";
import UnwindBlog from "./UnwindBlog";
import UnwindFeaturedBlog from "./UnwindFeaturedBlog";
import WorkBlog from "./WorkBlog";
import WorkFeaturedBlog from "./WorkFeaturedBlog";

////////////////////////////////// STORE //////////////////////////////////
import { storePopularTimes } from "./StorePopularTimes";

////////////////////////////////// GLOBAL //////////////////////////////////
// import Advertisement from "./Advertisement";
import GridOverlay from "./gridOverlay";

////////////////////////////////// DATA //////////////////////////////////
// import AllStore from "./AllStore";
// import ArticleNeumadsTrail from "./ArticleNeumadsTrail";

////////////////////////////////// SEARCH //////////////////////////////////
import DataFilter from "./DataFilter";
import Search from "./Search";
import SearchFunction from "./SearchFunction";
import SearchResultsCategory from "./SearchResultsCategory";
import SearchResultsLocation from "./SearchResultsLocation";
import allTags from './DataTags';

export { 
    mapRoute,
    polyline,
    mapboxgl,
    initMap,
    MapboxGeocoder,
    Style2DPrimary,
    StyleSatellitePrimary,
    turf,
    GeopostReviews,
    getStoresNeumadsReview,
    getArticleNeumadsTrail,
    getArticlePost,
    getStore,
    documentToHtmlString,
    BLOCKS,
    INLINES,
    YelpReviews,
    YelpApi,
    fetchDateTime,
    processGroupedItems,
    getWeather,
    geojsonStore,
    AllBlog,
    DineScreen,
    parseRequestUrl,
    format,
    parseISO,
    createArticleCard,
    createBlogCard,
    createDefaultCard,
    createReviewCard,
    createStoreCard,
    createMapMarker,
    createGeojsonListing,
    createGeojsonStoreListing,
    createGeojsonReviewListing,
    createGeojsonArticleListing,
    createGeojsonBlogListing,
    createGeocoderInput,
    getParentDivForVariant,
    DataBlog,
    DinePost,
    DineFeaturedBlog,
    FeaturedBlog,
    Blog,
    ArticlePost,
    PrimaryFeaturedBlog,
    ShortsBlog,
    ShortsFeaturedBlog,
    UnwindBlog,
    UnwindFeaturedBlog,
    WorkBlog,
    WorkFeaturedBlog,
    storePopularTimes,
    GridOverlay,
    // AllStore,
    // ArticleNeumadsTrail,
    DataFilter,
    Search,
    SearchFunction,
    SearchResultsCategory,
    SearchResultsLocation,
    allTags
 }