// src/screens/StoreScreens.js
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils.js";
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api.js";
import DataBlog from "../components/DataPost.js";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";

const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // Adjust the code as per your actual data structure and needs
      },
      [INLINES.HYPERLINK]: (node, next) => {
        // Adjust the code as per your actual data structure and needs
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // Adjust the code as per your actual data structure and needs
      },
    },
  };


  
  let dataBlog = new DataBlog();

  
  const StoreScreen = {
    render: async () => {
          const request = parseRequestUrl();
       // Fetch store data from the API
    const stores = await dataBlog(); // Adjust this call according to your API fetching method


        // Check if the data is fetched properly
        if (!stores || stores.length === 0) {
            return `<div>Error: No store data available</div>`;
          }

          
        //   console.log("storeDetails", storeDetails);
          const validStores = storeDetails.filter(store => store.slug);
        //   console.log("Valid stores:", validStores);
          const store = validStores.find(store => store.slug === request.slug);
        //   console.log("store", store);
          
        
          
        //   TAGS
          const tags = store.tag && store.tag.length ? store.tag[0].tags : [];
          const attributeTags = store.tag && store.tag.length ? store.tag[0].attributeTags : [0];
        //   console.log("Header tags",tags);
          const limitedTags01 = tags.slice(0, 1);
          const limitedAttributeTags01 = attributeTags.slice(0, 1);
          let tagsHTML = '';
          limitedTags01.forEach(tags => {
              tagsHTML += `
              <a href="/#/dine">
                  <div class="section-tag" id="${tags}">
                      <span class="section-tag-divider">
                          <div class="lineV"></div>
                      </span>
                      <span class="section-tag-text medium00">
                          ${tags}
                      </span>
                      <i class="section-tag-icon icon-${tags}"></i>
                  </div>
              </a>
              `
          });
          let attributeTagsHTML = '';
          limitedAttributeTags01.forEach(attributeTags => {
              attributeTagsHTML += `
                  <a href="/#/dine">
                      <div class="section-tag" id="${attributeTags}">
                          <span class="section-tag-divider">
                              <div class="lineV"></div>
                          </span>
                          <span class="section-tag-text medium00">
                              ${attributeTags}
                          </span>
                          <i class="section-tag-icon icon-${attributeTags}"></i>
                      </div>
                  </a>
              `
          });
        //   TAGS




        //   ATTRIBUTES
        const storeAttribute = store.storeAttributes && store.storeAttributes.length ? store.storeAttributes : [];
        console.log("storeAttribute",storeAttribute);
        const limitedstoreAttribute06 = storeAttribute.slice(0, 6);
        console.log("limitedstoreAttribute04",limitedstoreAttribute06);
        let storeAttributesHTML = '';
        limitedstoreAttribute06.forEach(storeAttributes => {
            storeAttributesHTML += `
            <div class="store-storeAttributes-item">
                <div class="store-storeAttributes-icon">
                    <div class="store-storeAttributes-icons-container">
                        <span class="bold03">
                            <i class="store-attributes-icon icon-attributes-${storeAttributes.key}"></i>
                        </span>
                    </div>
                </div>
                <div class="store-storeAttributes-contemt">

                        <span class="bold03">
                            ${storeAttributes.key}
                        </span>
                        <span class="text03">
                            ${storeAttributes.value}
                        </span>

                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        // console.log("storeAttributesHTML",storeAttributesHTML);
        //   ATTRIBUTES






        //   AREA
        const storeArea = store.media.area && store.media.area.length ? store.media.area : [];
        // console.log("area",storeArea);
        // const limitedStoreArea06 = storeArea.slice(0, 6);
        // console.log("limitedarea04",limitedarea06);
        let storeAreaHTML = '';
        storeArea.forEach(storeArea => {
            storeAreaHTML += `
            <div class="store-areas-item">
    
                <div class="store-areas-container">
                    <div class="store-areas-img">
                        <div class="store-areas-img-container">
                            <img src="${storeArea.url}" alt="" />     
                        </div>
                    </div>
                    <span class="header04">
                        ${storeArea.description}
                    </span>
                </div>
       
            </div>
            <div class="lineH"></div>
            `
        });
        // console.log("storeAreas",storeAreaHTML);
        //   AREA





        



      if (!store) {
          console.log(`No store found with slug: ${request.slug}`);
        } else {
          console.log(`Store found:`, store);
          console.log(`Slug:`, store.slug);
        }
        const ratings = store.ratings[0];
        const rating = ratings.key || [];
        const review = ratings.value || [];
        const recommendations = store.recommendation[0];
        const recommend = recommendations.key || [];
        const recommendation = recommendations.value || [];
    //   console.log("recommendation",recommendation);

    
    const summaries = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
    // console.log("summaries",summaries);
    const limitedsummaries04 = summaries.slice(0, 4);
    // console.log("limitedsummaries04",limitedsummaries04);
    let summaryHTML = '';
    limitedsummaries04.forEach(summary => {
        summaryHTML += `
        <div class="store-summary-item">
            <div class="store-summary-icons">
                <div class="store-summary-icons-container">
                    <span class="bold03">
                        <i class="section-tag-icon icon-social-share"></i>
                    </span>
                </div>
            </div>
            <div class="store-summary-contemt">
                <span class="bold03">
                    ${summary.key}
                </span>
                <span class="text03">
                    ${summary.value}
                </span>
            </div>
        </div>
        <div class="lineH"></div>
        `
    });
    console.log("summaryHTML",summaryHTML);


    return `<div class="store-container">dfsdfsdf${storeHtml}</div>`;
  },
  after_render: () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },
};

export default StoreScreen;











// // src/screens/StoreScreens.js
// import DataBlog from "../components/DataPost.js";
// import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
// import { BLOCKS, INLINES } from "@contentful/rich-text-types";
// import { format, parseISO } from "date-fns";

// const StoreScreen = {
//   render: async () => {
//     const dataBlog = new DataBlog();
//     let storeData;

//     try {
//       storeData = await dataBlog.getData();
//     } catch (error) {
//       console.error('Error fetching store data:', error);
//       return `<div>Error fetching store data</div>`;
//     }

//     if (!storeData || storeData.length === 0) {
//       return `<div>No store data available</div>`;
//     }

//     const stores = storeData.filter(data => data.variant === 'stores');

//     // Render store data
//     const storeHtml = stores.map(store => {
//       // Handle rich text for headline and description
//       const headlineHtml = documentToHtmlString(store.headline);
//       const descriptionHtml = documentToHtmlString(store.description);

//       // Handle gallery images
//       const galleryHTML = store.gallery.map(galleryItem => 
//         `<img src="${galleryItem.url}" class="galleryItem ratio1x1" alt="${galleryItem.title}" />`
//       ).join('');

//       return `
//         <div class="store">
//           <h2>${store.title}</h2>
//           <div>${headlineHtml}</div>
//           <div>${descriptionHtml}</div>
//           <div class="gallery">${galleryHTML}</div>
//         </div>
//       `;
//     }).join('');

//     return `<div class="store-container">${storeHtml}</div>`;
//   },
//   after_render: () => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//   },
// };

// export default StoreScreen;