// // src/api.js

// // API for blog
// import { createClient } from "contentful";
// // import dotenv from 'dotenv';

// // dotenv.config();
 
// const client = createClient({
//   space: process.env.CONTENTFUL_BLOG_ARTICLE_ID_20231903,
//   accessToken: process.env.CONTENTFUL_BLOG_ARTICLE_TOKEN_20231903,
// });

// export default client;
// // export default client; // Add this line to export the client object


import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { createClient } from "contentful";

const client = createClient({
  space: "i1hcb4885ci0",
  accessToken: "Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw",
});










// export const getArticleNeumadsTrail = async (limit = 9, skip = 0) => {
//   try {
//     const query = `
//         query {
//           articleNeumadsTrailCollection(limit: 9, skip: 0) {
//             items {
//               title
//               slug
//               category
//               featured
//               series
//             }
//           }
//           snippetDefaultCollection {
//             items {
//               thumbnail {
//                 url
//               }
//               subtext
//             }
//           }
//           heroDefaultCollection {
//             items {
//               slug
//               heroImage {
//                 url
//               }
//             }
//           }
//           contentDefaultCollection {
//             items {
//               title
//               introduction {
//                 __typename
//               }
//             }
//           }
//           referenceDefaultCollection {
//             items {
//               relatedReferencesCollection(limit: 6, skip: 0) {
//                 __typename
//                 total
//                 items {
//                   __typename
//                 }
//               }
//               suggestedReferencesCollection(limit: 6, skip: 0) {
//                 items {
//                   __typename
//                 }
//               }
//               similarReferencesCollection(limit: 6, skip: 0) {
//                 total
//                 items {
//                   __typename
//                 }
//               }
//             }
//           }
//         }
//       `;

//       const response = await fetch(
//         "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ query }),
//           limit,
//           skip,
//         }
//       );
  
//       const json = await response.json();
//       console.log('articleNeumadsTrail SON:', json); // Debugging information
  
//       if (json.errors) {
//         console.error("articleNeumadsTrail GraphQL errors:", json.errors);
//       }
  
//       // if (!json.data || !json.data.articleNeumadsTrailCollection || !json.data.articleNeumadsTrailCollection.items) {
//       //   throw new Error("Invalid data format");
//       // }
  
//       if (!json.data || !json.data.articleNeumadsTrailCollection) {
//         return []; // Return an empty array if no data is found
//       }
//       const articleNeumadsTrail = json.data.articleNeumadsTrailCollection.items;
//       const data = articleNeumadsTrail;
  
//       console.log('Data:', data);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

export const getArticleNeumadsTrail = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      articleNeumadsTrailCollection(limit: 6, skip: 0) {
        items {
          sys {
            id
            publishedAt
          }
          title
          category
          featured
          slug
          series 
          summary {
            bullets
          }
          hero {
            ... on HeroDefault {
              heroImage {
                url
              }
              slug
            }
          }
          author {
            ... on Author {  # Use the correct type for author entries
              social
              pseudonym
              slug
              authorPicture {
                url
              }
            }
          }
          snippet {
            ... on SnippetDefault {  # Use the correct type for snippet entries
              title
              subtext
              thumbnail {
                url
              }
            }
          }
          content {
            ... on ContentDefault {  # Use the correct type for content entries
              summary {
                json
              }
              introduction {
                json
              }
              body {
                json
              }
              conclusion {
                json
              }
              postscript {
                json
              }
            }
          }
          summary {
            ... on SummaryDefault { 
              bullets
              text
            }
          }
          reference {
            ... on ReferenceDefault {
              relatedReferencesCollection(limit: 6) {
                items {
                  ... on AppFastFoodHomePage031523 {  # Use the correct type here
                    title
                    section
                    thumbnail {
                      url
                    }
                    slug
                    overview
                    tag
                  }
                  # Add inline fragments for other possible types here
                }
              }
              suggestedReferencesCollection(limit: 6) {
                items {
                  ... on AppFastFoodHomePage031523 {  # Use the correct type here
                    title
                    section
                    thumbnail {
                      url
                    }
                    slug
                    overview
                    tag
                  }
                  # Add inline fragments for other possible types here
                }
              }
              similarReferencesCollection(limit: 6) {
                items {
                  ... on AppFastFoodHomePage031523 {  # Use the correct type here
                    title
                    section
                    thumbnail {
                      url
                    }
                    slug
                    overview
                    tag
                  }
                  # Add inline fragments for other possible types here
                }
              }
            }
          }
          tagsCollection {
            items {
              tags
              metatag
            }
          }
        } 
      }
    }
    
      `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    const json = await response.json();
    console.log('articleNeumadsTrail JSON:', json); // Debugging information

    if (json.errors) {
      console.error("articleNeumadsTrail GraphQL errors:", json.errors);
    }

    if (!json.data) {
      return []; // Return an empty array if no data is found
    }

    const articles = json.data.articleNeumadsTrailCollection.items;

    const data = articles.map((article) => {
      return {
        ...article,
        thumbnail: article?.snippet?.thumbnail?.url,
        subtext: article?.snippet?.subtext,
        author: {
          name: article?.author?.pseudonym,
          socials: article?.author?.social,
          picture: article?.author?.authorPicture?.url,
          slug: article?.author?.slug,
        },
        hero: {
          heroImage: article?.hero?.heroImage?.url,
          slug: article?.hero?.slug,
        },
        snippet: {
          title: article?.snippet?.title,
          subtext: article?.snippet?.subtext,
          thumbnail: article?.snippet?.thumbnail?.url,
        },
        summary: {
          bullets: article.summary.bullets,
          text: documentToPlainTextString(article.content.summary.json),
        },  
        
        content: {
          introduction: documentToHtmlString(article?.content?.introduction?.json),
          body: documentToHtmlString(article?.content?.body?.json),
          conclusion: documentToHtmlString(article?.content?.conclusion?.json),
          postscript: documentToHtmlString(article?.content?.postscript?.json),
        },
        relatedReferences: article?.reference?.relatedReferencesCollection?.items.map(item => ({
          title: item.title,
          section: item.section,
          thumbnail: item.thumbnail.url,
          overview: item.overview,
          slug: item.slug,
          tag: item.tag,
        })),
        suggestedReferences: article?.reference?.suggestedReferencesCollection?.items.map(item => ({
          title: item.title,
          section: item.section,
          thumbnail: item.thumbnail.url,
          overview: item.overview,
          slug: item.slug,
          tag: item.tag,
        })),
        similarReferences: article?.reference?.similarReferencesCollection?.items.map(item => ({
          title: item.title,
          section: item.section,
          thumbnail: item.thumbnail.url,
          overview: item.overview,
          slug: item.slug,
          tag: item.tag,
        })),
        tags: article?.tagsCollection?.items.map(item => ({
          tag: item?.tags,
          metatag: item?.metatag,
        })),
      };
    });
    documentToPlainTextString(getArticleNeumadsTrail);
    console.log('Data for getArticleNeumadsTrail:', data);
    return data;
  } catch (err) {
    console.error(err);
    // You can decide what to return in case of error, perhaps null or an empty array
    return null; 
  }
};











export const getBlogs = async (limit = 9, skip = 0) => {
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












 export const getNonFeaturedBlog = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {featured: false}, limit: ${limit}, skip: ${skip}) {
         items {
           title
           featured
           section
           overview
           introduction
           slug
           authorName
           category
           tag
           metatag
           featuredImage {
           title
           url
           }
           thumbnail {
             title
             url
           }
           authorImage {
             title
             url(transform: {cornerRadius: 300, width: 150, height: 150})
           }
         }
       }
     }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
    console.log('getNonFeaturedBlog JSON:', json); // Debugging information

    if (json.errors) {
      console.error("getNonFeaturedBlog GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const getNonFeaturedBlogData = json.data.appFastFoodHomePage031523Collection.items;
    const data = getNonFeaturedBlogData;

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};








export const getFeaturedBlog = async (limit = 6, skip = 1) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {featured: true}, limit: ${limit}, skip: ${skip}) {
        items {
          sys {
            id
            publishedAt
          }
          title
          featured
          section
          overview
          introduction
          slug
          authorName
          category
          tag
          metatag
          featuredImage {
            title
            url
          }
          thumbnail {
            title
            url
          }
          authorImage {
            title
            url(transform: {cornerRadius: 300, width: 150, height: 150})
          }
        }
      }
    }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const featuredBlogData = json.data.appFastFoodHomePage031523Collection.items;
    const data = featuredBlogData;

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};



export const getPrimaryFeaturedBlog = async (limit = 1, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {featured: true}, limit: ${limit}, skip: ${skip}) {
        items {
          sys {
            id
            publishedAt
          }
          title
          featured
          section
          overview
          introduction
          slug
          authorName
          category
          tag
          metatag
          featuredImage {
            title
            url
          }
          thumbnail {
            title
            url
          }
          authorImage {
            title
            url(transform: {cornerRadius: 300, width: 150, height: 150})
          }
        }
      }
    }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
    console.log('primaryFeaturedBlogData JSON:', json); // Debugging information

    if (json.errors) {
      console.error("primaryFeaturedBlogData GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const primaryFeaturedBlogData = json.data.appFastFoodHomePage031523Collection.items;
    const data = primaryFeaturedBlogData;

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};








export const getWorkFeaturedBlog = async (limit = 3, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: true} {section: "Work"}]}, limit: 6, skip: 0) {
        items {
            sys {
              id
              publishedAt
            }
            title
            featured
            section
            overview
            introduction
            slug
            authorName
            category
            tag
            metatag
            featuredImage {
              title
              url
            }
            thumbnail {
              title
              url
            }
            authorImage {
              title
              url(transform: {cornerRadius: 300, width: 150, height: 150})
            }
          }
        }
      }
      `;

      const response = await fetch(
        "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
      console.log('WorkFeaturedBlog SON:', json); // Debugging information
  
      if (json.errors) {
        console.error("WorkFeaturedBlog GraphQL errors:", json.errors);
      }
  
      // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
      //   throw new Error("Invalid data format");
      // }
  
      if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
        return []; // Return an empty array if no data is found
      }
      const workFeaturedBlogData = json.data.appFastFoodHomePage031523Collection.items;
      const data = workFeaturedBlogData;
  
      console.log('Data:', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  


export const getWorkBlog = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: false} {section: "Work"}]}, limit: 6, skip: 0) {
        items {
          sys {
            id
            publishedAt
          }
          title
          featured
          section
          overview
          introduction
          slug
          authorName
          category
          tag
          metatag
          featuredImage {
            title
            url
          }
          thumbnail {
            title
            url
          }
          authorImage {
            title
            url(transform: {cornerRadius: 300, width: 150, height: 150})
          }
        }
      }
    }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
    console.log('workBlogData JSON:', json); // Debugging information

    if (json.errors) {
      console.error("workBlogData GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const workBlogData = json.data.appFastFoodHomePage031523Collection.items;
    const data = workBlogData;

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};








export const getUnwindFeaturedBlog = async (limit = 3, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: true} {section: "Unwind"}]}, limit: 6, skip: 0) {
        items {
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
              title
              url
            }
            thumbnail {
              title
              url
            }
            authorImage {
              title
              url(transform: {cornerRadius: 300, width: 150, height: 150})
            }
          }
        }
      }
      `;

      const response = await fetch(
        "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
      console.log('UnwindFeaturedBlog SON:', json); // Debugging information
  
      if (json.errors) {
        console.error("UnwindFeaturedBlog GraphQL errors:", json.errors);
      }
  
      // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
      //   throw new Error("Invalid data format");
      // }
  
      if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
        return []; // Return an empty array if no data is found
      }
      const unwindFeaturedBlogData = json.data.appFastFoodHomePage031523Collection.items;
      const data = unwindFeaturedBlogData;
  
      console.log('Data:', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  


export const getUnwindBlog = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: false} {section: "Unwind"}]}, limit: 6, skip: 0) {
        items {
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
            title
            url
          }
          thumbnail {
            title
            url
          }
          authorImage {
            title
            url(transform: {cornerRadius: 300, width: 150, height: 150})
          }
        }
      }
    }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
    console.log('unwindBlogData JSON:', json); // Debugging information

    if (json.errors) {
      console.error("unwindBlogData GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const unwindBlogData = json.data.appFastFoodHomePage031523Collection.items;
    const data = unwindBlogData;

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};









export const getDineFeaturedBlog = async (limit = 3, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: true} {section: "Dine"}]}, limit: 6, skip: 0) {
        items {
            sys {
              id
              publishedAt
            }
            title
            featured
            section
            overview
            introduction
            slug
            authorName
            category
            tag
            metatag
            featuredImage {
              title
              url
            }
            thumbnail {
              title
              url
            }
            authorImage {
              title
              url(transform: {cornerRadius: 300, width: 150, height: 150})
            }
          }
        }
      }
      `;

      const response = await fetch(
        "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
      console.log('DineFeaturedBlog SON:', json); // Debugging information
  
      if (json.errors) {
        console.error("DineFeaturedBlog GraphQL errors:", json.errors);
      }
  
      // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
      //   throw new Error("Invalid data format");
      // }
  
      if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
        return []; // Return an empty array if no data is found
      }
      const dineFeaturedBlogData = json.data.appFastFoodHomePage031523Collection.items;
      const data = dineFeaturedBlogData;
  
      console.log('Data:', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  


export const getDineBlog = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: false} {section: "Dine"}]}, limit: 6, skip: 0) {
        items {
          sys {
            id
            publishedAt
          }
          title
          featured
          section
          overview
          introduction
          slug
          authorName
          category
          tag
          metatag
          featuredImage {
            title
            url
          }
          thumbnail {
            title
            url
          }
          authorImage {
            title
            url(transform: {cornerRadius: 300, width: 150, height: 150})
          }
        }
      }
    }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
    console.log('dineBlogData JSON:', json); // Debugging information

    if (json.errors) {
      console.error("dineBlogData GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const dineBlogData = json.data.appFastFoodHomePage031523Collection.items;
    const data = dineBlogData;

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};









export const getShortsFeaturedBlog = async (limit = 3, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: true} {section: "Shorts"}]}, limit: 6, skip: 0) {
        items {
            sys {
              id
              publishedAt
            }
            title
            featured
            section
            overview
            introduction
            slug
            authorName
            category
            tag
            metatag
            featuredImage {
              title
              url
            }
            thumbnail {
              title
              url
            }
            authorImage {
              title
              url(transform: {cornerRadius: 300, width: 150, height: 150})
            }
          }
        }
      }
      `;

      const response = await fetch(
        "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
      console.log('ShortsFeaturedBlog SON:', json); // Debugging information
  
      if (json.errors) {
        console.error("ShortsFeaturedBlog GraphQL errors:", json.errors);
      }
  
      // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
      //   throw new Error("Invalid data format");
      // }
  
      if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
        return []; // Return an empty array if no data is found
      }
      const shortsFeaturedBlogData = json.data.appFastFoodHomePage031523Collection.items;
      const data = shortsFeaturedBlogData;
  
      console.log('Data:', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  


export const getShortsBlog = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {AND: [{featured: false} {section: "Shorts"}]}, limit: 6, skip: 0) {
        items {
          sys {
            id
            publishedAt
          }
          title
          featured
          section
          overview
          introduction
          slug
          authorName
          category
          tag
          metatag
          featuredImage {
            title
            url
          }
          thumbnail {
            title
            url
          }
          authorImage {
            title
            url(transform: {cornerRadius: 300, width: 150, height: 150})
          }
        }
      }
    }
    `;

    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
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
    console.log('shortsBlogData JSON:', json); // Debugging information

    if (json.errors) {
      console.error("shortsBlogData GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const shortsBlogData = json.data.appFastFoodHomePage031523Collection.items;
    const data = shortsBlogData;

    console.log('Data:', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};





















 


















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
      const { title, featured, section, overview, introduction, authorName, category, tag, metatag } = item.fields;
      const details = item.fields.details;
      const featuredImage = item.fields.featuredImage.fields.file.url;
      return {
        id,
        title,
        featured,
        section,
        overview,
        introduction,
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
