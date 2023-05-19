//NonFeaturedBlog.js
import { format, parseISO } from "date-fns";

function generateTags(input) {
  if (Array.isArray(input)) {
    input = input.join(', ');
  } else if (input === null) {
    return '';
  } else if (typeof input !== 'string') {
    console.error('Invalid input. Expected a string or an array. Received:', input);
    return '';
  }

  const keywordArray = input.split(',').map(keyword => keyword.trim()).slice(0, 1);

  return keywordArray.map(keyword => `
    <div class="metadata-tag">
      <span class="metadata-tag-text text01">
        ${keyword}
      </span>
    </div>
  `).join('');
}


const NonFeaturedBlog = {
  render: (nonFeaturedBlog) => {
    const sentence = nonFeaturedBlog.tag;
    const tagElements = generateTags(sentence);


    return `
          <!--BLOG--> 
          <div class="blog"> 
            <div class="blog-img">
              <a href="/#/blogs/${nonFeaturedBlog.slug}">
              <img src="${nonFeaturedBlog.thumbnail.url}" alt="" /></a>
            </div>
            <div class="blog-text">
              <div class="blog-header">
                <a href="/#/blogs/${nonFeaturedBlog.slug}">
                  <div class="blog-header-container">
                    <span class="blog-title-text bold03">
                    ${
                      nonFeaturedBlog.title.length > 90
                        ? nonFeaturedBlog.title.substr(0, 90) + " ..."
                        : nonFeaturedBlog.title
                    } 
                    </span> 
                    <span class="blog-overview-text text02">
                      ${nonFeaturedBlog.overview}
                    </span>
                  </div>
                </a>
              </div>
        

              <div class="blog-data">
                  <div class="tag-collection">
                  <div class="featured-blog-data-container">
                      <a href="/#/${nonFeaturedBlog.section}">
                          <div class="section-tag" id="${nonFeaturedBlog.section}">
                              <i class="section-tag-icon icon-${nonFeaturedBlog.section}"></i>
                              <span class="section-tag-divider">
                              <div class="lineV"></div>
                              </span>
                              <span class="section-tag-text medium00">
                                  ${nonFeaturedBlog.section}
                              </span>
                          </div>
                      </a>
                  </div>
                      <div class="nav-list-divider">
                          <div class="lineV">
                          </div>
                      </div>
                      <div class="featured-blog-data-container">
                          ${tagElements}
                      </div>   
                  </div>
                  <div class="data-time">
                      <span class="data-time-text text01">2m Read</span>
                  </div>
              </div>
              

            </div>
            <div class="lineH"></div>
          </div>`;
  },
};

export default NonFeaturedBlog;











// //Blog.js
// import { format, parseISO } from "date-fns";

// const NonFeaturedBlog = {
//   render: (nonFeaturedBlog) => {
//     return `
//           <!--BLOG--> 
//           <div class="blog"> 
//             <div class="blog-img">
//               <a href="/#/blogs/${nonFeaturedBlog.slug}">
//               <img src="${nonFeaturedBlog.thumbnail.url}" alt="" /></a>
//             </div>
//             <div class="blog-text">
//               <div class="blog-header">
//                 <a href="/#/blogs/${nonFeaturedBlog.slug}">
//                   <div class="blog-header-container">
//                     <span class="blog-title-text bold02">
//                     ${
//                         nonFeaturedBlog.title.length > 40
//                         ? nonFeaturedBlog.title.substr(0, 40) + " ..."
//                         : nonFeaturedBlog.title
//                     } 
//                     </span> 
//                     <span class="blog-overview-text text02">
//                       ${nonFeaturedBlog.overview}
//                     </span>
//                   </div>
//                 </a>
//               </div>
        

//               <div class="blog-data">
//                   <div class="tag-collection">
//                       <div class="featured-blog-data-container">
//                         <a href="/#/dine">
//                             <div class="section-tag" id="${nonFeaturedBlog.section}">
//                                 <i class="section-tag-icon icon-${nonFeaturedBlog.section}"></i>
//                                 <span class="section-tag-divider">
//                                 <div class="lineV"></div>
//                                 </span>
//                                 <span class="section-tag-text medium00">
//                                     ${nonFeaturedBlog.section}
//                                 </span>
//                             </div>
//                         </a>
//                       </div>
//                       <div class="nav-list-divider">
//                           <div class="lineV">
//                           </div>
//                       </div>

//                       <div class="blog-data-container">
//                           <div class="metadata-tag">
//                               <span class="metadata-tag-text text01">${nonFeaturedBlog.tag} </span>
//                           </div>   
//                       </div>   
//                   </div>
//                   <div class="data-time">
//                       <span class="data-time-text text01">2m Read</span>
//                   </div>
//               </div>
              

//             </div>
//             <div class="lineH"></div>
//           </div>`;
//   },
// };

// export default NonFeaturedBlog;

