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

console.log(stores);
    if (!stores.properties) {
        return null; // Return null if there are no properties
      }
      const { 
        lat, popularTimes, best: originalBest, neustar, headline, title, lon, 
        seriesName, region, address, tag: originalTag, 
        slug, variant, thumbnail, gallery: originalGallery, 
        logo, area, recommendations, storeType,environment,
        noiseLevel,parking, categoryType, genre, text, 
        subtext, eyebrow, location, hours, summary, 
        publishedAt,
      } = stores.properties;
    
      const popularTime = popularTimes || [];
      console.log(popularTime);
      const limitedBest03 = originalBest && originalBest.length ? originalBest.slice(0, 3) : [];
      const limitedTags03 = originalTag && originalTag.length ? originalTag[0].tags.slice(0, 3) : [];
      const galleryData = originalGallery && Array.isArray(originalGallery) && originalGallery.length ? originalGallery : [];
      const galleryHTML = generateGalleryHTML(galleryData);
      const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();

// GALLERY IMG
    
    gallery.slice(0, 3).forEach(galleryItem => {
      galleryHTML += `
                <img src="${galleryItem.url}" class="galleryItem ratio1x1" alt="" />
      `;
    });




    // Render store data
    const storeHtml = stores.map(store => `
      <div class="store">
      <span class="header06">
      ${stores.title} ${store.headline}
      <span>
        <span class="header06">
            ${store.headline.text}
        </span>
        <span class="header06">${store.description}</span
        <img src="${store.galleryHTML.url}" alt="" /> 
        ${store.galleryHTML.url}
        <!-- Add more fields as needed -->
      </div>
    `).join('');

    return `    


    <div class="store-container">${storeHtml}</div>`;
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