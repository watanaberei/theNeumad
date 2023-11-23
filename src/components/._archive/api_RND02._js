// api.js rnd02

import { createClient } from "contentful";

const client = createClient({
  space: "i1hcb4885ci0",
  accessToken: "Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw",
});

export const getBlogs = async (limit = 6, skip = 0) => {
  try {
    // Pagination
    const response = await client.getEntries({
      content_type: "appFastFoodHomePage031523",
      limit,
      skip,
    });
    // console.log("blog response" + response);  
    let blogs = response.items;
    console.log("blogs" + blogs);
    blogs = blogs.map((item) => {
      const { id, createdAt } = item.sys;
      const { title, featured, section, overview, slug, authorName, category, tag, metatag } = item.fields;
      const thumbnail = item.fields.thumbnail.fields.file.url;
      const authorImage = item.fields.authorImage.fields.file.url;
      return {
        id,
        title,
        featured,
        section,
        overview,
        thumbnail,
        slug,
        authorName,
        authorImage,
        createdAt,
        category,
        tag,
        metatag,
      };
    });
    console.log("BLOGS:" + blogs);
    return blogs;
  } catch (err) {
    console.log(err);
  }
};









export const getFeaturedBlog = async (limit = 6, skip = 0) => {
  try {
    const query = `
      query {
        appFastFoodHomePage031523(id: "7HKWYtVcvyB1gHdKeofGJ9") {
          sys {
            id
            publishedAt
          }
          title
          featured
          section
          overview
          slug
          authorName
          category
          tag
          metatag 
          featuredImage {
         
            url 
          }
          thumbnail {
            
            url
          }
          authorName
          authorImage {
            title
            url(transform: {cornerRadius: 300, width: 150, height: 150})
          }
        }
      }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        limit,
        skip,
      }
    );

    const json = await response.json();
    console.log('JSON:', json); // Debugging information

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523) {
      return []; // Return an empty array if no data is found
    }
    const featuredBlogData = json.data.appFastFoodHomePage031523;
    const data = [featuredBlogData]; // Wrap the featuredBlogData in an array

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
//     let data = json.data.appFastFoodHomePage031523Collection.items;
//     console.log("featuredBlogs", data);
//     data = data.map((item) => {
     
//       const { id, createdAt } = item.sys;
//       const { title, featured, section, overview, slug, authorName, category, tag, metatag } = item.fields;
//       const thumbnail = item.fields.thumbnail.fields.file.url;
//       const authorImage = item.fields.authorImage.fields.file.url;

//       return {
//         id,
//         title,
//         featured,
//         section,
//         overview,
//         thumbnail,
//         slug,
//         authorName,
//         authorImage,
//         createdAt,
//         category,
//         tag,
//         metatag,
//       };
//     });
//     console.log('Data:', data); // Debugging information
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };



















// export const getFeaturedBlog = async (limit = 6, skip = 0) => {
//   try {
//     const query = `
//       query {
//         appFastFoodHomePage031523 (id:"7HKWYtVcvyB1gHdKeofGJ9") {
//           title,
//           featured,
//           section,
//           overview,
//           slug,
//           authorName,
//           category,
//           tag,
//           metatag,
//         }
//       }
//     `;

//     const response = await fetch(
//       "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//         limit,
//         skip,
//       }
//     );
//     // console.log("featured response" + response);  

//     const json = await response.json();
//     console.log('JSON:', json); // Debugging information

  

//     let data = response.featuredItems;
//     console.log("featuredBlogs" + data);
//     data = data.map((item) => {
//       const { title, featured, section, overview, slug, authorName, category, tag, metatag } = item.fields;
//       return  {
//           title,
//           featured,
//           section,
//           overview,
//           slug,
//           authorName,
//           category,
//           tag,
//           metatag,
//         };
  
//     });
//     console.log('Data:', data); // Debugging information
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };




















// // GRAPHQL
// const query = `
// query {
// 	appFastFoodHomePage031523 (id:"7HKWYtVcvyB1gHdKeofGJ9") {
//   	title
//   }
// }
// `;

// // FETCH DATA FROM CONTENTFUL
// window.fetch(
//   "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw", 
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   }
// ).then(response => response.json())
// .then(json => {
//   console.log(json.data);
//   const data = {
//     work: {
//       featured: {
//         title: json.data.appFastFoodHomePage031523.featuredWork.title,
//       }
//     }
//   };

//   const featuredBlogHtml = renderFeaturedBlog(data);

//   const blogContainer = document.getElementById("featured-blog-container");
//   blogContainer.innerHTML = featuredBlogHtml;
// });



















// // GRAPHQL
// const query = `
// query {
// 	appFastFoodHomePage031523 (id:"7HKWYtVcvyB1gHdKeofGJ9") {
//   	title
//   }
// }
// `;

// // FETCH DATA FROM CONTENTFUL
// window.fetch(
//   "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw", 
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   }
// ).then(response => response.json())
// .then(json => console.log(json.data));





















export const getFeatured = async (limit = 6, skip = 0) => {
  try {
    // Pagination
    const response = await client.getEntries({
      content_type: "blogFeatured",
      limit,
      skip,
    });
    console.log(response);  
    let featured = response.items;
    featured = featured.map((item) => {
      // const { id, createdAt } = item.sys;
      // const { title, featured, section, overview, slug, authorName, category, tag, metatag } = item.fields;
      // const thumbnail = item.fields.thumbnail.fields.file.url;
      // const authorImage = item.fields.authorImage.fields.file.url;
      const { featuredBlog } = item.fields;
      return {
        featured,
      };
    });
    return featured;
  } catch (err) {
    console.log(err);
  }
};





export const getBlog = async (slug) => {
  try {
    const response = await client.getEntries({
      content_type: "appFastFoodHomePage031523",
      "fields.slug": slug,
    });
    let blogdetails = response.items;
    blogdetails = blogdetails.map((item) => {
      const { id, createdAt } = item.sys;
      const { title, featured, section, overview, authorName, category, tag, metatag } = item.fields;
      const details = item.fields.details;
      const featuredImage = item.fields.featuredImage.fields.file.url;
      return {
        id,
        title,
        featured,
        section,
        overview,
        featuredImage,
        details,
        authorName,
        createdAt,
        category,
        tag,
        metatag,
      };
    });
    return blogdetails;
  } catch (err) {
    console.log(err);
  }
};



// ADD FULL TEXT SEARCH QUERY
// if(query.searchBarText){
//   contentFullQuery['query'] = query.searchBarText;
// }
