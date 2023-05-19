//Blog.js
import { format, parseISO } from "date-fns";

function generateTags(keywords) {
  const keywordArray = keywords.split(',').map(keyword => keyword.trim());

  return keywordArray.map(keyword => `
    <div class="metadata-tag">
      <span class="metadata-tag-text text01">
        ${blog.tag} 
      </span>
    </div>
  `).join('');
}

const Blog = {
  
  render: (blog) => {
    const tagElements = generateTags(blog.tag);

    return `
          <!--BLOG--> 
          <div class="blog"> 
            <div class="blog-img">
              <a href="/#/blogs/${blog.slug}">
              <img src="https:${blog.thumbnail}" alt="" /></a>
            </div>
            <div class="blog-text">
              <div class="blog-header">
                <a href="/#/blogs/${blog.slug}">
                  <div class="blog-header-container">
                    <span class="blog-title-text bold03">
                    ${
                      blog.title.length > 90
                        ? blog.title.substr(0, 90) + " ..."
                        : blog.title
                    } 
                    </span> 
                    <span class="blog-overview-text text02">
                      ${blog.overview}
                    </span>
                  </div>
                </a>
              </div>
        

              <div class="blog-data">
                  <div class="tag-collection">
                      <div class="featured-blog-data-container">
                        
                          <div class="section-tag" id="${blog.section}">
                              <span class="section-tag-text text01">
                                  ${blog.section}
                              </span>
                          </div>
                      </div>
                      <div class="nav-list-divider">
                          <div class="lineV">
                          </div>
                      </div>
                      <div class="featured-blog-data-container">
                          ${tagElements}
                      </div>   
                      <!--
                      <div class="featured-blog-data-container">
                          <div class="metadata-tag">
                              <span class="metadata-tag-text text01">
                                ${blog.tag} 
                              </span>
                          </div>   
                      </div>   
                      -->
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

export default Blog;



// const featuredBlog = {
//   render: (blog02) => {
//     return `
//           <!--BLOG-->
//           <div class="blog"> 
//             <div class="blog-img">
//               <a href="/#/blogs/${blog02.slug}">
//               <img src="https:${blog02.thumbnail}" alt="" /></a>
//             </div>
//             <div class="blog-text">
//               <div class="blog-section">
//                 <span class="blog-section-text">${blog02.section}</span>
//               </div>
//               <div class="blog-header">
//                 <a href="/#/blogs/${blog02.slug}">
//                   <div class="blog-header-container">
//                     <span class="blog-title-text">
//                     ${
//                       blog02.title.length > 40
//                         ? blog02.title.substr(0, 40) + " ..."
//                         : blog02.title
//                     } 
//                     </span> 
//                     <span class="blog-overview-text">
//                       ${blog02.overview}
//                     </span>
//                     <div class="date">${format(
//                       parseISO(blog02.createdAt),
//                       "PPP"
//                     )}</div>
//                   </div>
//                 </a>
//               </div>
          
//               <!--
//               <div class="d-flex">
//                 <div class="category">
//                   ${blog02.category}
//                 </div>
//                 <div class="date">${format(
//                   parseISO(blog02.createdAt),
//                   "PPP"
//                 )}</div>
//               </div>
//               -->

//               <div class="tag-collection">
//                 <div class="category">
//                   ${blog02.tag} 
//                 </div>
//               </div>
              
              
//               <!-- 
//               <div class="author d-flex">
//                 <div class="author-image">
//                   <img src="https:${blog02.authorImage}" alt="" />
//                 </div>
//                 <div class="author-name">${blog02.authorName}</div>
//               </div>
//               -->
//             </div>
//             <div class="lineH"></div>
//           </div>`;
//   },
// };

// export default Blog02;



