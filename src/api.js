// src/api.js

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

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import { createClient } from "contentful"; 

const client = createClient({
  space: "i1hcb4885ci0",
  accessToken: "Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw",
});

// export async function getArticleNeumadsTrail(limit = 6, skip = 0) {
//   try {
//     const query = `
//     query {
//       articleNeumadsTrailCollection(limit: ${limit}, skip: ${skip}) {
//         items {
//           sys {
//             id
//             publishedAt
//           }
//           title
//           featured
//           slug
//           series
//           author {
//             ... on Author {
//               social
//               authorPseudonym
//               authorPicture {
//                 url
//               }
//             }
//           }
//           snippet {
//             ... on SnippetDefault {
//               title
//               subtext
//               thumbnail {
//                 url
//               }
//             }
//           }
//           summary {
//             text
//           }
//           media {
//             ... on Media {
//               thumbnail {
//                 url
//               }
//               hero {
//                 url
//               }
//               galleryCollection {
//                 items {
//                   url
//                 }
//               }
//             }
//           }
//           content {
//             ... on ContentDefault {
//               summary {
//                 json
//               }
//               introduction {
//                 json
//               }
//               body {
//                 json
//               }
//               conclusion {
//                 json
//               }
//               postscript {
//                 json
//               }
//             }
//           }
//           reference {
//             ... on ReferenceDefault {
//               relatedReferencesCollection(limit: 6) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     slug
//                   }
//                 }
//               }
//               suggestedReferencesCollection(limit: 6) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     slug
//                   }
//                 }
//               }
//               similarReferencesCollection(limit: 6) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     slug
//                   }
//                 }
//               }
//             }
//           }
//           tagsCollection {
//             items {
//               tags
//               metatag
//             }
//           }
//         }
//       }
//     }

//       `;

//       const response = await fetch(
//         "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ query }),
//         }
//       );

//       const json = await response.json();
//       console.log('articleNeumadsTrail JSON:', json); // Debugging information

//       if (json.errors) {
//         console.error("articleNeumadsTrail GraphQL errors:", json.errors);
//       }

//       if (!json.data) {
//         return []; // Return an empty array if no data is found
//       }

//       const articles = json.data.articleNeumadsTrailCollection.items;
//       // console.log("articles", articles)
//       const data = articles.map((article) => {
//       return {
//         ...article,
//         title: article?.title,
//         headline: {
//           text: article?.headline?.text,
//         },
//         location: {
//           type: article?.location?.type,
//           geolocation: {
//             lat: article?.location?.geolocation?.lat,
//             lon: article?.location?.geolocation?.lon,
//           },
//           address: article?.location?.address,
//           region: article?.location?.region,
//         },
//         featured: article?.featured,
//         slug: article?.slug,
//         category: article?.category,
//         series: article?.series,
//         media: {
//           hero: article?.media?.hero?.url,
//           thumbnail: article?.media?.thumbnail?.url,
//           gallery: article?.media?.galleryCollection?.items.map(item => ({
//             url: item?.url,
//           })),
//         },
//         author: {
//           name: article?.author?.authorPseudonym,
//           socials: article?.author?.social,
//           picture: article?.author?.authorPicture?.url,
//           slug: article?.author?.slug,
//         },
//         summary: {
//           text: article?.summary?.text,
//         },
//         snippet: {
//           title: article?.snippet?.title,
//           text: article?.snippet?.text?.json,  // corrected field
//         },
//         postscript: {
//           title: article?.postscript?.title,
//           text: article?.postscript?.text?.json,  // corrected field
//         },
//         content: {
//           introduction: documentToHtmlString(article?.content?.introduction?.json),
//           body: documentToHtmlString(article?.content?.body?.json),
//           conclusion: documentToHtmlString(article?.content?.conclusion?.json),
//         },
//         references: {
//           relatedReferences: article?.reference?.relatedReferencesCollection?.items.map(item => ({
//             title: item.title,headline: item.headline,
//             section: item.section,
//             overview: item.overview,
//             slug: item.slug,
//             tag: item.tag,
//             category: item.category,
//           })),
//           suggestedReferences: article?.reference?.suggestedReferencesCollection?.items.map(item => ({
//             title: item.title,
//             section: item.section,
//             overview: item.overview,
//             slug: item.slug,
//             tag: item.tag,
//           })),
//           similarReferences: article?.reference?.similarReferencesCollection?.items.map(item => ({
//             title: item.title,
//             section: item.section,
//             overview: item.overview,
//             slug: item.slug,
//             tag: item.tag,
//           })),
//         },
//         tag: article?.tagsCollection?.items.map(item => ({
//           tags: item?.tags,
//           metatag: item?.metatag,
//         })),

//       };
//     });
//     documentToPlainTextString(getArticleNeumadsTrail);
//     // console.log('Data for getArticleNeumadsTrail:', data);
//     return data;

//   } catch (err) {
//     console.error(err);
//     // You can decide what to return in case of error, perhaps null or an empty array
//     return null;
//   }
// };
export async function getArticleNeumadsTrail(limit = 6, skip = 0) {
  try {
    const query = `
    query {
      articleNeumadsTrailCollection(limit: ${limit}, skip: ${skip}) {
        items {
          sys {
            id
            publishedAt
          }
          title
          featured
          slug
          featured
          category {
            category
          }
          series {
            series
          }
          headline {
              text
          }
          location {
            ... on ContentTypeLocation {
              type
              geolocation {
                lat
                lon
              }
              address
              region
            }
          }
          author {
            ... on Author {
              social
              authorPseudonym
              authorPicture {
                url
              }
            }
          }
          snippet {
            ... on SnippetDefault {
              title
              subtext
              thumbnail {
                url
              }
            }
          }
          summary {
            text
          }
          media {
            ... on Media {
              thumbnail {
                url
              }
              hero {
                url
              }
              galleryCollection {
                items {
                  url
                }
              }
            }
          }
          content {
            ... on ContentDefault {
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
          reference {
            ... on ReferenceDefault {
              relatedReferencesCollection(limit: 3) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    category {
                      category
                    }
                    media {
                      ... on Media {
                        thumbnail {
                          url
                        }
                      }
                    }
                    slug
                    snippet {
                      ... on Snippet {
                        title
                        text {
                          json
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
              suggestedReferencesCollection(limit: 3) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    category {
                      category
                    }
                    media {
                      ... on Media {
                        thumbnail {
                          url
                        }
                      }
                    }
                    slug
                    snippet {
                      ... on Snippet {
                        title
                        text {
                          json
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
              similarReferencesCollection(limit: 3) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    category {
                      category
                    }
                    media {
                      ... on Media {
                        thumbnail {
                          url
                        }
                      }
                    }
                    slug
                    snippet {
                      ... on Snippet {
                        title
                        text {
                          json
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

    if (json.errors) {
      console.error("articleNeumadsTrail GraphQL errors:", json.errors);
    }

    if (!json.data) {
      return []; // Return an empty array if no data is found
    }

    const articles = json.data.articleNeumadsTrailCollection.items;
    // console.log("articles", articles);

    const data = articles.map((articles) => {
      return {
        ...articles,
        title: articles?.title,
        headline: articles?.headline,
        location: {
          type: articles?.location?.type,
          geolocation: {
            lat: articles?.location?.geolocation?.lat,
            lon: articles?.location?.geolocation?.lon,
          },
          address: articles?.location?.address,
          region: articles?.location?.region,
        },
        slug: articles?.slug,
        featured: articles?.featured,
        headline: {
          text: articles?.headline?.text,
          slug: articles?.headline?.slug,
        },
        categories: {
          category: articles?.category?.category,
        },
        series: {
          series: articles?.series?.series,
        },
        author: {
          name: articles?.author?.authorPseudonym,
          picture: articles?.author?.authorPicture?.url,
          slug: articles?.author?.slug,
        },
        media: {
          hero: articles?.media?.hero?.url,
          thumbnail: articles?.media?.thumbnail?.url,
          gallery: articles?.media?.galleryCollection?.items.map((item) => ({
            url: item?.url,
          })),
        },
        snippet: {
          title: articles?.snippet?.title,
          text: documentToHtmlString(articles?.snippet?.text?.json),
        },
        summary: {
          text: articles?.summary?.text,
        },
        content: {
          introduction: documentToHtmlString(
            articles?.content?.introduction?.json
          ),
          body: documentToHtmlString(articles?.content?.body?.json),
          conclusion: documentToHtmlString(articles?.content?.conclusion?.json),
        },
        postscript: {
          text: documentToHtmlString(articles?.postscript?.text?.json),
        },
        references: {
          relatedReferences:
            articles?.reference?.relatedReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                headline: item.headline,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
                relatedCategory: item.category,
              })
            ),
          suggestedReferences:
            articles?.reference?.suggestedReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
              })
            ),
          similarReferences:
            articles?.reference?.similarReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
              })
            ),
        },
        tag: articles?.tagsCollection?.items.map((item) => ({
          tags: item?.tags,
          metatag: item?.metatag,
        })),
      };
    });
    documentToPlainTextString(getArticleNeumadsTrail);
    // console.log('Data for getStoresNeumadsReview data:', data);
    // console.log('Data for getStoresNeumadsReview:', getStoresNeumadsReview);
    return data;
  } catch (err) {
    console.error(err);
    // You can decide what to return in case of error, perhaps null or an empty array
    return null;
  }
};


export const getStoresNeumadsReview = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      storesNeumadsReviewCollection(limit: ${limit}, skip: ${skip}) {
        items {
          sys {
            id
          }
          title
          location {
            ... on ContentTypeLocation {
              type
              geolocation {
                lat
                lon
              }
              address
              region
            }
          }
          featured
          store{
            ... on Stores {
              storeName
              storeNickname
              hours
              storeWebsite
              storeChain
              storeChainStoresCollection{
                items{
                  storeName
                  storeNickname
                  hours
                  storeWebsite
                }
              }
              neumadScore
              storeRating
              storeRatingsCount
              storeReviewOverview
              handles
              contact
              storeReviewSource
              storeBio {
                title
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
              storeTagsCollection {
                items {
                  tags
                  metatag
                }
              }
            }
          }
          headline {
            text
            eyebrow
          }
          slug
          featured
          category {
            category
          }
          series {
            series
          }
          author {
            authorName
            authorPseudonym
            authorPicture {
              url
            }
            slug
          }
          media {
            ... on Media {
              title
              hero {
                url
              }
              thumbnail {
                url
              }
              galleryCollection {
                items {
                  url
                }
              }
            }
          }
          snippet {
            ... on Snippet {
              title
              text {
                json
              }
            }
          }
          summary {
            ... on Summary {
              text
            }
          }
          content {
            ... on Content {
              introduction {
                json
              }
              body {
                json
              }
              conclusion {
                json
              }
            }
          }
          attributes {
            amenities
            offers
          }
          postscript {
            ... on Postscript {
              text {
                json
              }
            }
          }
          reference {
            ... on ReferenceDefault {
              relatedReferencesCollection(limit: 6) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    slug
                  }
                }
              }
              suggestedReferencesCollection(limit: 6) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    slug
                  }
                }
              }
              similarReferencesCollection(limit: 6) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    slug
                  }
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
    

    if (json.errors) {
      console.error("articleNeumadsTrail GraphQL errors:", json.errors);
    }

    if (!json.data) {
      return []; // Return an empty array if no data is found
    }

    const stores = json.data.storesNeumadsReviewCollection.items;
// console.log("store", stores);

    const data = stores.map((stores) => {
      return {
        ...stores,
        title: stores?.title,
        location: {
          type: stores?.location?.type,
          geolocation: {
            lat: stores?.location?.geolocation?.lat,
            lon: stores?.location?.geolocation?.lon,
          },
          address: stores?.location?.address,
          region: stores?.location?.region,
        },
        slug: stores?.slug,
        featured: stores?.featured,
        store: {
          storeName: stores?.store?.storeName,
          storeNickname: stores?.store?.storeNickname,
          hours: stores?.store?.hours,
          storeWebsite: stores?.store?.storeWebsite,
          storeChain: stores?.store?.storeChain,
          storeChainStoresCollection:
            stores?.store?.storeChainStoresCollection?.items.map((item) => ({
              storeName: item?.storeName,
              storeNickname: item?.storeNickname,
              hours: item?.hours,
              storeWebsite: item?.storeWebsite,
              storeGeolocation: {
                lat: item?.storeGeolocation?.lat,
                lon: item?.storeGeolocation?.lon,
              },
              storeAddress: item?.storeAddress,
              storeChain: item?.storeChain,
              storeChainStoresCollection:
                item?.storeChainStoresCollection?.items.map((item) => ({
                  storeName: item?.storeName,
                  storeNickname: item?.storeNickname,
                  hours: item?.hours,
                  storeWebsite: item?.storeWebsite,
                })),
              neumadScore: item?.neumadScore,
              storeRating: item?.storeRating,
              storeRatingsCount: item?.storeRatingsCount,
              storeReviewOverview: item?.storeReviewOverview,
              handles: item?.handles,
              contact: item?.contact,
              storeReviewSource: item?.storeReviewSource,
              storeBio: {
                title: item?.storeBio?.title,
                introduction: item?.storeBio?.introduction?.json,
                body: item?.storeBio?.body?.json,
                conclusion: item?.storeBio?.conclusion?.json,
                postscript: item?.storeBio?.postscript?.json,
              },
              storeTagsCollection: item?.storeTagsCollection?.items.map(
                (item) => ({
                  tags: item?.tags,
                  metatag: item?.metatag,
                })
              ),
            })),
        },
        headline: {
          text: stores?.headline?.text,
          slug: stores?.headline?.slug,
        },
        categories: {
          category: stores?.category?.category,
        },
        series: {
          series: stores?.series?.series,
        },
        author: {
          name: stores?.author?.authorPseudonym,
          picture: stores?.author?.authorPicture?.url,
          slug: stores?.author?.slug,
        },
        media: {
          hero: stores?.media?.hero?.url,
          thumbnail: stores?.media?.thumbnail?.url,
          gallery: stores?.media?.galleryCollection?.items.map((item) => ({
            url: item?.url,
          })),
        },
        snippet: {
          title: stores?.snippet?.title,
          text: documentToHtmlString(stores?.snippet?.text?.json),
        },
        summary: {
          text: stores?.summary?.text,
        },
        content: {
          introduction: documentToHtmlString(
            stores?.content?.introduction?.json
          ),
          body: documentToHtmlString(stores?.content?.body?.json),
          conclusion: documentToHtmlString(stores?.content?.conclusion?.json),
        },
        attributes: {
          amentities: stores?.attributes?.amentities,
          offers: stores?.attributes?.offers,
        },
        postscript: {
          text: documentToHtmlString(stores?.postscript?.text?.json),
        },
        references: {
          relatedReferences:
            stores?.reference?.relatedReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                headline: item.headline,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
                relatedCategory: item.category,
              })
            ),
          suggestedReferences:
            stores?.reference?.suggestedReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
              })
            ),
          similarReferences:
            stores?.reference?.similarReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
              })
            ),
        },
        tag: stores?.tagsCollection?.items.map((item) => ({
          tags: item?.tags,
          metatag: item?.metatag,
        })),
      };
    });
    documentToPlainTextString(getStoresNeumadsReview);
    // console.log('Data for getStoresNeumadsReview data:', data);
    // console.log('Data for getStoresNeumadsReview:', getStoresNeumadsReview);
    return data;
  } catch (err) {
    console.error(err);
    // You can decide what to return in case of error, perhaps null or an empty array
    return null;
  }
};


export const getArticlePost = async (limit = 9, skip = 0) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(limit: ${limit}, skip: ${skip}) {
        items {
          sys {
            id
            publishedAt
          }
          title
          location {
            ... on ContentTypeLocation {
              type
              geolocation {
                lat
                lon
              }
              address
              region
            }
          }
          headline {
            ... on Headline {
              text
            }
          }
          featured
          slug
          category {
            title
            category
          }
          series {
            title
          }
          media {
            ... on Media {
              title
              hero {
                url
              }
              thumbnail {
                url
              }
              galleryCollection {
                items {
                  url
                }
              }
            }
          }
          author {
            ... on Author {  # Use the correct type for author entries
              social
              authorPseudonym
              slug
              authorPicture {
                url
              }
            }
          } 
          summary {
            ... on Summary {
              text
            }
          }
          snippet {
            ... on Snippet {
              title
              text {
                json
              }
            }
          }
          
          content {
            ... on Content {
              introduction {
                json
              }
              body {
                json
              }
              conclusion {
                json
              }
            }
          }
          postscript {
            ...on Postscript {
              text {
                json
              }
            }
          }
          reference {
            ... on ReferenceDefault {
              relatedReferencesCollection(limit: 3) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    category {
                      category
                    }
                    series {
                      series
                    }
                    media {
                      ... on Media {
                        thumbnail {
                          url
                        }
                      }
                    }
                    slug
                    snippet {
                      ... on Snippet {
                        title
                        text {
                          json
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
              suggestedReferencesCollection(limit: 3) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    category {
                      category
                    }
                    series {
                      series
                    }
                    media {
                      ... on Media {
                        thumbnail {
                          url
                        }
                      }
                    }
                    slug
                    snippet {
                      ... on Snippet {
                        title
                        text {
                          json
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
              similarReferencesCollection(limit: 3) {
                items {
                  ... on AppFastFoodHomePage031523 {
                    title
                    category {
                      category
                    }
                    series {
                      series
                    }
                    media {
                      ... on Media {
                        thumbnail {
                          url
                        }
                      }
                    }
                    slug
                    snippet {
                      ... on Snippet {
                        title
                        text {
                          json
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
    

    if (json.errors) {
      console.error("articleNeumadsTrail GraphQL errors:", json.errors);
    }

    if (!json.data) {
      return []; // Return an empty array if no data is found
    }

    const blogs = json.data.appFastFoodHomePage031523Collection.items;
    // console.log("store", blogs);

    const data = blogs.map((blogs) => {
      return {
        ...blogs,
        title: blogs?.title,
        location: {
          type: blogs?.location?.type,
          geolocation: {
            lat: blogs?.location?.geolocation?.lat,
            lon: blogs?.location?.geolocation?.lon,
          },
          address: blogs?.location?.address,
          region: blogs?.location?.region,
        },
        slug: blogs?.slug,
        featured: blogs?.featured,
        headline: {
          text: blogs?.headline?.text,
          slug: blogs?.headline?.slug,
        },
        categories: {
          category: blogs?.category?.category,
        },
        series: {
          series: blogs?.series?.series,
        },
        author: {
          name: blogs?.author?.authorPseudonym,
          picture: blogs?.author?.authorPicture?.url,
          slug: blogs?.author?.slug,
        },
        media: {
          hero: blogs?.media?.hero?.url,
          thumbnail: blogs?.media?.thumbnail?.url,
          gallery: blogs?.media?.galleryCollection?.items.map((item) => ({
            url: item?.url,
          })),
        },
        snippet: {
          title: blogs?.snippet?.title,
          text: documentToHtmlString(blogs?.snippet?.text?.json),
        },
        summary: {
          text: blogs?.summary?.text,
        },
        content: {
          introduction: documentToHtmlString(
            blogs?.content?.introduction?.json
          ),
          body: documentToHtmlString(blogs?.content?.body?.json),
          conclusion: documentToHtmlString(blogs?.content?.conclusion?.json),
        },
        postscript: {
          text: documentToHtmlString(blogs?.postscript?.text?.json),
        },
        references: {
          relatedReferences:
            blogs?.reference?.relatedReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                headline: item.headline,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
                relatedCategory: item.category,
              })
            ),
          suggestedReferences:
            blogs?.reference?.suggestedReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
              })
            ),
          similarReferences:
            blogs?.reference?.similarReferencesCollection?.items.map(
              (item) => ({
                title: item.title,
                section: item.section,
                // media: {
                //   thumbnail: item.media.thumbnail.url,
                // },
                overview: item.overview,
                slug: item.slug,
                tag: item.tag,
              })
            ),
        },
        tag: blogs?.tagsCollection?.items.map((item) => ({
          tags: item?.tags,
          metatag: item?.metatag,
        })),
      };
    });
    documentToPlainTextString(getArticlePost);
    // console.log('Data for getStoresNeumadsReview data:', data);
    // console.log('Data for getStoresNeumadsReview:', getStoresNeumadsReview);
    return data;
  } catch (err) {
    console.error(err);
    // You can decide what to return in case of error, perhaps null or an empty array
    return null;
  }
};








// getAllBlogs
// export const getAllBlogs = async (limit = 9, skip = 0) => {
//   try {

//     const articleData = await getArticleNeumadsTrail(limit, skip);
//     const storeData = await getStoresNeumadsReview(limit, skip);
//     const blogs = [...articleData, ...storeData];
 

   

//     // const stores = json.data.storesNeumadsReviewCollection.items;
//     // // console.log("store", stores);
//     console.log("blogs  !!", blogs);
//     const item = blogs.data.items;
    
//     console.log("item", item);


  
//     // const data = [...articleData, ...storeData].map((item) => ({
//     const data = blogs.map((item) => {
//         return {
//       title: item.title,
//       slug: item.slug,
//       featured: item.featured,
//       headline: item.headline.text,
//       type: item.location.type,
//       lat: item.location.geolocation.lat,
//       lon: item.location.geolocation.lon,
//       address: item.location.address,
//       region: item.location.region,
//       snippet: documentToPlainTextString(item.snippet.text),
//       summary: documentToPlainTextString(item.summary.text),
//       thumbnail: item.media.thumbnail.url,
//       gallery: item.media.gallery.map((galleryItem) => galleryItem.url),
//       hero: item.media.hero.url,
//       introduction: documentToHtmlString(item.content.introduction),
//       body: documentToHtmlString(item.content.body),
//       conclusion: documentToHtmlString(item.content.conclusion),
//       relatedReferences: item.references.relatedReferences.map(
//         (ref) => ref.title
//       ),
//       suggestedReferences: item.references.suggestedReferences.map(
//         (ref) => ref.title
//       ),
//       similarReferences: item.references.similarReferences.map(
//         (ref) => ref.title
//       ),
//       postscript: documentToHtmlString(item.postscript.text),
//       tags: item.tags.map((tagItem) => tagItem.tags),
//       metatag: item.tags.map((tagItem) => tagItem.metatag),
//       };
//     });
//     console.log("all blogs",blogsdata);
//     // documentToPlainTextString(getAllBlogs);
//     // console.log('Data for getStoresNeumadsReview data:', data);
//     // console.log('Data for getStoresNeumadsReview:', getStoresNeumadsReview);
//     return data;
//   } catch (err) {
//     console.error(err);
//     // You can decide what to return in case of error, perhaps null or an empty array
//     return null;
//   }
// };


// src/api.js
const API = {
  fetchLocationDetails: async (input, token) => {
    try {
      const response = await fetch(
        `https://api.foursquare.com/v2/venues/search?near=${input}&v=20210501&limit=5&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&sessionToken=${token}`,
        { method: "GET" }
      );

      const json = await response.json();

      if (json.errors) {
        console.error("API errors:", json.errors);
      }

      if (!json.response) {
        return []; // Return an empty array if no data is found
      }

      const venues = json.response.venues;

      const data = venues.map((venue) => {
        // Implement your data transformation logic here
      });

      // console.log('Data:', data);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};

export default API;

// export const getBlogs = async (limit = 9, skip = 0) => {
//   try {
//     // Pagination
//     const response = await client.getEntries({
//       content_type: "appFastFoodHomePage031523",
//       limit,
//       skip,
//     });
//     // console.log("blog response" + response);
//     let blogs = response.items;
//     console.log("blogs" + blogs);
//     blogs = blogs.map((item) => {
//       const { id, createdAt } = item.sys;
//       const { title, featured, slug } = item.fields;
//       const type = item.fields.location.fields.type;
//       const lat = item.fields.location.fields.geolocation.lat;
//       const lon = item.fields.location.fields.geolocation.lon;
//       const address = item.fields.location.fields.address;
//       const thumbnail = item.fields.media.fields.thumbnail.fields.file.url;
//       const snippet = item.fields.snippet.fields.text.json;
//       const headline = item.fields.headline.fields.text;
//       const category = item.fields.category.fields.category;

//       return {
//         id,
//         title,
//         featured,
//         type,
//         headline,
//         category,
//         series,
//         snippet,
//         thumbnail,
//         lat,
//         lon,
//         address,
//         snippet,

//       };
//     });
//     console.log('Data for getAllBlogs:', getBlogs);
//     documentToPlainTextString(getBlogs);
//     return blogs;
//   } catch (err) {
//     console.log(err);
//   }

// };

// export const getAllBlogs = async (limit = 9, skip = 0) => {
//   try {
//     const query = `
//     query {
//       appFastFoodHomePage031523Collection(where: {featured: false}, limit: 3, skip: 0) {
//         items {
//           title
//           location {
//             ... on ContentTypeLocation {
//               type
//               geolocation {
//                 lat
//                 lon
//               }
//               address
//               region
//             }
//           }
//           featured
//           headline {
//             text
//             eyebrow
//           }
//           slug
//           featured
//           category {
//             category
//           }
//           series {
//             series
//           }
//           author {
//             authorName
//             authorPseudonym
//             authorPicture {
//               url
//             }
//             slug
//           }
//           media {
//             ... on Media {
//               title
//               hero {
//                 url
//               }
//               thumbnail {
//                 url
//               }
//               galleryCollection {
//                 items {
//                   url
//                 }
//               }
//             }
//           }
//           snippet {
//             ... on Snippet {
//               title
//               text {
//                 json
//               }
//             }
//           }
//           summary {
//             ... on Summary {
//               text
//             }
//           }
//           content {
//             ... on Content {
//               introduction {
//                 json
//               }
//               body {
//                 json
//               }
//               conclusion {
//                 json
//               }
//             }
//           }
//           postscript {
//             ... on Postscript {
//               text {
//                 json
//               }
//             }
//           }
//           reference {
//             ... on ReferenceDefault {
//               relatedReferencesCollection(limit: 3) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     category {
//                       category
//                     }
//                     series {
//                       series
//                     }
//                     media {
//                       ... on Media {
//                         thumbnail {
//                           url
//                         }
//                       }
//                     }
//                     slug
//                     snippet {
//                       ... on Snippet {
//                         title
//                         text {
//                           json
//                         }
//                       }
//                     }
//                     tagsCollection {
//                       items {
//                         tags
//                         metatag
//                       }
//                     }
//                   }
//                 }
//               }
//               suggestedReferencesCollection(limit: 3) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     category {
//                       category
//                     }
//                     series {
//                       series
//                     }
//                     media {
//                       ... on Media {
//                         thumbnail {
//                           url
//                         }
//                       }
//                     }
//                     slug
//                     snippet {
//                       ... on Snippet {
//                         title
//                         text {
//                           json
//                         }
//                       }
//                     }
//                     tagsCollection {
//                       items {
//                         tags
//                         metatag
//                       }
//                     }
//                   }
//                 }
//               }
//               similarReferencesCollection(limit: 3) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     category {
//                       category
//                     }
//                     series {
//                       series
//                     }
//                     media {
//                       ... on Media {
//                         thumbnail {
//                           url
//                         }
//                       }
//                     }
//                     slug
//                     snippet {
//                       ... on Snippet {
//                         title
//                         text {
//                           json
//                         }
//                       }
//                     }
//                     tagsCollection {
//                       items {
//                         tags
//                         metatag
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     `;
//     const response = await fetch(
//       "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//       }
//     );

//     const json = await response.json();
//     // console.log('getNonFeaturedBlog JSON:', json); // Debugging information

//     if (json.errors) {
//       console.error("getNonFeaturedBlog GraphQL errors:", json.errors);
//     }
//     if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
//       return []; // Return an empty array if no data is found
//     }

//     // const blogs = json.data.appFastFoodHomePage031523Collection.items;
//     // const articles = json.data.articleNeumadsTrailCollection.items;

//     // const blogs = json.data.appFastFoodHomePage031523Collection.items;
//     // const articles = json.data.articleNeumadsTrailCollection.items;
//     // // console.log("store", stores)

//     // const data = blogs.map((blogs, articles) => {
//     //   return {
//   const data = blogs.map((blogs) => {
//     return {
//       ...blogs,
//       title: blogs?.title,
//       location: {
//         type: blogs?.location?.type,
//         geolocation: {
//           lat: blogs?.location?.geolocation?.lat,
//           lon: blogs?.location?.geolocation?.lon,
//         },
//         address: blogs?.location?.address,
//         region: blogs?.location?.region,
//       },
//       slug: blogs?.slug,
//       featured: blogs?.featured,
//       headline: {
//         text: blogs?.headline?.text,
//         slug: blogs?.headline?.slug,
//       },
//       category: {
//         category: blogs?.category?.category,
//       },
//       series: {
//         series: blogs?.series?.series,
//       },
//       author: {
//         name: blogs?.author?.authorPseudonym,
//         picture: blogs?.author?.authorPicture?.url,
//         slug: blogs?.author?.slug,
//       },
//       media: {
//         hero: blogs?.media?.hero?.url,
//         thumbnail: blogs?.media?.thumbnail?.url,
//         gallery: blogs?.media?.galleryCollection?.items.map(item => ({
//           url: item?.url,
//         })),
//       },
//       snippet: {
//         title: blogs?.snippet?.title,
//         text: documentToHtmlString(blogs?.snippet?.text?.json),
//       },
//       summary: {
//         text: blogs?.summary?.text,
//       },
//       content: {
//         introduction: documentToHtmlString(blogs?.content?.introduction?.json),
//         body: documentToHtmlString(blogs?.content?.body?.json),
//         conclusion: documentToHtmlString(blogs?.content?.conclusion?.json),
//       },
//       attributes: {
//         amentities: blogs?.attributes?.amentities,
//         offers: blogs?.attributes?.offers,
//       },
//       postscript: {
//         text: documentToHtmlString(blogs?.postscript?.text?.json),
//       },
//       references: {
//         relatedReferences: blogs?.reference?.relatedReferencesCollection?.items.map(item => ({
//           title: item.title,headline: item.headline,
//           section: item.section,
//           // media: {
//           //   thumbnail: item.media.thumbnail.url,
//           // },
//           overview: item.overview,
//           slug: item.slug,
//           tag: item.tag,
//           category: item.category,
//         })),
//         suggestedReferences: blogs?.reference?.suggestedReferencesCollection?.items.map(item => ({
//           title: item.title,
//           section: item.section,
//           // media: {
//           //   thumbnail: item.media.thumbnail.url,
//           // },
//           overview: item.overview,
//           slug: item.slug,
//           tag: item.tag,
//         })),
//         similarReferences: blogs?.reference?.similarReferencesCollection?.items.map(item => ({
//           title: item.title,
//           section: item.section,
//           // media: {
//           //   thumbnail: item.media.thumbnail.url,
//           // },
//           overview: item.overview,
//           slug: item.slug,
//           tag: item.tag,
//         })),
//       },
//       tag: blogs?.tagsCollection?.items.map(item => ({
//         tags: item?.tags,
//         metatag: item?.metatag,
//       })),
//     };
//   });
//   documentToPlainTextString(getAllBlogs);
//   console.log('Data for getStoresNeumadsReview data:', data);
//   console.log('Data for getStoresNeumadsReview:', getStoresNeumadsReview);
//   return data;
// } catch (err) {
//   console.error(err);
//   // You can decide what to return in case of error, perhaps null or an empty array
//   return null;
// }
// };

// export const getAllPosts = async (limit = 9, skip = 0) => {
//   try {
//     const query = `
//     query {
//       appFastFoodHomePage031523Collection(where: {featured: false}, limit: 3, skip: 0) {
//         items {
//           title
//           location {
//             ... on ContentTypeLocation {
//               type
//               geolocation {
//                 lat
//                 lon
//               }
//               address
//               region
//             }
//           }
//           featured
//           headline {
//             text
//             eyebrow
//           }
//           slug
//           featured
//           category {
//             category
//           }
//           series {
//             series
//           }
//           author {
//             authorName
//             authorPseudonym
//             authorPicture {
//               url
//             }
//             slug
//           }
//           media {
//             ... on Media {
//               title
//               hero {
//                 url
//               }
//               thumbnail {
//                 url
//               }
//               galleryCollection {
//                 items {
//                   url
//                 }
//               }
//             }
//           }
//           snippet {
//             ... on Snippet {
//               title
//               text {
//                 json
//               }
//             }
//           }
//           summary {
//             ... on Summary {
//               text
//             }
//           }
//           content {
//             ... on Content {
//               introduction {
//                 json
//               }
//               body {
//                 json
//               }
//               conclusion {
//                 json
//               }
//             }
//           }
//           postscript {
//             ... on Postscript {
//               text {
//                 json
//               }
//             }
//           }
//           reference {
//             ... on ReferenceDefault {
//               relatedReferencesCollection(limit: 3) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     category {
//                       category
//                     }
//                     series {
//                       series
//                     }
//                     media {
//                       ... on Media {
//                         thumbnail {
//                           url
//                         }
//                       }
//                     }
//                     slug
//                     snippet {
//                       ... on Snippet {
//                         title
//                         text {
//                           json
//                         }
//                       }
//                     }
//                     tagsCollection {
//                       items {
//                         tags
//                         metatag
//                       }
//                     }
//                   }
//                 }
//               }
//               suggestedReferencesCollection(limit: 3) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     category {
//                       category
//                     }
//                     series {
//                       series
//                     }
//                     media {
//                       ... on Media {
//                         thumbnail {
//                           url
//                         }
//                       }
//                     }
//                     slug
//                     snippet {
//                       ... on Snippet {
//                         title
//                         text {
//                           json
//                         }
//                       }
//                     }
//                     tagsCollection {
//                       items {
//                         tags
//                         metatag
//                       }
//                     }
//                   }
//                 }
//               }
//               similarReferencesCollection(limit: 3) {
//                 items {
//                   ... on AppFastFoodHomePage031523 {
//                     title
//                     category {
//                       category
//                     }
//                     series {
//                       series
//                     }
//                     media {
//                       ... on Media {
//                         thumbnail {
//                           url
//                         }
//                       }
//                     }
//                     slug
//                     snippet {
//                       ... on Snippet {
//                         title
//                         text {
//                           json
//                         }
//                       }
//                     }
//                     tagsCollection {
//                       items {
//                         tags
//                         metatag
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     `;
//     const response = await fetch(
//       "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//       }
//     );

//     const json = await response.json();
//     // console.log('getNonFeaturedBlog JSON:', json); // Debugging information

//     if (json.errors) {
//       console.error("getNonFeaturedBlog GraphQL errors:", json.errors);
//     }
//     if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
//       return []; // Return an empty array if no data is found
//     }

//     // const blogs = json.data.appFastFoodHomePage031523Collection.items;
//     // const articles = json.data.articleNeumadsTrailCollection.items;

//     const blogs = json.data.appFastFoodHomePage031523Collection.items;
//     const articles = json.data.articleNeumadsTrailCollection.items;
//     // console.log("store", stores)

//     // const data = blogs.map((blogs, articles) => {
//     //   return {
//     const data = {
//       title: blogs.map((item) => item.title).concat(articles.map((item) => item.title)),
//       headline: blogs.map((item) => item.headline.text).concat(articles.map((item) => item.headline.text)),
//       slug: blogs.map((item) => item.slug).concat(articles.map((item) => item.slug)),
//       featured: blogs.map((item) => item.featured).concat(articles.map((item) => item.featured)),
//       type: blogs.map((item) => item.location.type).concat(articles.map((item) => item.location.type)),
//       lat: blogs.map((item) => item.location.geolocation.lat).concat(articles.map((item) => item.location.geolocation.lat)),
//       lon: blogs.map((item) => item.location.geolocation.lon).concat(articles.map((item) => item.location.geolocation.lon)),
//       address: blogs.map((item) => item.location.address).concat(articles.map((item) => item.location.address)),
//       region: blogs.map((item) => item.location.region).concat(articles.map((item) => item.location.region)),
//       snippet: blogs.map((item) => item.location.region).concat(articles.map((item) => item.location.region)),
//       summary: blogs.map((item) => item.location.region).concat(articles.map((item) => item.location.region)),
//     };
//     // documentToPlainTextString(appFastFoodHomePage031523Collection, articleNeumadsTrailCollection);
//     // documentToPlainTextString(appFastFoodHomePage031523Collection);
//     // documentToPlainTextString(articleNeumadsTrailCollection);

//     // console.log('Data for getStoresNeumadsReview data:', data);
//     console.log('Data for getAllBlogs:', data);
//     return data;
//   } catch (err) {
//     console.error(err);
//     // You can decide what to return in case of error, perhaps null or an empty array
//     return null;
//   }
// };

//     console.log('Data for getAllBlogs:', getAllBlogs);
//     documentToPlainTextString(getAllBlogs);
//     // console.log('Data for getStoresNeumadsReview data:', data);
//     // console.log('Data for getStoresNeumadsReview:', getStoresNeumadsReview);
//     return data;
//   } catch (err) {
//     console.error(err);
//     // You can decide what to return in case of error, perhaps null or an empty array
//     return null;
//   }
// };

// const response = await fetch(
//   "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   }
// );
// const json = await response.json();
// console.log('getAllBlogs JSON:', json); // Debugging information

// if (json.errors) {
//   console.error("getAllBlogs GraphQL errors:", json.errors);
// }

// if (!json.data) {
//   return []; // Return an empty array if no data is found
// }
// const blogs = json.data.appFastFoodHomePage031523Collection.items;
// // console.log("store", blogs)
//   const data = blogs.map((blogs) => {
//   return {
//     ...blogs,
//     title: blogs?.title,
//     location: {
//       type: blogs?.location?.type,
//       geolocation: {
//         lat: blogs?.location?.geolocation?.lat,
//         lon: blogs?.location?.geolocation?.lon,
//       },
//       address: blogs?.location?.address,
//       region: blogs?.location?.region,
//     },
//     slug: blogs?.slug,
//     featured: blogs?.featured,
//     store: {
//       storeName: blogs?.store?.storeName,
//       storeNickname: blogs?.store?.storeNickname,
//       hours: blogs?.store?.hours,
//       storeWebsite: blogs?.store?.storeWebsite,
//       storeGeolocation: {
//         lat: blogs?.store?.storeGeolocation?.lat,
//         lon: blogs?.store?.storeGeolocation?.lon,
//       },
//       storeAddress: {
//         lat: blogs?.store?.storeAddress?.lat,
//         lon: blogs?.store?.storeAddress?.lon,
//       },
//       storeChain: blogs?.store?.storeChain,
//       storeChainStoresCollection: blogs?.store?.storeChainStoresCollection?.items.map(item => ({
//         storeName: item?.storeName,
//         storeNickname: item?.storeNickname,
//         hours: item?.hours,
//         storeWebsite: item?.storeWebsite,
//         storeGeolocation: {
//           lat: item?.storeGeolocation?.lat,
//           lon: item?.storeGeolocation?.lon,
//         },
//         storeAddress: item?.storeAddress,
//         storeChain: item?.storeChain,
//         storeChainStoresCollection: item?.storeChainStoresCollection?.items.map(item => ({
//           storeName: item?.storeName,
//           storeNickname: item?.storeNickname,
//           hours: item?.hours,
//           storeWebsite: item?.storeWebsite,
//         })),
//         neumadScore: item?.neumadScore,
//         storeRating: item?.storeRating,
//         storeRatingsCount: item?.storeRatingsCount,
//         storeReviewOverview: item?.storeReviewOverview,
//         handles: item?.handles,
//         contact: item?.contact,
//         storeReviewSource: item?.storeReviewSource,
//         storeBio: {
//           title: item?.storeBio?.title,
//           introduction: item?.storeBio?.introduction?.json,
//           body: item?.storeBio?.body?.json,
//           conclusion: item?.storeBio?.conclusion?.json,
//           postscript: item?.storeBio?.postscript?.json,
//         },
//         storeTagsCollection: item?.storeTagsCollection?.items.map(item => ({
//           tags: item?.tags,
//           metatag: item?.metatag,
//         })),
//       })),
//     },
//     headline: {
//       text: blogs?.headline?.text,
//       slug: blogs?.headline?.slug,
//     },
//     category: {
//       category: blogs?.category?.category,
//     },
//     series: {
//       series: blogs?.series?.series,
//     },
//     author: {
//       name: blogs?.author?.authorPseudonym,
//       picture: blogs?.author?.authorPicture?.url,
//       slug: blogs?.author?.slug,
//     },
//     media: {
//       hero: blogs?.media?.hero?.url,
//       thumbnail: blogs?.media?.thumbnail?.url,
//       gallery: blogs?.media?.galleryCollection?.items.map(item => ({
//         url: item?.url,
//       })),
//     },
//     snippet: {
//       title: blogs?.snippet?.title,
//       text: documentToHtmlString(blogs?.snippet?.text?.json),
//     },
//     summary: {
//       text: blogs?.summary?.text,
//     },
//     content: {
//       introduction: documentToHtmlString(blogs?.content?.introduction?.json),
//       body: documentToHtmlString(blogs?.content?.body?.json),
//       conclusion: documentToHtmlString(blogs?.content?.conclusion?.json),
//     },
//     attributes: {
//       amentities: blogs?.attributes?.amentities,
//       offers: blogs?.attributes?.offers,
//     },
//     postscript: {
//       text: documentToHtmlString(blogs?.postscript?.text?.json),
//     },
//     references: {
//       relatedReferences: blogs?.reference?.relatedReferencesCollection?.items.map(item => ({
//         title: item.title,headline: item.headline,
//         section: item.section,
//         // media: {
//         //   thumbnail: item.media.thumbnail.url,
//         // },
//         overview: item.overview,
//         slug: item.slug,
//         tag: item.tag,
//         category: item.category,
//       })),
//       suggestedReferences: blogs?.reference?.suggestedReferencesCollection?.items.map(item => ({
//         title: item.title,
//         section: item.section,
//         // media: {
//         //   thumbnail: item.media.thumbnail.url,
//         // },
//         overview: item.overview,
//         slug: item.slug,
//         tag: item.tag,
//       })),
//       similarReferences: blogs?.reference?.similarReferencesCollection?.items.map(item => ({
//         title: item.title,
//         section: item.section,
//         // media: {
//         //   thumbnail: item.media.thumbnail.url,
//         // },
//         overview: item.overview,
//         slug: item.slug,
//         tag: item.tag,
//       })),
//     },
//     tag: blogs?.tagsCollection?.items.map(item => ({
//       tags: item?.tags,
//       metatag: item?.metatag,
//     })),
//   };
// });
// documentToPlainTextString(getAllBlogs);
// console.log('Data for getStoresNeumadsReview data:', data);
// console.log('Data for getStoresNeumadsReview:', getStoresNeumadsReview);
//   return data;
// } catch (err) {
//   console.error(err);
//   // You can decide what to return in case of error, perhaps null or an empty array
//   return null;
// }
// };

//     const response = await fetch(
//       "https://graphql.contentful.com/content/v1/spaces/i1hcb4885ci0?access_token=Bcy-B6Lvepv3RLYinX-rY9x4KDpxJcv8_IH0PgF6odw&locale=*",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//       }
//     );

//     const json = await response.json();
//     // console.log('getNonFeaturedBlog JSON:', json); // Debugging information

//     if (json.errors) {
//       console.error("getNonFeaturedBlog GraphQL errors:", json.errors);
//     }
//     if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
//       return []; // Return an empty array if no data is found
//     }

//     const appFastFoodItems = json.data.appFastFoodHomePage031523Collection.items;
//     const articleNeumadsItems = json.data.articleNeumadsTrailCollection.items;

//     // const data = {
//     //   title: appFastFoodItems.map((item) => item.title).concat(articleNeumadsItems.map((item) => item.title)),
//     //   headline: appFastFoodItems.map((item) => item.headline.text).concat(articleNeumadsItems.map((item) => item.headline.text)),
//     //   category: appFastFoodItems.map((item) => item.category).concat(articleNeumadsItems.map((item) => item.category)),
//     //   featured: appFastFoodItems.map((item) => item.featured).concat(articleNeumadsItems.map((item) => item.featured)),
//     //   subtext: appFastFoodItems.map((item) => item.overview).concat(articleNeumadsItems.map((item) => item.subtext)),
//     //   thumbnail: appFastFoodItems.map((item) => item.thumbnail.url).concat(articleNeumadsItems.map((item) => item.thumbnail.url)),
//     //   slug: appFastFoodItems.map((item) => item.slug).concat(articleNeumadsItems.map((item) => item.slug)),
//     //   section: appFastFoodItems.map((item) => item.section).concat(articleNeumadsItems.map((item) => item.section)),
//     // };

//     console.log('Nonfeatured data:', data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getFeaturedBlog = async (limit = 6, skip = 1) => {
  try {
    const query = `
    query {
      appFastFoodHomePage031523Collection(where: {featured: true}, limit: ${limit}, skip: ${skip}) {
        items {
            title
            slug
            location {
                ... on ContentTypeLocation {
                  type
                  geolocation {
                    lat
                    lon
                  }
                  address
                  region
                }
              }
          
            headline {
              text
              eyebrow
            }
            featured
            category {
              category
            }
            series {
              series
            }
            media {
              ... on Media {
                thumbnail {
                  url
                }
              }
            }
            snippet {
              ... on Snippet {
                title
                text {
                  json
                }
              }
            }
            postscript {
              ... on Postscript {
                text {
                  json
                }
              }
            }
            reference {
              ... on ReferenceDefault {
                relatedReferencesCollection(limit: 3) {
                  items {
                    ... on AppFastFoodHomePage031523 {
                      title
                      section
                      thumbnail {
                        url
                      }
                      slug
                      overview
                      tagsCollection {
                        items {
                          tags
                          metatag
                        }
                      }
                    }
                  }
                }
                suggestedReferencesCollection(limit: 3) {
                  items {
                    ... on AppFastFoodHomePage031523 {
                      title
                      section
                      thumbnail {
                        url
                      }
                      slug
                      overview
                      tagsCollection {
                        items {
                          tags
                          metatag
                        }
                      }
                    }
                  }
                }
                similarReferencesCollection(limit: 3) {
                  items {
                    ... on AppFastFoodHomePage031523 {
                      title
                      section
                      thumbnail {
                        url
                      }
                      slug
                      overview
                      tagsCollection {
                        items {
                          tags
                          metatag
                        }
                      }
                    }
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
        limit,
        skip,
      }
    );

    const json = await response.json();
    // console.log('JSON:', json);

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const featuredBlogData =
      json.data.appFastFoodHomePage031523Collection.items;
    const data = featuredBlogData;

    console.log("Data:", data);
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
    console.log("primaryFeaturedBlogData JSON:", json); // Debugging information

    if (json.errors) {
      console.error("primaryFeaturedBlogData GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const primaryFeaturedBlogData =
      json.data.appFastFoodHomePage031523Collection.items;
    const data = primaryFeaturedBlogData;

    console.log("Data:", data);
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
    console.log("WorkFeaturedBlog SON:", json); // Debugging information

    if (json.errors) {
      console.error("WorkFeaturedBlog GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const workFeaturedBlogData =
      json.data.appFastFoodHomePage031523Collection.items;
    const data = workFeaturedBlogData;

    console.log("Data:", data);
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
    console.log("workBlogData JSON:", json); // Debugging information

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

    console.log("Data:", data);
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
    console.log("UnwindFeaturedBlog SON:", json); // Debugging information

    if (json.errors) {
      console.error("UnwindFeaturedBlog GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const unwindFeaturedBlogData =
      json.data.appFastFoodHomePage031523Collection.items;
    const data = unwindFeaturedBlogData;

    console.log("Data:", data);
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
    console.log("unwindBlogData JSON:", json); // Debugging information

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

    console.log("Data:", data);
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
    console.log("DineFeaturedBlog SON:", json); // Debugging information

    if (json.errors) {
      console.error("DineFeaturedBlog GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const dineFeaturedBlogData =
      json.data.appFastFoodHomePage031523Collection.items;
    const data = dineFeaturedBlogData;

    console.log("Data:", data);
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
    console.log("dineBlogData JSON:", json); // Debugging information

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

    console.log("Data:", data);
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
    console.log("ShortsFeaturedBlog SON:", json); // Debugging information

    if (json.errors) {
      console.error("ShortsFeaturedBlog GraphQL errors:", json.errors);
    }

    // if (!json.data || !json.data.appFastFoodHomePage031523Collection || !json.data.appFastFoodHomePage031523Collection.items) {
    //   throw new Error("Invalid data format");
    // }

    if (!json.data || !json.data.appFastFoodHomePage031523Collection) {
      return []; // Return an empty array if no data is found
    }
    const shortsFeaturedBlogData =
      json.data.appFastFoodHomePage031523Collection.items;
    const data = shortsFeaturedBlogData;

    console.log("Data:", data);
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
    console.log("shortsBlogData JSON:", json); // Debugging information

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

    console.log("Data:", data);
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
      const {
        title,
        featured,
        section,
        overview,
        introduction,
        authorName,
        category,
        tag,
        metatag,
      } = item.fields;
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
