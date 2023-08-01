// //src/components/GeojsonStores.js
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api.js";
import DataBlog from "../components/DataBlog";

let dataBlog = new DataBlog();

export async function geojsonStore() {
  try {
    const BlogData = await dataBlog.getData();

    // Log the raw data you're receiving from the API
    // console.log("Raw BlogData: ", JSON.stringify(BlogData, null, 2));

    const features = BlogData.map((store) => {
      // Extract properties from the store object
      const {
        title,
        headline: { text: headline },
        slug, 
        location: { region, address, geolocation: { lat, lon }, type }, // Change here
        category,
        series,
        // ratings,
        variant,
        media: { 
          thumbnail  
        },
        snippet: { text: snippet },
        tag,
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
          title,
          variant,
          headline,
          slug,
          address,
          region,
          lat, 
          lon, // And here
          type,
          category,
          series,
          thumbnail,
          snippet,
          tag,
        },
      };
    });

    // Log the formatted features as raw JSON
    // console.log("Formatted features: ", JSON.stringify(features, null, 2));
    return { features };
    
  } catch (error) {
    console.error('Error fetching store data:', error);
    return { features: [] };
  }
}