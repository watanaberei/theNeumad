// src/components/GeopostStore.js
import { getStoresNeumadsReview, getArticleNeumadsTrail } from '../api.js';



export const getStores = async (limit = 9, skip = 0) => {
  try {
    // const response = await getStoresNeumadsReview();
    // const stores = response.data;
    // console.log("stores",stores);
    // // Destructure data from getArticleNeumadsTrail response
    // const articleResponse = await getArticleNeumadsTrail();


    const articlePost = await getArticleNeumadsTrail();
    
    const articlePostItems = [
        ...articlePost
            .filter((articlePostData) => articlePostData.featured)
            .slice(0, 1), // Limit the number of featured posts to render to 1 (latest post)
        ...articlePost.filter(
            (articlePostData) => !articlePostData.featured
        ),
        ];
    const stores = articlePostItems;
    console.log("stores",stores);


    const { featured, media, location, headline, store, snippet } = articleResponse;

    const storeData = store && store.length ? store[0] : {};
    const title = headline || {};
    const snippets = snippet || [];
    const medias = media || [];
    const locations = location || [];
    


    const blogDatas = await getArticleNeumadsTrail();
    const featuredBlogDatas = await getArticleNeumadsTrail();
    const primaryFeaturedBlogDatas = await getArticleNeumadsTrail();
    const articleNeumadsTrail = await getArticleNeumadsTrail();
  
    const nonFeaturedBlogsResponse = await getArticleNeumadsTrail();
  
    const articlePrimaryBlogNeumadsItems = [
      ...primaryFeaturedBlogDatas
        .filter((primaryFeaturedBlogData) => primaryFeaturedBlogData.featured)
        .slice(0, 1), // Limit the number of featured posts to render to 1 (latest post)
      ...primaryFeaturedBlogDatas.filter(
        (primaryFeaturedBlogData) => !primaryFeaturedBlogData.featured
      ),
    ];
  
    const articleFeaturedBlogNeumadsItems = [
      ...primaryFeaturedBlogDatas
        .filter((featuredBlogData) => featuredBlogData.featured)
        .slice(0, 1), // Limit the number of featured posts to render to 1 (latest post)
      ...featuredBlogDatas.filter(
        (featuredBlogData) => !featuredBlogData.featured
      ),
    ];
  
    const primaryFeaturedBlogs = articlePrimaryBlogNeumadsItems.slice(0).slice(-1);
    const featuredBlogs = articleFeaturedBlogNeumadsItems.slice(1).slice(-2);
    const blogs = blogDatas.slice(3);
  console.log("blogs",blogs);





    const data = stores
      .filter(storeItem => storeItem.featured && storeItem.location && storeItem.location.geolocation && storeItem.headline && storeItem.store)
      .map(storeItem => {
        return {
          type: "FeatureCollection",
          location: [
            {
              type: storeItem.featured ? "Featured" : "Article",
              geolocation: {
                type: "Point",
                coordinates: [
                  storeItem.location.geolocation.lat,
                  storeItem.location.geolocation.lon
                ]
              },
              properties: {
                title: storeItem.headline.text,
                storeName: storeItem.store.storeName,
                address: storeItem.location.address,
                city: "Washington DC",
                country: "United States",
                crossStreet: "at 15th St NW",
                postalCode: "20005",
                state: "D.C."
              }
            }
          ]
        };
      });

    console.log('Transformed Data:', data);
    return data;
    

  } catch (error) {
    console.error("Error fetching data", error);
  }
};

  



// const getStore = {
//     "type": "FeatureCollection",
//     "location": [
//       {
//         "type": "Feature",
//         "geolocation": {
//           "type": "Point",
//           "coordinates": [
//             -77.034084142948,
//             38.909671288923
//           ]
//         },
//           "properties": {
//             "phoneFormatted": "(202) 234-7336",
//             "phone": "2022347336",
//             "address": "1471 P St NW",
//             "city": "Washington DC",
//             "country": "United States",
//             "crossStreet": "at 15th St NW",
//             "postalCode": "20005",
//             "state": "D.C."
          
//             }   
//         }
//     ]
// };
  
// export default stores;
  