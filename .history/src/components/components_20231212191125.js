// DINESCREEN COMPONENTS
import { geojsonStore } from "./GeojsonStores";
import { createMapMarker } from "./MapMarker";
import { createGeojsonListing } from "./GeojsonListing";
import { createGeojsonStoreListing } from "./GeojsonStoreListing";
import { createGeojsonReviewListing } from "./GeojsonReviewListing";
import { createGeojsonArticleListing } from "./GeojsonArticleListing";
import { createGeojsonBlogListing } from "./GeojsonBlogListing";
import { createGeocoderInput } from "./GeocoderInput";
import AllBlog from "./AllBlog";
import DineScreen from '../screens/DineScreen'

// MAP COMPONENTS
import mapRoute from "./mapRoute";
import polyline from '@mapbox/polyline';
import mapboxgl from "mapbox-gl";
import { initMap } from "./MapApi";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';



// CONTENTFUL API
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api";
import DataBlog from "./DataPost";


// YELP API
import YelpReviews from "./YelpReviews";
import { YelpApi } from "./YelpApi"; 

// RENDER COMPONENTS
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";


import DataBlog from "./DataPost";

// STORE COMPONENTS
import { storePopularTimes } from "./StorePopularTimes";

import Advertisement from "./Advertisement";

import AllStore from "./AllStore";
import ArticleNeumadsTrail from "./ArticleNeumadsTrail";
import Blog from "./Blog";
import DataFilter from "./DataFilter";

// import allTags from "./DataTags";
import allTags from './DataTags';
import DinePost from "./DineBlog";
import DineFeaturedBlog from "./DineFeaturedBlog";
import FeaturedBlog from "./FeaturedBlog";
import Form from "./Form";




import GeopostReviews from "./GeopostReviews";

// import "./MapBlog";
// import "./MapFeatures";
import { createMapMarker } from "./MapMarker";
import { Style2DPrimary, StyleSatellitePrimary } from "./MapStyles";
import ArticlePost from "./NonFeaturedBlog";
import PrimaryFeaturedBlog from "./PrimaryFeaturedBlog";
import Search from "./Search";
import SearchFunction from "./SearchFunction";
import SearchResultsCategory from "./SearchResultsCategory";
import SearchResultsLocation from "./SearchResultsLocation";
import ShortsBlog from "./ShortsBlog";
import ShortsFeaturedBlog from "./ShortsFeaturedBlog";
import { storePopularTimes } from "./StorePopularTimes";
import UnwindBlog from "./UnwindBlog";
import UnwindFeaturedBlog from "./UnwindFeaturedBlog";
import WorkBlog from "./WorkBlog";
import WorkFeaturedBlog from "./WorkFeaturedBlog";
import createArticleCard from "./card-article";
import createBlogCard from "./card-blog";
import createDefaultCard from "./card-default";
import createReviewCard from "./card-review";
import createStoreCard from "./card-store";
import "./grid";
import GridOverlay from "./gridOverlay";
import { getParentDivForVariant } from "./listingVariant";
import mapRoute from "./mapRoute";
import { processGroupedItems } from "./processGroupedItems";
import fetchDateTime from "./timeApi";
import { getWeather } from "./weatherApi";
import "./weatherReport";








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