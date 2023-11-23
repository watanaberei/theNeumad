// src/screens/StoreScreens.js
import DataBlog from "../components/DataPost.js";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

const StoreScreen = {
  render: async () => {
    let dataBlog = new DataBlog();
    let storeData;

    try {
      storeData = await dataBlog.getData();
    } catch (error) {
      console.error('Error fetching store data:', error);
      return `<div>Error fetching store data</div>`;
    }

    if (!Array.isArray(storeData) || storeData.length === 0) {
      return `<div>No store data available</div>`;
    }

    const stores = storeData.filter(data => data.variant === 'stores');
console.log("stores", stores)
    // Render store data
    const storeHtml = stores.map(store => {
      if (!store || !store.gallery || !store.headline || !store.description) {
        return '<div>Store data missing</div>';
      }

      // Handle rich text for headline and description
      const headlineHtml = documentToHtmlString(stores.headline);
      const descriptionHtml = documentToHtmlString(stores.description);

      // Handle gallery images
      const galleryHTML = stores.gallery.map(galleryItem => 
        `<img src="${galleryItem.url}" class="galleryItem ratio1x1" alt="${galleryItem.title}" />`
      ).join('');

      return `
        <div class="store">
          <h2>${stores.title}</h2>
          <div>${headlineHtml}</div>
          <div>${descriptionHtml}</div>
          <div class="gallery">${galleryHTML}</div>
        </div>
      `;
    }).join('');

    return `<div class="store-container">${storeHtml}</div>`;
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