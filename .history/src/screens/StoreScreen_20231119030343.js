// src/screens/StoreScreens.js
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils.js";
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api.js";
import DataBlog from "../components/DataPost.js";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";


const StoreScreen = {
  render: async () => {
    // Initialize DataBlog instance
    const dataBlog = new DataBlog();

    let storeData;
    try {
      // Fetch data using DataBlog
      storeData = await dataBlog.getData();
    } catch (error) {
      console.error('Error fetching store data:', error);
      return `<div>Error fetching store data</div>`;
    }

    if (!storeData || storeData.length === 0) {
      return `<div>No store data available</div>`;
    }

    // Filter store data only
    const stores = storeData.filter(data => data.variant === 'stores');

 
          



    // Render store data
    const storeHtml = stores.map(store => `
      <div class="store">
        <h2>${store.title}</h2>
        <p>${store.description}</p>
        <!-- Add more fields as needed -->
      </div>
    `).join('');

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