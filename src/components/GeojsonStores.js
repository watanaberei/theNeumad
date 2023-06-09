//src/components/GeojsonStores.js
import { getArticleNeumadsTrail } from "../api.js";
const articleNeumadsTrail = await getArticleNeumadsTrail();

export function geojsonStore(storeData) {
    const stores = articleNeumadsTrail;
  const features = stores.map(features => {
    // Extract properties from the store object
    const {
      title,
      headline: { text: headline },
      slug,
      location: { address, geolocation: { lat, lon }, type },
    //   lat: {geolocation:{lat}},
    //   log: {geolocation:{log}},
      category,
      series,
      media: { thumbnail },
      snippet: { text: snippet },
      tags,
    } = features;
    

    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [lon, lat],
      },
      "properties": {
        title,
        headline,
        slug,
        address,
        type,
        category,
        series,
        thumbnail,
        snippet,
        tags,
      },
    };
  });

  return storeData, features;
}









// const Geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [-122.41669, 37.7853],
//       },
//       properties: {
//         name: "Store Name 1",
//         address: "1234 Example St., San Francisco, CA 94110",
//         phone: "(555) 123-4567",
//       },
//     },
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [-118.1937, 33.7701],
//       },
//       properties: {
//         name: "Store Name 2",
//         address: "5678 Example Ave., Seattle, WA 98101",
//         phone: "(555) 234-5678",
//       },
//     },
//     // more store locations
//   ],
// };
// export default Geojson;






// export function geojsonStore(storeList) {
//     const stores = getArticleNeumadsTrail;
//   //console.log("stores", stores);

//     const title = stores.title;
//     const headline = stores.headline.text;
//     const slug = stores.slug;
//     const type = stores.location.type;
//     const coordinatesLat = stores.location.geolocation.lat;
//     const coordinatesLog = stores.location.geolocation.log;
//     const address = stores.location.address;
//     const featured = stores.featured;
//     const category = stores.category;
//     const series = stores.series;
//     const storeName = stores.store.storeName;
//     const storeHours = stores.store.hours;
//     const storeWebsite = stores.store.storeWebsite;
//     const neumadScore = stores.store.neumadScore;
//     const storeRating = stores.store.storeRating;
//     const storeRatingsCount = stores.store.storeRatingsCount;
//     const storeHandles = stores.store.handles;
//     const storeContact = stores.store.contact;
//     const storeBio = stores.store.storeBio.introduction;
//     const storeTags = stores.store.storeTagsCollection.tags;
//     const thumbnail = stores.media.thumbnail;
//     const snippet = stores.snippet.text;
//     const summary = stores.summary.text;
//     const amentities = stores.attriubutes.amentities;
//     const offers = stores.attriubutes.offers;
//     const tags = stores.tags.tags;

//     const features = storeList.map(store => ({
//         "type": "Feature",
//         "geometry": {
//             "type": "Point",
//             "coordinates": [store.location.geolocation.lat, store.location.geolocation.log],
//         },
//         "properties": {
//             "title": store.title,
//             "headline": store.headline.text,
//             "slug": store.slug,
//             "address": store.location.address,
//             "category": store.category,
//             "series": store.series,
//             "thumbnail": store.media.thumbnail,
//             "snippet": store.snippet.text,
//             "tags": store.tags, // Ensure 'tags' property is available in the 'store' object
//         }
//     }));
//     return features;
//     // return {
//     //     "type": "FeatureCollection",
//     //     "features": features
//     // };
// }

// import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
// import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
// import { parseRequestUrl } from "../utils.js";
// import { BLOCKS, INLINES } from "@contentful/rich-text-types";
// import { format, parseISO } from "date-fns";
// import { getStoresNeumadsReview, getArticleNeumadsTrail } from "../api.js";

// // const getStoresNeumadsReviews = await getStoresNeumadsReview();
// // const request = parseRequestUrl();

// // const geojson = {

// export const geojsonStore = async (limit = 9, skip = 0) => {
//   const stores = await getArticleNeumadsTrail();
//   console.log("stores", stores);

//   const title = stores.title;
//   const headline = stores.headline.text;
//   const slug = stores.slug;
//   const type = stores.location.type;
//   const coordinatesLat = stores.location.geolocation.lat;
//   const coordinatesLog = stores.location.geolocation.log;
//   const address = stores.location.address;
//   const featured = stores.featured;
//   const category = stores.category;
//   const series = stores.series;
//   const storeName = stores.store.storeName;
//   const storeHours = stores.store.hours;
//   const storeWebsite = stores.store.storeWebsite;
//   const neumadScore = stores.store.neumadScore;
//   const storeRating = stores.store.storeRating;
//   const storeRatingsCount = stores.store.storeRatingsCount;
//   const storeHandles = stores.store.handles;
//   const storeContact = stores.store.contact;
//   const storeBio = stores.store.storeBio.introduction;
//   const storeTags = stores.store.storeTagsCollection.tags;
//   const thumbnail = stores.media.thumbnail;
//   const snippet = stores.snippet.text;
//   const summary = stores.summary.text;
//   const amentities = stores.attriubutes.amentities;
//   const offers = stores.attriubutes.offers;
//   const tags = stores.tags.tags;

//   const geojson = {
//     type: "FeatureCollection",
//     features: [
//       {
//         type: featured,
//         geometry: {
//           type: point,
//           coordinates: [coordinatesLat, coordinatesLog],
//         },
//         properties: {
//           title: title,
//           headline: headline,
//           slug: slug,
//           address: address,
//           category: category,
//           series: series,
//           thumbnail: thumbnail,
//           snippet: snippet,
//           attributes: attributes,
//           tags: tags,
//           //   storeHours: storeHours,
//           //   storeWebsite: storeWebsite,
//           //   neumadScore: neumadScore,
//           //   storeRating: ``,
//           //   storeHandles: ``,
//           //   storeContact: ``,
//           //   storeBio: ``,
//           //   storeTags: ``
//         },
//       },
//     ],
//   };
//   documentToPlainTextString(geojson);

//   return geojson;
// };

// console.log("geojsonStore", geojsonStore);

//   const geojson = {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: [-118.1937, 33.7701]
//         },
//         properties: {
//           title: store.title,
//           headline: store.headline.text,
//           slug: ``,
//           storeAddress: ``,
//           storeHours: ``,
//           storeWebsite: ``,
//           neumadScore: ``,
//           storeRating: ``,
//           storeHandles: ``,
//           storeContact: ``,
//           storeBio: ``,
//           storeTags: ``,
//           featured: ``,
//           category: ``,
//           series: ``,
//           thumbnail: ``,
//           snippet: ``,
//           attributes: ``,
//           tags: ``
//         }
//       }
//     ]
//   };
