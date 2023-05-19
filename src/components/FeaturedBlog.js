// FeaturedBlog.js
import { format, parseISO } from "date-fns";


const FeaturedBlog = {
  render: (featuredBlog) => {
    
    return `
        <!--FEATURED BLOG--> 
        <div class="featured-blog"> 
            <div class="featured-blog-img">
                <a href="/#/blogs/${featuredBlog.slug}">
                <img src="${featuredBlog.thumbnail.url}" alt="" /></a>
            </div>

            <div class="featured-blog-text">  
                <div class="featured-blog-header">
                    <a href="/#/blogs/${featuredBlog.slug}">
                        <div class="featured-blog-header-container">
                            <span class="featured-blog-title-text header03">
                            ${
                            featuredBlog.title.length > 90 
                                ? featuredBlog.title.substr(0, 90) + " ..."
                                : featuredBlog.title
                            } 
                            </span> 
                            <span class="featured-blog-overview-text text02">
                            ${featuredBlog.overview}
                            </span>
                    
                        </div>
                    </a>
                </div>
        
                <div class="blog-data">
                    <div class="tag-collection">

                        <div class="featured-blog-data-container">
                            <a href="/#/${featuredBlog.section}">
                                <div class="section-tag" id="${featuredBlog.section}">
                                    <i class="section-tag-icon icon-${featuredBlog.section}"></i>
                                    <span class="section-tag-divider">
                                    <div class="lineV"></div>
                                    </span>
                                    <span class="section-tag-text medium00">
                                        ${featuredBlog.section}
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
                                <span class="metadata-tag-text text01">${featuredBlog.tag} </span>
                            </div>   
                        </div>   
                    </div>

                    
                    <div class="data-time">
                        <span class="data-time-text text01">2m Read</span>
                    </div>
                </div>
                
                <div class="lineH"></div>
            </div>
            
            <!--
            <div class="featured-blog-img">
                <a href="/#/blogs/${featuredBlog.slug}">
                <img src="${featuredBlog.thumbnail.url}" alt="" /></a>
            </div>
            -->
        </div>`;
  },
};

export default FeaturedBlog;
