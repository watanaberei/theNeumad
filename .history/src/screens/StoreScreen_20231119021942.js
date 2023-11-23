// src/screens/StoreScreens.js
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils.js";
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api.js";
import DataBlog from "../components/DataPost.js";
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

  let dataBlog = new DataBlog();
  
  const StoreScreen = {
      render: async () => {
          const request = parseRequestUrl();
        //   console.log("Request slug:", request.slug);
          const storeDetails = await dataBlog.getData();
          console.log("storeDetails", storeDetails);
          const validStores = storeDetails.filter(store => store.slug);
        //   console.log("Valid stores:", validStores);
          const store = validStores.find(store => store.slug === request.slug);
        //   console.log("store", store);
          
        
          
        //   TAGS
          const tags = store.tag && store.tag.length ? store.tag[0].tags : [];
          const attributeTags = store.tag && store.tag.length ? store.tag[0].attributeTags : [0];
        //   console.log("Header tags",tags);
          const limitedTags01 = tags.slice(0, 1);
          const limitedAttributeTags01 = attributeTags.slice(0, 1);
          let tagsHTML = '';
          limitedTags01.forEach(tags => {
              tagsHTML += `
              <a href="/#/dine">
                  <div class="section-tag" id="${tags}">
                      <span class="section-tag-divider">
                          <div class="lineV"></div>
                      </span>
                      <span class="section-tag-text medium00">
                          ${tags}
                      </span>
                      <i class="section-tag-icon icon-${tags}"></i>
                  </div>
              </a>
              `
          });
          let attributeTagsHTML = '';
          limitedAttributeTags01.forEach(attributeTags => {
              attributeTagsHTML += `
                  <a href="/#/dine">
                      <div class="section-tag" id="${attributeTags}">
                          <span class="section-tag-divider">
                              <div class="lineV"></div>
                          </span>
                          <span class="section-tag-text medium00">
                              ${attributeTags}
                          </span>
                          <i class="section-tag-icon icon-${attributeTags}"></i>
                      </div>
                  </a>
              `
          });
        //   TAGS




        //   ATTRIBUTES
        const storeAttribute = store.storeAttributes && store.storeAttributes.length ? store.storeAttributes : [];
        console.log("storeAttribute",storeAttribute);
        const limitedstoreAttribute06 = storeAttribute.slice(0, 6);
        console.log("limitedstoreAttribute04",limitedstoreAttribute06);
        let storeAttributesHTML = '';
        limitedstoreAttribute06.forEach(storeAttributes => {
            storeAttributesHTML += `
            <div class="store-storeAttributes-item">
                <div class="store-storeAttributes-icon">
                    <div class="store-storeAttributes-icons-container">
                        <span class="bold03">
                            <i class="store-attributes-icon icon-attributes-${storeAttributes.key}"></i>
                        </span>
                    </div>
                </div>
                <div class="store-storeAttributes-contemt">

                        <span class="bold03">
                            ${storeAttributes.key}
                        </span>
                        <span class="text03">
                            ${storeAttributes.value}
                        </span>

                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        // console.log("storeAttributesHTML",storeAttributesHTML);
        //   ATTRIBUTES






        //   AREA
        const storeArea = store.media.area && store.media.area.length ? store.media.area : [];
        // console.log("area",storeArea);
        // const limitedStoreArea06 = storeArea.slice(0, 6);
        // console.log("limitedarea04",limitedarea06);
        let storeAreaHTML = '';
        storeArea.forEach(storeArea => {
            storeAreaHTML += `
            <div class="store-areas-item">
    
                <div class="store-areas-container">
                    <div class="store-areas-img">
                        <div class="store-areas-img-container">
                            <img src="${storeArea.url}" alt="" />     
                        </div>
                    </div>
                    <span class="header04">
                        ${storeArea.description}
                    </span>
                </div>
       
            </div>
            <div class="lineH"></div>
            `
        });
        // console.log("storeAreas",storeAreaHTML);
        //   AREA





        



      if (!store) {
          console.log(`No store found with slug: ${request.slug}`);
        } else {
          console.log(`Store found:`, store);
          console.log(`Slug:`, store.slug);
        }
        const ratings = store.ratings[0];
        const rating = ratings.key || [];
        const review = ratings.value || [];
        const recommendations = store.recommendation[0];
        const recommend = recommendations.key || [];
        const recommendation = recommendations.value || [];
    //   console.log("recommendation",recommendation);

    
    const summaries = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
    // console.log("summaries",summaries);
    const limitedsummaries04 = summaries.slice(0, 4);
    // console.log("limitedsummaries04",limitedsummaries04);
    let summaryHTML = '';
    limitedsummaries04.forEach(summary => {
        summaryHTML += `
        <div class="store-summary-item">
            <div class="store-summary-icons">
                <div class="store-summary-icons-container">
                    <span class="bold03">
                        <i class="section-tag-icon icon-social-share"></i>
                    </span>
                </div>
            </div>
            <div class="store-summary-contemt">
                <span class="bold03">
                    ${summary.key}
                </span>
                <span class="text03">
                    ${summary.value}
                </span>
            </div>
        </div>
        <div class="lineH"></div>
        `
    });
    console.log("summaryHTML",summaryHTML);




    const grid = document.createElement('div');
    grid.className = 'gridOverlay';
    grid.addEventListener('click', () => onClick(store));

    grid.innerHTML = `
        <div class="grid">
            <div class="o o1"></div>
            <div class="g main">
                <div class="p p1"></div>
                <div class="c c1">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="c c2">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="c c3">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="c c4">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="c c5">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="c c6">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="p p2"></div>
            </div>
            <div class="d d1"></div>
            <div class="g secondary">
                <div class="p p3"></div>
                <div class="c c2 ">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="c c3 ">
                <div class="col col1">col1</div>
                <div class="col col2">col2</div>
                <div class="col col3">col3</div>
                </div>
                <div class="p p4"></div>
            </div>
            <div class="o o2"></div>
        </div>

    `;
    document.body.appendChild(grid);    
    // GRID //





    return `
      <!--STORESCREEN-->
      <div class="main">
    
          
        <!-- /// STORE CONTENT /// -->
          <div class="store-detail">
            <div class="store-container">


            <!------ HERO ------> 
            <section class="store-hero">
              
                <!---- HEADLINE ----> 
                <div class="store-headline">

                    <!------ STORE HEADER ------>
                    <div class="store-header">

                        <!------ NEUSTAR ------>
                        <div class="store-neustars">
                            <span class="text02">
                                ${store.neumadScore}
                            </span>
                        </div>
                        <!------ NEUSTAR ------>

                        <!------ HEADLINE ------>
                        <div class="store-title">
                            <span class="text02">
                                ${store.series.series}
                            </span>

                            <span class="header06">
                                ${store.headline.text}
                            </span>
                        </div>
                        <!------ HEADLINE ------>

                        <!------ SNIPPET ------>
                        <div class="store-snippet">
                            <span class="text03">
                                ${store.snippet.text}
                            </span>
                        </div>
                        <!------ SNIPPET ------>

                    </div>
                    <!------ STORE HEADER ------>





                    <!------ STORE DATA ------>
                    <div class="blog-data">

                        <!---- DATA ---->
                        <div class="tag-collection">
                            
                            <!---- CATEGORY ---->
                            <a href="/#/dine">
                                <div class="section-tag" id="${store.categories.category}">
                                    <i class="section-tag-icon icon-${store.categories.category}"></i>
                                    <span class="section-tag-divider">
                                        <div class="lineV"></div>
                                    </span>
                                    <span class="section-tag-text medium00">
                                        ${store.categories.category}
                                    </span>
                                </div>
                            </a>
                            <!---- CATEGORY ---->

                            <!---- DISTANCE ---->
                            <a href="/#/dine">
                                <div class="section-tag" id="${store.categories.category}">
                                    <span class="section-tag-divider">
                                        <div class="lineV"></div>
                                    </span>
                                    <span class="section-tag-text medium00">
                                        WALKING DISTANCE
                                    </span>
                                    <i class="section-tag-icon icon-${store.categories.category}"></i>
                                </div>
                            </a>
                            <!---- DISTANCE ---->

                            <!---- TIME ---->
                            <a href="/#/dine">
                                <div class="section-tag" id="${store.categories.category}">
                                    <span class="section-tag-divider">
                                        <div class="lineV"></div>
                                    </span>
                                    <span class="section-tag-text medium00">
                                        OPEN LATE
                                    </span>
                                    <i class="section-tag-icon icon-${store.categories.category}"></i>
                                </div>
                            </a>
                            <!---- TIME ---->
                
                            <!---- TAGS ---->
                            ${tagsHTML} 
                            ${attributeTagsHTML} 
                            <!---- TAGS ---->  

                        </div>
                        <!---- TAGS ---->

                        <div class="data-time">
                            <span class="data-time-text text01">2m Read</span>
                        </div>
                    </div>
                </div>
                <!---- HEADLINE ----> 

                <!---- DETAILS ----> 
                <div class="store-headline-details">

                    <!---- CONTENT ----> 
                    <div class="store-headline-details-content">

                        <!---- INFO ---->    
                        <div class="store-info">
                            <div class="store-subtext">
                                <span class="bold03">
                                    Hours
                                </span>
                                <span class="text03">
                                    ${store.hours}
                                </span>
                            </div>

                            <div class="store-subtext">
                                <span class="bold03">
                                    Location
                                </span>
                                <span class="text03">
                                    ${store.location.region}
                                </span>
                            </div>
                        </div>
                        <!---- INFO ---->    

                        <!---- SCORE ---->    
                        <div class="store-score">
                            <div class="store-rating">
                                <span class="oneLine">
                                    <span class="bold02">
                                        <i class="section-tag-icon icon-social-rating"></i>
                                    </span>
                                    <span class="text02">
                                        ${rating} with ${review} Reviews
                                    </span>
                                </span>
                            </div>

                            <div class="store-recommendation">
                                <span class="oneLine">
                                    <span class="bold02">
                                        <i class="section-tag-icon icon-social-thumbsUp"></i>
                                    </span>
                                    <span class="bold02">
                                        ${recommend} 
                                    </span>
                                    <span class="text02">
                                        ${recommendation}
                                    </span>
                                </span>
                            </div>
                            <div class="store-subtext">
                                <span class="oneLine">
                                    <span class="text02">
                                        <i class="section-tag-icon icon-social-share"></i>
                                    </span>
                                    <span class="text02">
                                        Share
                                    </span>
                                </span>
                            </div>
                        </div>
                        <!---- SCORE ---->    
                    </div>
                    <!---- DETAILS ----> 

                    <!---- IMG ----> 
                    <div class="store-headline-details-img">
                        <div class="top store-hero-IMG">
                            <div class="store-hero-container">
                                <img src="${store.media.hero}" alt="" />
                            </div>                   
                        </div>
                    </div>
                    <!---- IMG ----> 

                </div>
                <!---- DETAILS ----> 
                
            </SECTION>
            <!------ HERO ------> 




            <!------ BODY ------> 
            <div class="body">


                <div class="grid-full green">
                </div>



                    <!-- TITLE -->
                    <section class="section-title"> 
                        <div class="store-body-title-container"> 
                            <span class="header04">
                                ${store.overviewTitle}
                            </span>   
                        </div>   
                        <div class="store-body-title-subtext"> 
                            <span class="oneLine">
                                <span class="text01">
                                    <span>
                                        ${store.storeAttributes}
                                    </span>
                                    
                                    <span>
                                        ${store.storeServices}
                                    </span>
                                    <span>
                                        ${store.popularTimes}
                                    </span>
                                </span>     
                            </span>
                        </div> 
                    </section>   
                    <!-- TITLE -->



                </div>


                <!------ BODY-CONTENT ------> 
                <div class="body-container">
                    


                    <!-- LEFT SIDE -->
                    <div class="body-content left">

                        <!-- INTRODUCTION-->      
                        <section class="setion-introduction">
                            <div class="overview-body"> 
                                <span class="text04">
                                    ${store.overview.text}
                                </span>
                            </div>    
  

                            <!-- SUMARRY -->
                            <div class="store-summary-item">
                                <div class="store-summary-icons">
                                    <div class="store-summary-icons-container">
                                        <span class="bold03">
                                            <i class="section-tag-icon icon-social-share"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="store-summary-contemt">
                                    <span class="bold03">
                                        Noise Level:
                                    </span>
                                    <span class="text03">
                                        ${store.summary.noise}
                                    </span>
                                </div>
                            </div>
                            <div class="lineH"></div>
                            <div class="store-summary-item">
                                <div class="store-summary-icons">
                                    <div class="store-summary-icons-container">
                                        <span class="bold03">
                                            <i class="section-tag-icon icon-social-share"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="store-summary-contemt">
                                    <span class="bold03">
                                        Parking:
                                    </span>
                                    <span class="text03">
                                        ${store.summary.parking}
                                    </span>
                                </div>
                            </div>
                            <div class="lineH"></div>
                            <div class="store-summary-item">
                                <div class="store-summary-icons">
                                    <div class="store-summary-icons-container">
                                        <span class="bold03">
                                            <i class="section-tag-icon icon-social-share"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="store-summary-contemt">
                                    <span class="bold03">
                                        Environment:
                                    </span>
                                    <span class="text03">
                                        ${store.summary.environment}
                                    </span>
                                </div>
                            </div>
                            <div class="lineH"></div>
                            <div class="store-summary-item">
                                <div class="store-summary-icons">
                                    <div class="store-summary-icons-container">
                                        <span class="bold03">
                                            <i class="section-tag-icon icon-social-share"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="store-summary-contemt">
                                    <span class="bold03">
                                        Best For:
                                    </span>
                                    <span class="text03">
                                        ${store.summary.best}
                                    </span>
                                </div>
                            </div>
                            <div class="lineH"></div>




                            <!-- Attributes -->
                            <div class="store-attributes"> 
                                <div class="store-body-title">
                                    <span class="oneLine">
                                        <span class="bold04">
                                            What ${store.storeNickname} has to offer
                                        </span>
                                        <span class="bold02">
                                            ${store.attributes}
                                        </span>
                                    </span>
                                </div>
                                <div class="store-attributes"> 
                                    <span class="bold03">
                                        What ${store.storeNickname} has to offer
                                    <span>
                                    <div class="store-storeArea-container">
                                    <div class="store-storeAttributes-">
                                        ${storeAttributesHTML}
                                    </div>
                                </div>   
                            </div>
                            <!-- Attributes -->



                            
                            <!-- AREA -->
                            <div class="store-attributes"> 
                                <div class="store-body-title">
                                    <span class="oneLine">
                                        <span class="bold04">
                                            The Space
                                        </span>
                                    </span>
                                </div>  
                                <div class="store-attributes">       
                                    <div class="store-storeArea-container">
                                        ${storeAreaHTML}    
                                    </div>
                                </div>   
                            </div>
                            <!-- AREA -->
        
                   






                        </section>
                        <!-- INTRODUCTION-->      

                        <!-- FACTS-->      
                        <section class="setion-facts">
                        
                            <!-- ATTRIBUTES -->
                            <div class="store-body-content-service">
                               

                            
                            </div>
                            <!-- ATTRIBUTES -->
                            
                        </section>
                        <!-- FACTS



                    </div>
                    // LEFT SIDE //



                    // RIGHT SIDE //
                    <div class="store-details-content">
                        <div class="">
                            <span class="bold02">
                                Currently:
                            </span>
                            <span class="text02">
                                ${store.popularTimes}
                            </span>
                        </div>
                        <div class="">
                            <span class="bold02">
                                Store Hours:
                            </span>
                            <span class="text02">
                                ${store.hours}
                            </span>
                        </div>
                        <div class="">
                            <span class="bold02">
                                Location:
                            </span>
                            <span class="text02">
                                ${store.location} {distanceToStore}
                            </span>
                        </div>
                    </div>
                    // RIGHT SIDE //


                </section>
            </div>




        </div>
    </div>
</section>

         


                <section class="store-introduction">
                  <div class="store-introduction-content">
                    <div class="store-overview">
                      <span class="text05">
                        ${store.snippet.subtext}
                      </span>
                    </div>
                    <div class="lineH"></div>
                    <div class="blog-data">
                      <div class="tag-collection">
                          
                        <div class="featured-blog-data-container">
                            <a href="/#/${store.category}">
                                <div class="section-tag" id="${store.category}">
                                    <i class="section-tag-icon icon-${store.category}"></i>
                                    <span class="section-tag-divider">
                                    <div class="lineV"></div>
                                    </span>
                                    <span class="section-tag-text medium00">
                                        ${store.category}
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
                                TAGS
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
                      <div class="store-content">
                        <span class="text04">
                          ${store.content.overview}
                        </span>
                      </div>
                    </div>
                    <!-- //INTRODUCTION// -->


                    <!-- //STORES// -->
                    <div class="lineH"></div>
                    
                    <div class="content">
                      <div class="store-content">
                        <span class="text04">
                          STORES
                        </span>
                      </div>
                    </div>
                    <!-- //STORES// -->


                    <!-- //SUMMARY// -->
                    <div class="store-content">
                        
                        <span class="text03">
                          Summary:
                        </span>
                        <ul class="summary-container">  
                          
   
                        </ul>
                    </div>
                    <!-- //SUMMARY// -->
                    
                  </div>
                  <!-- /// HEADER MAIN /// -->


                

                    










                  <!-- /// HEADER SIDEPANEL /// -->
                  <div class="content store-sidepanel">
                    <div class="store-content">
                      <span class="header03">
                        Related Stores
                      </span>

                      <!--TAGS-->
                      <div class="store-info d-flex">
                        <a href="/#/author">
                          <div class="store-author">
                            <span class="d-flex text01">
                            author name
                              </span>
                            <span class="d-flex text01">
                            author social
                              </span>
                          </div>
                        </a>
                      </div>
                      <!--END OF TAGS-->
                      
                    </div>
                  </div>
                    <!-- /// HEADER CONTENT /// -->
                </section>




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






              
                <!-- /// STORE BODY /// -->
                <section class="store-body">    

                  <!-- /// STORE CONTENT /// -->
                  <div class="content">
                    <div class="store-content">
                      <span class="text03">
                        {store.content.body}
                      </span>
                    </div>
                    <div class="store-content">
                      <span class="text03">
                      {store.content.conclusion}
                      </span>
                    </div>
                    <div class="store-content">
                      <span class="text03">
                      {store.content.postscript}
                      </span>
                    </div>
                  </div>
                  <!-- /// STORE CONTENT /// -->








                  <!-- /// STORE SIDEPANEL /// -->
                  <div class="content">
                    <div class="store-content">
                      <span class="header03">
                        Related Stores
                      </span>

                      <!-- /// RELATED REFERENCES /// -->
                      <div class="primary-featured-blog-references">
                        {referencesHTML}
                      </div>
                      
                      
                    </div>
                  </div>
                  <!-- /// STORE CONTENT /// -->









                    </div>

              </section>
              <!-- /// STORE BODY /// -->

              

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
        },
        after_render: () => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          },
        };
  export default StoreScreen;