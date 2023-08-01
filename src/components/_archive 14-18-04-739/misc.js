import { format, parseISO } from "date-fns";

const Blog = {
  render: (blog) => {
    return `
          <!--BLOG--> 
          <div class="blog"> 
            <div class="blog-img">
              <a href="/#/blogs/${blog.slug}">
              <img src="https:${blog.thumbnail}" alt="" /></a>
            </div>
            <div class="blog-text">
              <div class="blog-section">
                <span class="blog-section-text">${blog.section}</span>
              </div>
              <div class="blog-header">
                <a href="/#/blogs/${blog.slug}">
                  <div class="blog-header-container">
                    <span class="blog-title-text">
                    ${
                      blog.title.length > 40
                        ? blog.title.substr(0, 40) + " ..."
                        : blog.title
                    } 
                    </span> 
                    <span class="blog-overview-text">
                      ${blog.overview}
                    </span>
                    <div class="date">${format(
                      parseISO(blog.createdAt),
                      "PPP"
                    )}</div>
                  </div>
                </a>
              </div>
          
              <!--
              <div class="d-flex">
                <div class="category">
                  ${blog.category}
                </div>
                <div class="date">${format(
                  parseISO(blog.createdAt),
                  "PPP"
                )}</div>
              </div>
              -->

              <div class="tag-collection">
                <div class="category">
                  ${blog.tag} 
                </div>
              </div>
              
              
              <!-- 
              <div class="author d-flex">
                <div class="author-image">
                  <img src="https:${blog.authorImage}" alt="" />
                </div>
                <div class="author-name">${blog.authorName}</div>
              </div>
              -->
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



