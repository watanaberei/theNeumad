// src/screens/StoreScreens.js
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils.js";
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api.js";
import DataBlog from "../components/DataPost";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";
// import mapNearby from "..components/mapNearby.js";
import mapboxgl from "mapbox-gl";
import { initMap } from "../components/MapApi";


const renderOptions = {
    renderNode: {
      [BLOCKS.EzMBEDDED_ENTRY]: (node, children) => {
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

  function getStoreCurrentStatusHTML(popularTimes) {
    return popularTimes.map(() => {
      const container = document.createElement('div');
      container.className = 'chart-container';
      return container;
    });
  }



  let store = '';
  let dataBlog = new DataBlog();
  const StoreScreen = {
      render: async () => {
        const request = parseRequestUrl();
        console.log("Request slug:", request.slug);
        // const storeDetails = await dataBlog.getData();
        const storeDetails = await dataBlog.getData();
        store = storeDetails.find(store => store.slug === request.slug);
        console.log("storeDetails", storeDetails);
        const validStores = storeDetails.filter(store => store.slug);
        console.log("Valid stores:", validStores);
        // store = validStores.find(store => store.slug === request.slug);
        console.log("store", store);

                
        // SNIPPET
        const snippetOverview = store.snippet.overview || [];
        const snippetFacility = store.snippet.facility || [];
        const snippetExperience = store.snippet.experience || [];
        const snippetService = store.snippet.service || [];
        const snippetLocation = store.snippet.location || [];
        const snippetHours = store.snippet.hours || [];
        

        // NEARBY STORE
        // const nearbyHeadline = store?.nearbyStore?.headline || [];
        // console.log("nearbyHeadline", nearbyHeadline);
        let nearbyHeadline = '';
        let nearbyHours = '';
        let nearbyLogo = '';
        let nearbyLocation = '';
        const nearbyStores = store.nearbyStoresCollection.items || [];
        nearbyStores.forEach(nearbyStore => {
            // Accessing each store's details safely
            const nearbyHeadline = nearbyStore.headline;
            const nearbyHours = nearbyStore.hours;
            const nearbyLocation = nearbyStore.locationCollection.items;
            const nearbyLogo = nearbyStore.logo ? nearbyStore.logo : '';

            // Use these variables as needed in your code
            console.log("nearby", nearbyHeadline, nearbyHours, nearbyLocation, nearbyLogo);
            // Example: console.log(headline, hours, locationItems, logoUrl);
        });
        console.log("nearby", nearbyHeadline, nearbyHours, nearbyLocation, nearbyLogo);
                        
        // TIME
        const popularTime = store?.popularTimes || [];
        console.log(popularTime);

        // Summary
        const limitedBest03 = store?.summary?.best?.length ? store.summary.best.slice(0, 3) : [];
        console.log("limitedBest03", limitedBest03);

        
        // Neustart        
        const neustar = store.neustar || [];
        console.log("neustar",neustar);

       // Store
        const categoryType = store?.category?.genre || [];
        console.log("categoryType", categoryType);
        const address = store?.address || [];
        console.log("address", store?.locationaddress); 


        // MEDIA
        const originalGallery = store.media.gallery && Array.isArray(store.media.gallery) && store.media.gallery.length ? store.media.gallery : [];
        const mediaGallery = store.media.gallery && Array.isArray(store.media.gallery) && store.media.gallery.length ? store.media.gallery : [];
        const mediaGalleryData = originalGallery && Array.isArray(originalGallery) && originalGallery.length ? originalGallery : [];
        const mediaGalleryyHTML = generateMediaGalleryHTML(mediaGalleryData);
        const carouselMediaGalleryHTML = generateCarouselHTML(mediaGalleryData);

        const service = store.media.gallery && Array.isArray(store.media.gallery) && store.media.gallery.length ? store.media.gallery : [];
        const galleryData = originalGallery && Array.isArray(originalGallery) && originalGallery.length ? originalGallery : [];
        const galleryHTML = generateMediaGalleryHTML(mediaGalleryData);
        const carouselGalleryHTML = generateCarouselHTML(mediaGalleryData);

        // let nearbyLogoGallery = '';
        // if (store && store.nearbyStoreCollection && store.nearbyStoreCollection.logo) {
        //     nearbyLogoGallery = store.nearbyStoreCollection.logo;

        // }
        // console.log("nearbyLogoGallery",nearbyLogoGallery);
        const nearbyLogoGalleryData =  nearbyLogo  && Array.isArray(nearbyLogo) && nearbyLogo.length ? nearbyLogo : [];
        const nearbyGalleryHTML = generateLogoCarouselHTML(nearbyLogoGalleryData);


        // Current
        const currentHour = new Date().getHours();
        const currentDay = new Date().getDay();
        
        // TAGS
        const tags = store.tag && store.tag.length ? store.tag[0].tags : [];
        const attributeTags = store.tag && store.tag.length ? store.tag[0].attributeTags : [0];
        //   console.log("Header tags",tags);
        const limitedTags01 = tags.slice(0, 1);
        const originalTag = store.tag && store.tag.length ? store.tag : [];
        const limitedTags03 = originalTag && originalTag.length ? originalTag[0].tags.slice(0, 3) : [];
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
        const storeAttributes = store.storeAttributes && store.storeAttributes.length ? store.storeAttributes : [];
        console.log("storeAttributes",storeAttributes);
        function generateStoreAttributesHTML(storeAttributes) {
            return storeAttributes.slice(0, 6).map(attr => `
            <div class="store-attributes-item">
                <div class="store-attributes-icon">
                <div class="store-attributes-icons-container">
                    <span class="bold03">
                    <i class="store-attributes-icon icon-attributes-${attr.key}"></i>
                    </span>
                </div>
                </div>
                <div class="store-attributes-content">
                <span class="bold03">${attr.key}</span>
                <span class="text03">${attr.value}</span>
                </div>
            </div>
            <div class="lineH"></div>
            `).join('');
        }
        

        //   FACILITY
        const summaryFacility = store.summary.facility && store.summary.facility.length ? store.summary.facility : [];
        console.log("summaryFacility",summaryFacility);
        function generateSummaryFacilityHTML(summaryFacility) {
            return summaryFacility.slice(0, 6).map(attr => `
            <div class="store-attributes-item">
                <div class="store-attributes-icon">
                <div class="store-attributes-icons-container">
                    <span class="bold03">
                    <i class="store-attributes-icon icon-attributes-${attr.key}"></i>
                    </span>
                </div>
                </div>
                <div class="store-attributes-content">
                <span class="bold03">${attr.key}</span>
                <span class="text03">${attr.value}</span>
                </div>
            </div>
            <div class="lineH"></div>
            `).join('');
        }

        //   SERVUCE
        const summaryService = store.summary.service && store.summary.service.length ? store.summary.service : [];
        console.log("summaryService",summaryService);
        function generateSummaryServiceHTML(summaryService) {
            return summaryService.slice(0, 6).map(attr => `
            <div class="store-attributes-item">
                <div class="store-attributes-icon">
                <div class="store-attributes-icons-container">
                    <span class="bold03">
                    <i class="store-attributes-icon icon-attributes-${attr.key}"></i>
                    </span>
                </div>
                </div>
                <div class="store-attributes-content">
                <span class="bold03">${attr.key}</span>
                <span class="text03">${attr.value}</span>
                </div>
            </div>
            <div class="lineH"></div>
            `).join('');
        }





        // In the render function
        //   const storeAttributesHTML = generateStoreAttributesHTML(store.storeAttributes);

        const limitedstoreAttributes06 = storeAttributes.slice(0, 6);
        console.log("limitedstoreAttributes04",limitedstoreAttributes06);
        let storeAttributesHTML = '';
        limitedstoreAttributes06.forEach(storeAttributes => {
            let iconString = storeAttributes.key.trim();
            iconString = iconString.charAt(0).toLowerCase() + iconString.slice(1).replace(/\s/g, '');
            
            storeAttributesHTML += `
            <div class="store-storeAttributes-item">
                <div class="store-storeAttributes-icon">
                    <div class="store-storeAttributes-icons-container">
                        <span class="bold03">
                            <i class="store-attributes-icon icon-attributes-${iconString}"></i>
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
        console.log("storeAttributesHTML",storeAttributesHTML);
        console.log("store.storeAttributes", storeDetails.storeAttributes);


        // FACILITY
        const limitedSummaryFacility06 = summaryFacility.slice(0, 6);
        console.log("limitedstoreAttributes04",limitedSummaryFacility06);
        let summaryFacilityHTML = '';
        limitedSummaryFacility06.forEach(summaryFacility => {
            let iconString = summaryFacility.key.trim();
            iconString = iconString.charAt(0).toLowerCase() + iconString.slice(1).replace(/\s/g, '');

            summaryFacilityHTML += `
            <div class="store-storeAttributes-item">
                <div class="store-storeAttributes-icon">
                    <div class="store-storeAttributes-icons-container">
                        <span class="bold03">
                            <i class="store-attributes-icon icon-attributes-${iconString}"></i>
                        </span>
                    </div>
                </div>
                <div class="store-storeAttributes-contemt">
                    <span class="bold03">
                        ${summaryFacility.key}
                    </span>
                    <span class="text03">
                        ${summaryFacility.value}
                    </span>

                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        console.log("summaryFacilityHTML",summaryFacilityHTML);
        console.log("store.storeAttributes", storeDetails.storeAttributes);


        // SERVICE
        const limitedSummaryService06 = summaryService.slice(0, 6);
        console.log("limitedstoreService04",limitedSummaryService06);
        let summaryServiceHTML = '';
        limitedSummaryService06.forEach(summaryService => {
            // Convert the first letter to lowercase and remove spaces
            let iconString = summaryService.key.trim();
            iconString = iconString.charAt(0).toLowerCase() + iconString.slice(1).replace(/\s/g, '');
        
            summaryServiceHTML += `
            <div class="store-storeAttributes-item">
                <div class="store-storeAttributes-icon">
                    <div class="store-storeAttributes-icons-container">
                        <span class="bold03">
                            <i class="store-service-icon icon-service-${iconString}"></i>
                        </span>
                    </div>
                </div>
                <div class="store-storeAttributes-contemt">
                        <span class="bold03">
                            ${summaryService.key}
                        </span>
                        <span class="text03">
                            ${summaryService.value}
                        </span>

                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        console.log("summaryServiceHTML",summaryServiceHTML);
        console.log("store.storeService", storeDetails.storeService);







        // Neustar
        const generateNeustarIcons = (neustar) => {
            let iconsHTML = '';
            for (let i = 1; i <= 3; i++) {
            if (i <= neustar) {
                iconsHTML += '<i class="icon-neustar-active12"></i>';
            } else {
                iconsHTML += '<i class="icon-neustar-inactive12"></i>';
            }
            }
            return iconsHTML;
        };
        const neustarHTML = `${store.neustar} ${generateNeustarIcons(store.neustar)}`;
        console.log("neustarHTML",neustarHTML);





        // Eyebrow
        function generateHeadlineEyebrow() {
            const eyebrowContent = document.createElement('span');
            eyebrowContent.className = 'card-postCarousel-item listingAStore';
            eyebrowContent.innerHTML = 'Neaby' + ' ' + categoryType;
            return `
            <div class="headline-eyebrow">
                <div class="headline-eyebrow-container">
                    <i class="icon-point-24"></i>
                    <span class="eyebrow text03">
                        <span class="bold">
                        Business
                        </span>
                        ${eyebrowContent.innerHTML}
                    </span>
                </div>
            </div>
            `;
        }
        const headerEyebrow = generateHeadlineEyebrow();
        



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





        const storeCurrentStatusHTML = getStoreCurrentStatusHTML(popularTime);

        storeCurrentStatusHTML.forEach((chartsContainer, idx) => {
            // Check if there is data for the current index
            if (!popularTime[idx] || !Array.isArray(popularTime[idx]) || popularTime[idx].length < 2) return; 
        
            for (let dayIndex = 1; dayIndex < popularTime[idx][0].length; dayIndex++) {
                
                // Logging for debugging
                console.log("Index:", idx, "Data:", popularTime[idx]);
                
                // Additional safety checks to ensure we're not accessing data that doesn't exist
                if (!popularTime[idx][currentHour + 1] || typeof popularTime[idx][currentHour + 1][dayIndex] === 'undefined') {
                    continue;
                }
                
                const currentValue = parseInt(popularTime[idx][currentHour + 1][dayIndex]);
                
                const dayContainer = document.createElement('div');
                dayContainer.classList.add('chart');
        
                const header = document.createElement('div');
                header.classList.add('day-title');
           
                dayContainer.appendChild(header);
           
                if (dayIndex === currentDay + 1) {
                    const currentStatus = document.createElement('div');
                    currentStatus.classList.add('status');
        
                    if (currentValue >= 0 && currentValue <= 5) {
                        currentStatus.textContent = "NOT BUSY";
                        currentStatus.classList.add('not-busy');
                    } else if (currentValue > 5 && currentValue <= 10) {
                        currentStatus.textContent = "MODERATELY BUSY";
                        currentStatus.classList.add('moderately-busy');
                    } else if (currentValue > 10 && currentValue <= 12) {
                        currentStatus.textContent = "BUSY";
                        currentStatus.classList.add('busy');
                    } else {
                        currentStatus.textContent = "PACKED";
                        currentStatus.classList.add('packed');
                    }
        
                    dayContainer.appendChild(currentStatus);
                }
                chartsContainer.appendChild(dayContainer);
            }
        });





        



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
      console.log("recommendation",recommendation);
        const summaryText = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
        const summaryDetails = store.summary && store.summary.overview && store.summary.overview.length ? store.summary.overview : [];
        console.log("summaryText",summaryText);
        const limitedsummaryText04 = summaryText.slice(0, 4);
        const limitedsummaryDetails04 = summaryDetails.slice(0, 4);
        // console.log("limitedsummaryText04",limitedsummaryText04);


        let summaryTextHTML = '';
        limitedsummaryText04.forEach(summaryText => {
            summaryTextHTML += `
            <div class="store-summary-item">
                <div class="store-summary-icons">
                    <div class="store-summary-icons-container">
                        <span class="bold03">
                            <i class="section-tag-icon icon-${summaryText.key}-21"></i>
                        </span>
                    </div>
                </div>
                <div class="store-summary-contemt">
                    <span class="bold03">
                        ${summaryText.key}
                    </span>
                    <span class="text03">
                        ${summaryText.value}
                    </span>
                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        console.log("summaryTextHTML",summaryTextHTML);
        
        let summaryDetailsHTML = '';
        limitedsummaryDetails04.forEach(summaryDetails => {
            summaryDetailsHTML += `
            <div class="store-summary-item">
                <div class="store-summary-icons">
                    <div class="store-summary-icons-container">
                        <span class="bold03">
                            <i class="section-tag-icon icon-${summaryDetails.key}-21"></i>
                        </span>
                    </div>
                </div>
                <div class="store-summary-contemt">
                    <span class="bold03">
                        ${summaryDetails.key}
                    </span>
                    <span class="text03">
                        ${summaryDetails.value}
                    </span>
                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        console.log("summaryDetailsHTML",summaryDetailsHTML);







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
                            ${headerEyebrow}

                            <!------ HEADLINE ------>
                            <div class="store-headline">
                                <span class="header06">
                                    ${store.headline.text}
                                </span>
                            </div>
                            <!------ HEADLINE ------>

                            <!------ NEUSTAR ------>
                            <div class="store-neustars">
                                <span class="text02">
                                    ${neustarHTML}
                                </span>
                            </div>
                            <!------ NEUSTAR ------>

                            <!---- IMG ----> 
                            <div class="store-headline-details-img">
                                <div class="top store-hero-IMG">
                                    <div class="store-hero-container">
                                        <div class="store-hero-container-primary">
                                            <img src="${store.media.hero}" alt="" />
                                        </div>
                                        <div class="store-hero-container-secondary">
                                            <img src="${store.media.gallery[0].url}" alt="" />
                                            <img src="${store.media.gallery[1].url}" alt="" />
                                        </div>
                                    </div>                   
                                </div>
                            </div>
                            <!---- IMG ----> 

                        </div>
                        <!------ STORE HEADER ------>



                    
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







                
                    <!------ EXPERIENCE ------>
                    <section class="store-experience"> 

                        <!------ HEADLINE ------>
                        <div class="store-title">
                            <div class="store-body-title-container"> 
                                <span class="header04">
                                    ${store.overviewTitle}
                                </span>   
                            </div>   
                            <div class="store-body-title-subtext">
                                <span class="header04">
                                Summary details
                                    ${summaryDetailsHTML}
                                </span>   
                            </div>
                        </div>
                        <!------ HEADLINE ------>

                        <!------ OVERVIEW ------>
                        <div class="store-snippet">
                            <span class="text03">
                                Overview
                            </span>
                            <span class="text03">
                                ${store.snippet.overview}
                            </span>
                        </div>
                        <!------ OVERVIEW ------>

                        <div class="lineH"></div>

                        <!------ LIST ------>
                        <div class="blog-data">
                            <div class="store-summary">
                                ${summaryTextHTML}
                            </div>
                        </div>
                        <!------ LIST ------>

                    </section>
                    <!------ EXPERIENCE ------>





                

                
                    <!------ FACILITY ------>
                    <section class="store-facility"> 
                    
                        <!------ HEADLINE ------>
                        <div class="store-title">
                            <div class="store-body-title-container"> 
                                <span class="header04">
                                    Facility
                                </span>   
                            </div>   
                            <div class="store-body-media-carousel">
                                ${carouselGalleryHTML}
                            </div>
                            <div class="store-body-title-subtext">
                            
                                <span class="header04">
                                    ${summaryDetailsHTML}
                                </span>   
                        
                            </div>
                        </div>
                        <!------ HEADLINE ------>

                        <!------ OVERVIEW ------>
                        <div class="store-snippet">
                            <span class="text03">
                                Facility Overview
                            </span>
                            <span class="text03">
                                ${store.snippet.facility}
                            </span>
                        </div>
                        <!------ OVERVIEW ------>

                        <div class="lineH"></div>

                        <!------ LIST ------>
                        <div class="blog-data">
                            <div class="store-summary">
                                <div class="store-storeAttributes-">
                                    ${summaryFacilityHTML}
                                </div>
                            </div>
                        </div>
                        <!------ LIST ------>

                    </section>
                    <!------ FACILITY ------>





                

                
                    <!------ SERVICE ------>
                    <section class="store-service"> 
                    
                        <!------ HEADLINE ------>
                        <div class="store-title">
                            <div class="store-body-title-container"> 
                                <span class="header04">
                                    Service
                                </span>   
                            </div>   
                            <div class="store-body-media-carousel">
                                ${carouselGalleryHTML}
                            </div>
                            <div class="store-body-title-subtext">
                            
                                <span class="header04">
                                    ${summaryDetailsHTML}
                                </span>   
                        
                            </div>
                        </div>
                        <!------ HEADLINE ------>

                        <!------ OVERVIEW ------>
                        <div class="store-snippet">
                            <span class="text03">
                                Facility Overview
                            </span>
                            <span class="text03">
                                ${store.snippet.service}
                            </span>
                        </div>
                        <!------ OVERVIEW ------>

                        <div class="lineH"></div>

                        <!------ LIST ------>
                        <div class="blog-data">
                            <div class="store-summary">
                                <div class="store-storeAttributes-">
                                    ${summaryServiceHTML}
                                </div>
                            </div>
                        </div>
                        <!------ LIST ------>

                    </section>
                    <!------ SERVICE ------>





                

                
                    <!------ LOCATION ------>
                    <section class="store-service"> 
                    
                        <!------ HEADLINE ------>
                        <div class="store-title">
                            <div class="store-body-title-container"> 
                                <span class="header04">
                                    LOCATION
                                </span>   
                            </div>   
                            

                            <!------ MAP ------>
                            <div class="s map" id="map">
                                <div id="map-container" class="fullBleed"></div>
                            </div>
                            <div class="store-body-media-carousel">
                                ${nearbyGalleryHTML}
                            </div>
                            <!------ MAP ------>

                            <div class="store-body-title-subtext">
                            
                                <span class="header04">
                                    ${summaryDetailsHTML}
                                </span>   
                        
                            </div>
                        </div>
                        <!------ HEADLINE ------>

                        <!------ OVERVIEW ------>
                        <div class="store-snippet">
                            <span class="text03">
                                Facility Overview
                            </span>
                            <span class="text03">
                                ${store.snippet.service}
                            </span>
                        </div>
                        <!------ OVERVIEW ------>

                        <div class="lineH"></div>

                        <!------ LIST ------>
                        <div class="blog-data">
                            <div class="store-summary">
                                <div class="store-storeAttributes-">
                                    ${summaryServiceHTML}
                                </div>
                            </div>
                        </div>
                        <!------ LIST ------>

                    </section>
                    <!------ LOCATION ------>



                    
















                    

                    <!------ STORE DATA ------>
                    <div class="blog-data">

                        <!---- DATA ---->
                        <div class="tag-collection">
                            
                            <!---- CATEGORY ---->
                            <a href="/#/dine">
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
                            <!---- CATEGORY ---->

                            <!---- DISTANCE ---->
                            <a href="/#/dine">
                                <div class="section-tag" id="${store.category}">
                                    <span class="section-tag-divider">
                                        <div class="lineV"></div>
                                    </span>
                                    <span class="section-tag-text medium00">
                                        WALKING DISTANCE
                                    </span>
                                    <i class="section-tag-icon icon-${store.category}"></i>
                                </div>
                            </a>
                            <!---- DISTANCE ---->

                            <!---- TIME ---->
                            <a href="/#/dine">
                                <div class="section-tag" id="${store.category}">
                                    <span class="section-tag-divider">
                                        <div class="lineV"></div>
                                    </span>
                                    <span class="section-tag-text medium00">
                                        OPEN LATE
                                    </span>
                                    <i class="section-tag-icon icon-${store.category}"></i>
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




                        <div class="store-body-title-subtext"> 
                            <span class="oneLine">
                                <span class="text01">
                                    <span>
                                    store attributes
                                        ${store.storeAttributes}
                                    </span>
                                    
                                    <span>
                                    store services
                                        ${store.storeServices}
                                    </span>
                                    <span>
                                    popular times
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
    

                                <div class="store-summary">
                                    ${summaryTextHTML}
                                </div>


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

            if (!store || !store.someProperty) {
                // Handle error or missing data
        
                const storeLocation = store.location.geolocation;
                // Initialize the map object
                const map = initMap({
                    container: 'map-container',
                    style: 'mapbox://styles/mapbox/streets-v11', // your map style here
                    center: storeLocation, // Center the map on the store's location
                    zoom: 13 // Adjust zoom as needed
                });

                // Add a marker for the store location
                new mapboxgl.Marker()
                    .setLngLat(storeLocation)
                    .addTo(map);

                // Add a marker for the user's location if available
                if (userLocation) {
                    new mapboxgl.Marker({ "color": "#FF8C00" }) // User marker color can be changed
                        .setLngLat(userLocation)
                        .addTo(map);
                }

                // Adjust the map to fit the bounds of the markers (store and user)
                const bounds = new mapboxgl.LngLatBounds();
                bounds.extend(storeLocation);
                if (userLocation) bounds.extend(userLocation);
                map.fitBounds(bounds, { padding: 50 }); // Adjust padding as needed
            }
        },
    };
  export default StoreScreen;
  




function getStoreStatus(currentValue) {
    if (currentValue >= 0 && currentValue <= 5) {
        return "NOT BUSY";
    } else if (currentValue > 5 && currentValue <= 10) {
        return "MODERATELY BUSY";
    } else if (currentValue > 10 && currentValue <= 12) {
        return "BUSY";
    } else {
        return "PACKED";
    }
}

function generateCarouselItem(content) {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'card-postCarousel-item listingAStore';
    carouselItem.innerHTML = content;
    return carouselItem;
  }

  function generateMediaGalleryHTML(mediaGallery) {
    let mediaGalleryHTML = '';
    mediaGallery.slice(0, 3).forEach(mediaGalleryItem => {
      mediaGalleryHTML += `
                <img src="${mediaGalleryItem.url}" class="galleryItem ratio1x1" alt="" />
      `;
    });
    return mediaGalleryHTML;
}


function generateCarouselHTML(mediaGallery) {
    let mediaGalleryHTML = '';
    mediaGallery.slice(0, 3).forEach(mediaGalleryItem => {
      mediaGalleryHTML += `
                <img src="${mediaGalleryItem.url}" class="galleryItem" alt="" />
      `;
    });
    return mediaGalleryHTML;
}

function generateLogoCarouselHTML(mediaGallery) {
    let mediaGalleryHTML = '';
    mediaGallery.slice(0, 3).forEach(mediaGalleryItem => {
      mediaGalleryHTML += `
                <img src="${mediaGalleryItem}" class="galleryItem" alt="" />
      `;
    });
    return mediaGalleryHTML;
}
