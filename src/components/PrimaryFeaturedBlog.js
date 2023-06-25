// ./src/components/PrimaryFeaturedBlog.js
import allTags from './DataTags';


const PrimaryFeaturedBlog = {
  render: (primaryFeaturedBlog) => {
    // Destructure the properties from the primaryFeaturedBlog object
    const {tag, references, slug,  media, category, headline, location } = primaryFeaturedBlog;
    const tags = tag && tag.length ? tag[0].tags : [];
    // const tags = tag || [];
    console.log("tags", tag)
    // const categories = category;
    // const metatags = metatag && metatag.length ? metatag[0].metatags : [];
    const headlines = headline || [];
    const title = headlines.text;
    const medias = media || [];
    const locations = location || [];
    const coordinate = locations.geolocation;
    const thumbnail = medias.thumbnail;
    const reference = references.relatedReferences || [];
    
    // Generate tags HTML
    const limitedTags03 = tags.slice(0, 3);
    const tagsHTML = allTags(limitedTags03);
      

    // // Generate tags HTML
    // const limitedTags03 = tags.slice(0, 3);
    // let tagsHTML = '';
    // limitedTags03.forEach(tags => {
    //   tagsHTML += `<div class="metadata-tag">
    //                  <span class="metadata-tag-text text01">${tags}</span>
    //                </div>`;
    // });

  
     // Limit to the first two references
     const limitedReferences = reference.slice(0, 2);
     let referencesHTML = '';
     limitedReferences.forEach((reference, index) => {
         console.log("reference object: ", reference);
         referencesHTML += `
         <div class="featured-blog-text">
             <div class="featured-blog-header">
             <a href="/#/${reference.category}/${reference.slug}">
                 <div class="featured-blog-header-container">
                 <span class="featured-blog-title-text header03">
                     ${reference.title}
                 </span> 
                 
                 <span class="featured-blog-overview-text text02">
                     ${reference.overview}
                 </span>
             
                 </div>
             </a>
             </div>
         </div>`;
 
     // If this is not the last reference, add the divider
     if (index !== limitedReferences.length - 1) {
         referencesHTML += '<div class="lineV"></div>';
     }
  
    });

    // Convert category object to lowercase key entries if it's an object
    // let categories = {};
    // if (typeof category === 'object') {
    //   categories = Object.entries(category).reduce((acc, [key, val]) => {
    //     acc[key.toLowerCase()] = val;
    //     return acc;
    //   }, {});
    // }

  // Generate the HTML content for the PrimaryFeaturedBlog component
  return `
  <!-- BLOG --> 
  <div class="primary-featured-blog-container"> 
    <div class="primary-featured-blog"> 
      <div class="primary-featured-blog-img">
        <a href="/#/article/${category}/${slug}"> <!-- Update the href here -->
          <img src="${thumbnail}" alt="" />
        </a>
      </div>
      <div class="primary-featured-blog-text">
        <div class="primary-featured-blog-header">
          <a href="/#/article/${category}/${slug}"> <!-- Update the href here -->
            <div class="primary-featured-blog-header-container">
              <span class="primary-featured-blog-title-text header05">
                ${title}
              </span> 
            </div>
          </a>
        </div>
        <div class="blog-data">
          <div class="tag-collection">
            <div class="featured-blog-data-container">
              <a href="/#/dine">
                <div class="section-tag" id="${category}">
                  <i class="section-tag-icon icon-${category}"></i>
                  <span class="section-tag-divider">
                    <div class="lineV"></div>
                  </span>
                  <a href="/#/${category}">
                    <span class="section-tag-text medium00">
                        ${category}
                    </span>
                  </a>
                </div>
              </a>
            </div>
            <div class="nav-list-divider">
              <div class="lineV"></div>
            </div>
            <div class="blog-data">
              ${tagsHTML}
            </div>   
          </div>
          <div class="data-time">
            <span class="data-time-text text01">2m Read</span>
          </div>
        </div>
      </div>
    </div>
    <div class="lineH"></div>
    <div class="primary-featured-blog-references">
      ${referencesHTML}
    </div>
    <div class="lineH"></div>
  </div>
`;
},
};

export default PrimaryFeaturedBlog;








// import { format, parseISO } from "date-fns";

// function PrimaryFeaturedBlog(blog) {
//     render: (blog) => {
//       if (!blog) {
//         return ""; // Return empty string if blog is undefined
//       }
  
//       const { title, slug, thumbnail, section, tag } = blog;
  
//       // Check if the slug is defined before rendering
//       const blogSlug = slug ? `<a href="/blog/${slug}">${title}</a>` : title;
  
//       return `
//       <!-- PRIMARY FEATURED BLOG -->
//     <div class="primary-featured-blog">
//       <h2 class="blog-title">${blogSlug}</h2>
//       <div class="primary-featured-blog-img">
//         <img src="${thumbnail}" alt="" />
//       </div>

//       <div class="primary-featured-blog-text">
//         <a href="/#/blogs/${slug}">
//           <div class="featured-blog-header">
//             <div class="featured-blog-header-container">
//               <span class="featured-blog-title-text header06">
//                 ${title}
//               </span>
//             </div>
//           </div>
//         </a>

//         <div class="blog-data">
//           <div class="tag-collection">
//             <div class="featured-blog-data-container">
//               <a href="/#/${section}">
//                 <div class="section-tag" id="${section}">
//                   <i class="section-tag-icon icon-${section}"></i>
//                   <span class="section-tag-divider">
//                     <div class="lineV"></div>
//                   </span>
//                   <span class="section-tag-text medium00">
//                     ${section}
//                   </span>
//                 </div>
//               </a>
//             </div>

//             <div class="nav-list-divider">
//               <div class="lineV"></div>
//             </div>

//             <div class="featured-blog-data-container">
//               <div class="metadata-tag">
//                 <span class="metadata-tag-text text01">${tag}</span>
//               </div>
//             </div>
//           </div>
//           <div class="data-time">
//             <span class="data-time-text text01">2m Read</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div class="lineH"></div>
//   `;
//   }
// }

// export default PrimaryFeaturedBlog;