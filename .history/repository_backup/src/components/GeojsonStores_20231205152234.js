// //src/components/GeojsonStores.js
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api.js";
import DataBlog from "./DataPost";


let dataBlog = new DataBlog();

export async function geojsonStore() {
  try {
    const BlogData = await dataBlog.getData();
    console.log("BlogData", BlogData);
    // Log the raw data you're receiving from the API
    // console.log("Raw BlogData: ", JSON.stringify(BlogData, null, 2));

    const features = BlogData.map((store) => {
      // Extract properties from the store object
      const {
        title,
        headline: { subtext, text, eyebrow},
        publishedAt,
        slug, 
        storeAttributes,
        popularTimes,
        location: { region, address, geolocation: { lat, lon }, type }, // Change here
        category: { categoryType, genre },
        summary: { best, noise, parking, environment},
        series: {seriesName},
        hours, 
        neustar,
        // ratings,
        variant,
        media: { 
          thumbnail,
          logo,
          gallery,
          area,
          recommendations  
        },
        snippet: { text: snippet },
        tag,
        nearbyStore: {
          store: {
            location: {
              geolocation: {
                coordinates: [lon, lat]
              }
            }
          }
        }
      } = store;

      // Log the store object and the extracted properties
      // console.log("Store object: ", JSON.stringify(store, null, 2));
      
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [lon, lat], // And here
        },
        "properties": {
          publishedAt,
          title,
          variant,
          text,
          subtext,
          eyebrow,
          slug,
          address,
          seriesName,
          region,
          lat, 
          lon, // And here
          type,
          hours,
          popularTimes,
          storeAttributes,
          best, 
          noise,
          parking,
          neustar,
          environment,
          categoryType,
          genre,
          thumbnail,
          logo,
          gallery,
          area,
          recommendations,
          snippet,
          tag,
        },
      };
    });

    // Log the formatted features as raw JSON
    console.log("Formatted features: ", JSON.stringify(features, null, 2));
    return { features };
    
  } catch (error) {
    console.error('Error fetching store data:', error);
    return { features: [] };
  }
}