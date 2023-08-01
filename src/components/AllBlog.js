// ./src/components/AllBlog.js
import allTags from './DataTags';

const AllBlog = {
  render: (allBlog) => {
    const {tag, reference, slug, media, categories, headline, location, variant } = allBlog;
    // console.log("variant",variant);
    // Destructure th2222222e properties from the primaryAllBlog object

    const tags = tag && tag.length ? tag[0].tags : [];
    // const metatags = metatag && metatag.length ? metatag[0].metatags : [];
    // const tags = tag || [];
    const headlines = headline || [];
    const title = headlines.text;
    const medias = media || [];
    // const locations = location || [];
    // const lat = locations.geolocation.lat;
    // const lon = locations.geolocation.lon;
    const locations = location || [];
    const coordinate = locations.geolocation;

    // const coordinate = locations.geolocation;
    const thumbnail = medias.thumbnail;
    const category = categories.category;
    // const references = reference.relatedReferences || [];
    // Generate tags HTML
    const limitedTags03 = tags.slice(0, 3);
    const tagsHTML = allTags(limitedTags03);
    // const limitedTags03 = tags.slice(0, 3);
    // let tagsHTML = '';
    // limitedTags03.forEach(tags => {
    //   tagsHTML += `<div class="metadata-tag">
    //                  <span class="metadata-tag-text text01">${tags}</span>
    //                </div>`;
    // });
    // console.log("limitedTags03",limitedTags03);
  
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
    <a rel="noopener noreferrer nofollow" target="${category}-${allBlog.sys.id}" href="/#/${variant}/${slug}">
      <div class="blog-img">
        <img src="${thumbnail}" alt="" />
      </div>
      <div class="blog-text">
        <div class="blog-header">
          <div class="blog-header-container">
            <span class="blog-title-text header04">
              ${title}
            </span> 
            <!--
            <span class="blog-overview-text text02">
              
            </span>
            -->
          </div>
        </div>
      </a>


      <div class="blog-data">
          <div class="tag-collection">
              <div class="blog-data-container">
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