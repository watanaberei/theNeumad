// PrimaryFeaturedBlog.js
import { format, parseISO } from "date-fns";


const PrimaryFeaturedBlog = {
  render: (primaryFeaturedBlog) => {
    
    return `
        <!--FEATURED BLOG--> 
       
            <div class="primary-featured-blog"> 
                <a href="/#/blogs/${primaryFeaturedBlog.slug}">
                <div class="primary-featured-blog-img">
                    <img src="${primaryFeaturedBlog.thumbnail.url}" alt="" />
                </div>
                </a>

                <div class="primary-featured-blog-text">  
                    <a href="/#/blogs/${primaryFeaturedBlog.slug}">
                        <div class="featured-blog-header">
                            
                            <div class="featured-blog-header-container">
                                <span class="featured-blog-title-text header06">
                                    ${primaryFeaturedBlog.title}
                                    <!--${
                                        primaryFeaturedBlog.title.length > 40 
                                        ? primaryFeaturedBlog.title.substr(0, 40) + " ..."
                                        : primaryFeaturedBlog.title
                                    } -->
                                </span> 
                                <!--
                                <span class="featured-blog-overview-text text02">
                                    ${primaryFeaturedBlog.overview}
                                </span>
                                -->
                            </div>

                        </div>
                    </a>
            
                    <div class="blog-data">
                        <div class="tag-collection">
                            
                            <div class="featured-blog-data-container">
                                <a href="/#/${primaryFeaturedBlog.section}">
                                    <div class="section-tag" id="${primaryFeaturedBlog.section}">
                                        <i class="section-tag-icon icon-${primaryFeaturedBlog.section}"></i>
                                        <span class="section-tag-divider">
                                        <div class="lineV"></div>
                                        </span>
                                        <span class="section-tag-text medium00">
                                            ${primaryFeaturedBlog.section}
                                        </span>
                                    </div>
                                </a>
                            </div>
                                
                         
                            <div class="nav-list-divider">
                                <div class="lineV">
                                </div>
                            </div>

                            
                            <div class="featured-blog-data-container">
                                <div class="metadata-tag">
                                    <span class="metadata-tag-text text01">${primaryFeaturedBlog.tag}</span>
                                </div>   
                            </div>    
                        </div>
                        <div class="data-time">
                            <span class="data-time-text text01">2m Read</span>
                        </div>
                    </div>
                </a>
            </div>
            <div class="lineH"></div>
        </div>

        `;
  },
};

export default PrimaryFeaturedBlog;
