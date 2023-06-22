// ./src/components/AllBlog.js
const AllBlog = {
  render: (allBlog) => {
    // Destructure the properties from the primaryAllBlog object
    const {tag, slug,  media, category, headline} = allBlog;
    const tags = tag && tag.length ? tag[0].tags : [];
    // const metatags = metatag && metatag.length ? metatag[0].metatags : [];
    // const tags = tag || [];
    const title = headline || [];
    const categories = category.category;
    const medias = media || [];

    // console.log("tags: ", tags);

    // Generate tags HTML
    const limitedTags03 = tags.slice(0, 3);
    let tagsHTML = '';
    limitedTags03.forEach(tags => {
      tagsHTML += `<div class="metadata-tag">
                     <span class="metadata-tag-text text01">${tags}</span>
                   </div>`;
    });
  
    // Convert category object to lowercase key entries if it's an object
    // let categories = {};
    // if (typeof AllCategory.category === 'object') {
    //   categories = Object.entries(AllCategory.category).reduce((acc, [key, val]) => {
    //     acc[key.toLowerCase()] = val;
    //     return acc;
    //   }, {});
    // }

  // Generate the HTML content for the PrimaryAllBlog component
  return `
  <!--BLOG--> 
  <div class="blog"> 
    <div class="blog-img">
        <a href="/#/article/${categories}/${slug}"> <!-- Update the href here -->
          <img src="${medias.thumbnail}" alt="" />
        </a>
      </div>
    <div class="blog-text">
      <div class="blog-header">
        <a href="/#/${categories}/${slug}">
          <div class="blog-header-container">
            <span class="blog-title-text header04">
              ${title.text}
            </span> 
            <!--
            <span class="blog-overview-text text02">
              
            </span>
            -->
          </div>
        </a>
      </div>


      <div class="blog-data">
          <div class="tag-collection">
              <div class="blog-data-container">
                  <a href="/#/dine">
                      <div class="section-tag" id="${categories}">
                          <i class="section-tag-icon icon-${categories}"></i>
                          <span class="section-tag-divider">
                          <div class="lineV"></div>
                          </span>
                          <a href="/#/${categories}">
                            <span class="section-tag-text medium00">
                                ${categories}
                            </span>
                          </a>
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


  </div>

     
  </div>
 
`;
  },
};  

export default AllBlog;