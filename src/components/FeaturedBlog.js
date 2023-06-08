// ./src/components/FeaturedBlog053023.js
const FeaturedBlog = {
    render: (featuredBlog) => {
      // Destructure the properties from the primaryFeaturedBlog object
      const {tag, relatedReferences, slug,  media, category, headline } = featuredBlog;
      const tags = tag && tag.length ? tag[0].tags : [];
      const title = headline || [];
      const medias = media || [];
      const references = relatedReferences || [];
  
      // Generate tags HTML
      const limitedTags03 = tags.slice(0, 3);
      let tagsHTML = '';
      limitedTags03.forEach(tag => {
        tagsHTML += `<div class="metadata-tag">
                       <span class="metadata-tag-text text01">${tag}</span>
                     </div>`;
      });
  
    
        // Limit to the first two references
        const limitedReferences = references.slice(0, 2);
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
      let categories = {};
      if (typeof category === 'object') {
        categories = Object.entries(category).reduce((acc, [key, val]) => {
          acc[key.toLowerCase()] = val;
          return acc;
        }, {});
      }

    // Generate the HTML content for the PrimaryFeaturedBlog component
    return `
    <!-- BLOG --> 
    <div class="featured-blog-container"> 
      <div class="featured-blog"> 
        <div class="featured-blog-img">
          <a href="/#/article/${category}/${slug}"> <!-- Update the href here -->
            <img src="${medias.thumbnail}" alt="" />
          </a>
        </div>
      <div class="featured-blog-text">
        <div class="featured-blog-header">
          <a href="/#/${category}/${slug}">
            <div class="featured-blog-header-container">
              <span class="featured-blog-title-text header04">
                ${title.text}
              </span> 
              <!--
              <span class="featured-blog-overview-text text02">
                
              </span>
              -->
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
                            <span class="section-tag-text medium00">
                                ${category}
                            </span>
                        </div>
                    </a>
                </div>
                <div class="nav-list-divider">
                    <div class="lineV">
                    </div>
                </div>

                <div class="blog-data">
                    
                    ${tagsHTML}
                        
                </div>   
            </div>
            <div class="data-time">
                <span class="data-time-text text01">2m Read</span>
            </div>
        </div>
        <div class="lineH"></div>
        ${referencesHTML}

    </div>

       
    </div>
   
`;
    },
};  

export default FeaturedBlog;














// const FeaturedBlog = {
//     render: (featuredBlog) => {
//       const { title, slug, thumbnail, category, section, tag } = featuredBlog;
  
//       return `
//       <!--FEATURED BLOG-->
//     <div class="featured-blog">
//         <div class="featured-blog-img">
//             <a href="/#/article/${category}/${slug}">
//                 <img src="${thumbnail}" alt="" />
//             </a>
//         </div>

//       <div class="featured-blog-text">
//         <div class="featured-blog-header">
//           <a href="/#/article/${category}/${slug}">
//             <div class="featured-blog-header-container">
//               <span class="featured-blog-title-text header04">
//                 ${title}
//               </span>
//             </div>
//           </a>
//         </div>

//         <div class="featured-blog-data">
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

//         <div class="lineH"></div>
//       </div>
//     </div>
//   `;
//   },
// };

// export default FeaturedBlog;