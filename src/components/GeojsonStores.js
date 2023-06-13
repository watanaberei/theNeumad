//src/components/GeojsonStores.js
import { getArticleNeumadsTrail } from "../api.js";

export async function geojsonStore() {
  try {
    const articleNeumadsTrail = await getArticleNeumadsTrail();

    const features = articleNeumadsTrail.map((store) => {
      // Extract properties from the store object
      const {
        title,
        headline: { text: headline },
        slug,
        location: { address, geolocation: { lat, lon }, type },
        category,
        series,
        media: { thumbnail },
        snippet: { text: snippet },
        tags,
      } = store;

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

    return { features };
  } catch (error) {
    console.error('Error fetching store data:', error);
    return { features: [] };
  }
}









// import { getArticleNeumadsTrail } from "../api.js";
// const articleNeumadsTrail = await getArticleNeumadsTrail();

// export function geojsonStore(storeData) {
//     const stores = articleNeumadsTrail;
//   const features = stores.map(features => {
//     // Extract properties from the store object
//     const {
//       title,
//       headline: { text: headline },
//       slug,
//       location: { address, geolocation: { lat, lon }, type },
//     //   lat: {geolocation:{lat}},
//     //   log: {geolocation:{log}},
//       category,
//       series,
//       media: { thumbnail },
//       snippet: { text: snippet },
//       tags,
//     } = features;
    

//     return {
//       "type": "Feature",
//       "geometry": {
//         "type": "Point",
//         "coordinates": [lon, lat],
//       },
//       "properties": {
//         title,
//         headline,
//         slug,
//         address,
//         type,
//         category,
//         series,
//         thumbnail,
//         snippet,
//         tags,
//       },
//     };
//   });

//   return storeData, features;
// }





// WORKS
// //src/components/GeojsonStores.js
// import { getArticleNeumadsTrail } from "../api.js";
// const articleNeumadsTrail = await getArticleNeumadsTrail();

// export function geojsonStore(storeData) {
//     const store = articleNeumadsTrail;
//   const features = store.map(features => {
//     // Extract properties from the store object
//     const {
//       title,
//       headline: { text: headline },
//       slug,
//       location: { address, geolocation: { lat, lng }, type },
//       category,
//       series,
//       media: { thumbnail },
//       snippet: { text: snippet },
//       tags,
//     } = features;
    

//     return {
//       "type": "Feature",
//       "geometry": {
//         "type": "Point",
//         "coordinates": [lng, lat],
//       },
//       "properties": {
//         title,
//         headline,
//         slug,
//         address,
//         type,
//         category,
//         series,
//         thumbnail,
//         snippet,
//         tags,
//       },
//     };
//   });

//   return storeData, features;
// }








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
//     const store = getArticleNeumadsTrail;
//   //console.log("store", store);

//     const title = store.title;
//     const headline = store.headline.text;
//     const slug = store.slug;
//     const type = store.location.type;
//     const coordinatesLat = store.location.geolocation.lat;
//     const coordinatesLog = store.location.geolocation.log;
//     const address = store.location.address;
//     const featured = store.featured;
//     const category = store.category;
//     const series = store.series;
//     const storeName = store.store.storeName;
//     const storeHours = store.store.hours;
//     const storeWebsite = store.store.storeWebsite;
//     const neumadScore = store.store.neumadScore;
//     const storeRating = store.store.storeRating;
//     const storeRatingsCount = store.store.storeRatingsCount;
//     const storeHandles = store.store.handles;
//     const storeContact = store.store.contact;
//     const storeBio = store.store.storeBio.introduction;
//     const storeTags = store.store.storeTagsCollection.tags;
//     const thumbnail = store.media.thumbnail;
//     const snippet = store.snippet.text;
//     const summary = store.summary.text;
//     const amentities = store.attriubutes.amentities;
//     const offers = store.attriubutes.offers;
//     const tags = store.tags.tags;

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
//   const store = await getArticleNeumadsTrail();
//   console.log("store", store);

//   const title = store.title;
//   const headline = store.headline.text;
//   const slug = store.slug;
//   const type = store.location.type;
//   const coordinatesLat = store.location.geolocation.lat;
//   const coordinatesLog = store.location.geolocation.log;
//   const address = store.location.address;
//   const featured = store.featured;
//   const category = store.category;
//   const series = store.series;
//   const storeName = store.store.storeName;
//   const storeHours = store.store.hours;
//   const storeWebsite = store.store.storeWebsite;
//   const neumadScore = store.store.neumadScore;
//   const storeRating = store.store.storeRating;
//   const storeRatingsCount = store.store.storeRatingsCount;
//   const storeHandles = store.store.handles;
//   const storeContact = store.store.contact;
//   const storeBio = store.store.storeBio.introduction;
//   const storeTags = store.store.storeTagsCollection.tags;
//   const thumbnail = store.media.thumbnail;
//   const snippet = store.snippet.text;
//   const summary = store.summary.text;
//   const amentities = store.attriubutes.amentities;
//   const offers = store.attriubutes.offers;
//   const tags = store.tags.tags;

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
