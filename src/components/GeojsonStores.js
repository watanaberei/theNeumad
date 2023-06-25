// //src/components/GeojsonStores.js
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost } from "../api.js";


export async function geojsonStore() {
  try {
    const articleData = await getArticleNeumadsTrail(9, 0);
    const storeData = await getStoresNeumadsReview(9, 0);
    const postData = await getArticlePost(9, 0);
    const BlogData = [...articleData, ...storeData, ...postData];
    


    console.log("BlogData GeojsonStore.js: ", BlogData);
    const features = BlogData.map((store) => {
      // Extract properties from the store object
      const {
        title,
        headline: { text: headline },
        slug, 
        location: { address, geolocation: { lat, lon }, type },
        category,
        series,
        media: { 
          thumbnail  
        },
        snippet: { text: snippet },
        tag,

        // tag: { tag },
        references: { relatedReferencesCollection:references },

      } = store;

      // console.log("store: ", store);
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
          lat,
          lon,
          type,
          category,
          series,
          thumbnail,
          snippet,
          tag,
          references,
        },
      };
    });
    console.log("features: ", features[0]);
    return { features };
    
  } catch (error) {
    console.error('Error fetching store data:', error);
    return { features: [] };
  }
}
















// import { getArticleNeumadsTrail } from "../api.js";

// export async function geojsonStore(searchCoordinates) {

//     const articleNeumadsTrail = await getArticleNeumadsTrail();

//     const features = articleNeumadsTrail
//     .map((store) => {
//       // Extract properties from the store object
//       const {
//         title,
//         headline: { text: headline },
//         slug,
//         location: { address, geolocation: { lat, lon }, type },
//         category,
//         series,
//         media: { thumbnail },
//         snippet: { text: snippet },
//         tags,
//       } = store;

//       return {
//         "type": "Feature",
//         "geometry": {
//           "type": "Point",
//           "coordinates": [lon, lat],
//         },
//         "properties": {
//           title,
//           headline,
//           slug,
//           address,
//           type,
//           category,
//           series,
//           thumbnail,
//           snippet,
//           tags,
//         },
//       };
//     })
//     .sort((a, b) => {
//         if (searchCoordinates) {
//           const distanceA = getDistanceFromLatLonInKm(
//             searchCoordinates[1],
//             searchCoordinates[0],
//             a.geometry.coordinates[1],
//             a.geometry.coordinates[0]
//           );
//           const distanceB = getDistanceFromLatLonInKm(
//             searchCoordinates[1],
//             searchCoordinates[0],
//             b.geometry.coordinates[1],
//             b.geometry.coordinates[0]
//           );
//           return distanceA - distanceB;
//         }
//         return 0;
//       });
  
//     return { features };
//   }


//   function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) *
//         Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const d = R * c; // Distance in km
//     return d;
//   }
  
//   function deg2rad(deg) {
//     return deg * (Math.PI / 180);
//   }
















// import { getArticleNeumadsTrail } from "../api.js";

// export async function geojsonStore() {
//   try {
//     const articleNeumadsTrail = await getArticleNeumadsTrail();

//     const features = articleNeumadsTrail.map((store) => {
//       // Extract properties from the store object
//       const {
//         title,
//         headline: { text: headline },
//         slug,
//         location: { address, geolocation: { lat, lon }, type },
//         category,
//         series,
//         media: { thumbnail },
//         snippet: { text: snippet },
//         tags,
//       } = store;

//       return {
//         "type": "Feature",
//         "geometry": {
//           "type": "Point",
//           "coordinates": [lon, lat],
//         },
//         "properties": {
//           title,
//           headline,
//           slug,
//           address,
//           type,
//           category,
//           series,
//           thumbnail,
//           snippet,
//           tags,
//         },
//       };
//     });

//     return { features };
//   } catch (error) {
//     console.error('Error fetching store data:', error);
//     return { features: [] };
//   }
// }







