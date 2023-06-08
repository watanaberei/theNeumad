// ./src/components/NonFeaturedBlog.js
import { format, parseISO } from "date-fns";

function generateTags(input) {
  if (Array.isArray(input)) {
    input = input.join(", ");
  } else if (input === null) {
    return "";
  } else if (typeof input !== "string") {
    console.error("Invalid input. Expected a string or an array. Received:", input);
    return "";
  }

  const keywordArray = input.split(",").map((keyword) => keyword.trim()).slice(0, 1);

  return keywordArray
    .map(
      (keyword) => `
    <div class="metadata-tag">
      <span class="metadata-tag-text text01">
        ${keyword}
      </span>
    </div>
  `
    )
    .join("");
}


// NonFeaturedBlog.js

const NonFeaturedBlog = {
  render: (blog) => {
  // Destructure the properties from the featuredBlog object
  const { tag, thumbnail, slug, title, overview, section } = blog;

  // Generate the HTML content for the NonFeaturedBlog component
  return `
    <!--BLOG--> 
    <div class="blog"> 
      <div class="blog-img">
        <a href="/#/blogs/${slug}">
          <img src="${thumbnail}" alt="" />
        </a>
      </div>
      <div class="blog-text">
        <div class="blog-header">
          <a href="/#/blogs/${slug}">
            <div class="blog-header-container">
              <span class="blog-title-text header02">
                ${title}
              </span> 
              <span class="blog-overview-text text02">
                ${overview}
              </span>
            </div>
          </a>
        </div>

        <div class="blog-data">
          <div class="tag-collection">
            <div class="featured-blog-data-container">
              <a href="/#/${section}">
                <div class="section-tag" id="${section}">
                  <i class="section-tag-icon icon-${section}"></i>
                  <span class="section-tag-divider">
                    <div class="lineV"></div>
                  </span>
                  <span class="section-tag-text medium00">
                    ${section}
                  </span>
                </div>
              </a>
            </div>
            <div class="nav-list-divider">
              <div class="lineV"></div>
            </div>
            <div class="featured-blog-data-container">
              ${tag}
            </div>   
          </div>
          <div class="data-time">
            <span class="data-time-text text01">2m Read</span>
          </div>
        </div>
      </div>
      <div class="lineH"></div>
    </div>`;
  }
};

export default NonFeaturedBlog;
