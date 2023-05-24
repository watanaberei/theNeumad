import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils.js";
import { getArticleNeumadsTrail } from "../api.js";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      // Adjust the code as per your actual data structure and needs
    },
    [INLINES.HYPERLINK]: (node, next) => {
      // Adjust the code as per your actual data structure and needs
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // Adjust the code as per your actual data structure and needs
    },
  },
};

const ArticleScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const articledetails = await getArticleNeumadsTrail(request.slug);
    return articledetails.map((article) => {
      return `
      <!--ARTICLESCREEN-->
      <div class="main">

          
        <!-- /// ARTICLE CONTENT /// -->
          <div class="article-detail">
            <div class="article-container">
              <div class="top fullBleedContent">
                <div class="fullBleedContentHeader">
                  <div class="fullBleedContentHeaderContainer">
                    <div class="featured-image">
                    <iframe width='100%' height='400px' src="https://api.mapbox.com/styles/v1/neumad/clhnxih6h00lc01r84anx0lpx.html?title=false&access_token=pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww&zoomwheel=false#11/40.7571/-73.9622" title="Untitled" style="border:none;"></iframe>
                      <img src="${article.hero.heroImage}" alt="" />
                  
                    </div>                    
                  </div>
                </div>
              </div>
              
              <section class="article-headline">
                <div class="article-header">
                  <div class="article-title">
                    <span class="display05">
                      ${article.title}
                    </span>
                  </div>
                  <div class="article-overview">
                    <span class="text02">
                       ${article.subtext}
                    </span>
                  </div>
                  <div class="lineH"></div>
                  <div class="blog-data">
                    <div class="tag-collection">
                        
                      <div class="featured-blog-data-container">
                          <a href="/#/${article.section}">
                              <div class="section-tag" id="${article.section}">
                                  <i class="section-tag-icon icon-${article.section}"></i>
                                  <span class="section-tag-divider">
                                  <div class="lineV"></div>
                                  </span>
                                  <span class="section-tag-text medium00">
                                      ${article.section}
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
                              <span class="metadata-tag-text text01">${article.tag}</span>
                          </div>   
                      </div>    
                    </div>
                    <div class="data-time">
                        <span class="data-time-text text01">2m Read</span>
                    </div>
                  </div>
                  
                  <!-- //INTRODUCTION// -->
                  <div class="lineH"></div>
                  <div class="content">
                    <div class="article-content">
                      <span class="text03">
                        ${article.content.introduction}
                      </span>
                    </div>
                  </div>
                  <!-- //INTRODUCTION// -->

                  <!-- //SUMMARY// -->
                  <div class="article-content">
                      
                      <span class="text03">
                        Summary:
                      </span>
                      <ul class="summary-container">  
                        
                        ${Array.isArray(article.summary.bullets) ? article.summary.bullets.map(bullet => `
                          <li class="summary-item">
                            <span class="text03">   
                              — ${bullet}
                             </span>
                          </li>
                        `).join('') : ''}
                      </ul>
                  </div>
                  <!-- //SUMMARY// -->
                  
                </div>
                <!-- /// HEADER MAIN /// -->


                

                    










                  <!-- /// HEADER SIDEPANEL /// -->
                  <div class="content">
                    <div class="article-content">
                      <span class="header03">
                        Related Articles
                      </span>

                      <!--TAGS-->
                      <div class="article-info d-flex">
                        <a href="/#/${article.author.category}">
                          <div class="article-author">
                            <img class="article_authorImg" src="${article.author.picture}" alt="" />
                            <span class="d-flex text01">
                                ${article.author.name}
                              </span>
                            <span class="d-flex text01">
                                "${article.author.social}"
                              </span>
                        
                          </div>
                        </a>
                        
                        

                        <!--
                        <div class="article-data">
                          <div class="tag-collection">
                            <div class="featured-article-data-container">
                              <a href="/#/${article.category}">
                                <div class="section-tag" id="${article.category}">
                                  <i class="section-tag-icon icon-${article.category}"></i>
                                  <span class="section-tag-divider">
                                  <div class="lineV"></div>
                                  </span>
                                  <span class="section-tag-text medium00">
                                    ${article.category}
                                  </span>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                        -->
                        <!--END OF TAGS-->
                      </section>
                      <!-- /// HEADER CONTENT /// -->



                <!--ADVERTISEMENT-->
                <div class="content content-advertisement content-advertistment-details">
                  <div class="ad-container container">
                    <div class="ad d-flex" id="ad-home">
                      <a href="/#/">
                        <img src="./images/ad_test.png" />
                      </a>
                    </div>
                  </div>
                </div>
                <!--ADVERTISEMENT-->






              
                <!-- /// ARTICLE BODY /// -->
                <section class="article-body">    

                  <!-- /// ARTICLE CONTENT /// -->
                  <div class="content">
                    <div class="article-content">
                      <span class="text03">
                        ${article.content.body}
                      </span>
                    </div>
                    <div class="article-content">
                      <span class="text03">
                      ${article.content.conclusion}
                      </span>
                    </div>
                    <div class="article-content">
                      <span class="text03">
                      ${article.content.postscript}
                      </span>
                    </div>
                  </div>
                  <!-- /// ARTICLE CONTENT /// -->








                  <!-- /// ARTICLE SIDEPANEL /// -->
                  <div class="content">
                    <div class="article-content">
                      <span class="header03">
                        Related Articles
                      </span>

                      <!-- /// RELATED REFERENCES /// -->
                      ${article.relatedReferences.map(reference => `
                      <div class="blog"> 
                        <div class="blog-img">
                          <a href="/#/blog/${reference.slug}">
                          <img src="${reference.thumbnail}" alt="" /></a>
                        </div>
                        <div class="blog-text">
                          <div class="blog-header">
                            <a href="/#/blog/${reference.slug}">
                              <div class="blog-header-container">
                                <span class="blog-title-text bold03">
                                ${reference.title}
                                
                                </span> 
                                <span class="blog-overview-text text02">
                                  ${reference.overview}
                                </span>
                              </div>
                            </a>
                          </div>
                    

                            <div class="blog-data">
                                <div class="tag-collection">
                                    <div class="featured-blog-data-container">
                                        <a href="/#/dine">
                                            <div class="section-tag" id="${article.reference.section}">
                                                <i class="section-tag-icon icon-${article.reference.section}"></i>
                                                <span class="section-tag-divider">
                                                <div class="lineV"></div>
                                                </span>
                                                <span class="section-tag-text medium00">
                                                    ${article.reference.section}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="nav-list-divider">
                                        <div class="lineV">
                                        </div>
                                    </div>

                                    <div class="blog-data-container">
                                        <div class="metadata-tag">
                                            <span class="metadata-tag-text text01">${article.reference.tag} </span>
                                        </div>   
                                    </div>   
                                </div>
                                <div class="data-time">
                                    <span class="data-time-text text01">2m Read</span>
                                </div>
                            </div>
                          

                        </div>
                        <div class="lineH"></div>
                      </div>
                      `).join('')}
                      
                      
                    </div>
                  </div>
                  <!-- /// ARTICLE CONTENT /// -->









                    </div>

              </section>
              <!-- /// ARTICLE BODY /// -->

              

              <!--
              <div class="side-ad">
                <div class="lineH"></div>
                <a href="#" class="vertical-ad">
                  <img src="/images/side-ad.svg"/>
                </a>
              </div>
              -->

            </div>
          </div>
          
    `;
      }

    );
  },
  after_render: () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  },
};

export default ArticleScreen;
