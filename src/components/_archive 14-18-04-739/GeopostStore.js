// //src/components/GeojsonStores.js
// import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost } from "../api.js";
// import DataBlog from "../components/DataBlog";
// import DataFilter from "../components/DataFilter";

// let dataBlog = new DataBlog();

// export async function geojsonStore() {
//   try {
//     // const articleData = await getArticleNeumadsTrail(9, 0);
//     // const storeData = await getStoresNeumadsReview(9, 0);
//     // const postData = await getArticlePost(9, 0);
//     // const BlogData = [...articleData, ...storeData, ...postData];

//     const BlogData = await dataBlog.getData();

//     // console.log("BlogData: ", BlogData);
//     const features = BlogData.map((stores) => {
//       // Extract properties from the store object
//       const {
//         title,
//         headline: { text: headline } = { text: undefined },
//         slug, 
//         location: { address, geolocation: { lat, lng }, type } = { address: undefined, geolocation: { lat: undefined, lng: undefined }, type: undefined },
//         category,
//         series,
//         media: { 
//           thumbnail  
//         } = { thumbnail: undefined },
//         snippet: { text: snippet } = { text: undefined },
//         tag,
//       } = stores;

//       // console.log("store: ", stores);
//       return {
//         "type": "Feature",
//         "geometry": {
//           "type": "Point",
//           "coordinates": [lng, lat],
//         },
//         "properties": {
//           title,
//           headline,
//           slug,
//           address,
//           lat,
//           lng,
//           type,
//           category,
//           series,
//           thumbnail,
//           snippet,
//           tag,
//         },
//       };
//     });
//     // console.log("features: ", features);
//     return { features };
//   } catch (error) {
//     // console.error('Error fetching store data:', error);
//     return { features: [] };
//   }
// }

  



// // const getStore = {
// //     "type": "FeatureCollection",
// //     "location": [
// //       {
// //         "type": "Feature",
// //         "geolocation": {
// //           "type": "Point",
// //           "coordinates": [
// //             -77.034084142948,
// //             38.909671288923
// //           ]
// //         },
// //           "properties": {
// //             "phoneFormatted": "(202) 234-7336",
// //             "phone": "2022347336",
// //             "address": "1471 P St NW",
// //             "city": "Washington DC",
// //             "country": "United States",
// //             "crossStreet": "at 15th St NW",
// //             "postalCode": "20005",
// //             "state": "D.C."
          
// //             }   
// //         }
// //     ]
// // };
  
// // export default stores;
  