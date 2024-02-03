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
import { storePopularTimes } from "../components/StorePopularTimes";


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

  function getStoreCurrentStatusHTML(popularTimes) {
    return popularTimes.map(() => {
      const container = document.createElement('div');
      container.className = 'chart-container';
      container.id = 'chartContainer';
      return container;
    });
  }

  
function generateStorePopularTimeHTML(popularTimes) {
    // Assuming this function generates an array of div elements
    let htmlString = '';
    popularTimes.forEach(element => {
        htmlString += element.outerHTML;
    });
    return htmlString;
}
    



  let store = '';
  let dataBlog = new DataBlog();
  const StoreScreen = {
    render: async () => {
        const request = parseRequestUrl();
        console.log("Request slug:", request.slug);
        console.log("store:", store);
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
        const nearbyStore = store.nearbyStore || [];
        const nearbyHeadline = nearbyStore.headline;
        console.log("nearbyHeadline", nearbyStore.nearbyHeadline    );
        const nearbyHours = nearbyStore.hours;
        const nearbyLocation = nearbyStore.nearbyLocation;
        // let nearbyHeadline = '';
        // let nearbyHours = '';
        // let nearbyLogo = '';
        // let nearbyLocation = '';
        const nearbyStores = store.nearbyStore || [];
        console.log("nearbyHeadline", nearbyHeadline);
        console.log("nearbyHours", nearbyHours);
        console.log("nearbyLocation", nearbyLocation);
        console.log("NEARBY", nearbyStore);
        // nearbyStores.forEach(nearbyStore => {
        //     // Accessing each store's details safely
        //     const nearbyHeadline = nearbyStores.nearbyHeadline;
        //     const nearbyHours = nearbyStore.hours;
        //     const nearbyLocation = nearbyStore.locationCollection.items;
        //     const nearbyLogo = nearbyStore.logo ? nearbyStore.logo : '';
        // });
        console.log("nearbyStores", nearbyStore.nearbyHeadline, nearbyStore.nearbyHours, nearbyStore.nearbyLocation, nearbyStore.nearbyLogo);
                        
        // TIME
        const popularTime = store?.popularTimes || [];
        storePopularTimes(popularTime);
        console.log("storePopularTimes", storePopularTimes, popularTime);


        // Summary
        const limitedBest02 = store?.summary?.best?.length ? store.summary.best.slice(0, 3) : [];
        console.log("limitedBest02", limitedBest02);

        
        // Neustart        
        const neustar = store.neustar || [];
        console.log("neustar",neustar);

       // Store
        const categoryType = store?.category?.genre || [];
        console.log("categoryType", categoryType);
        const address = store?.address || [];
        console.log("address", store?.locationaddress); 


        // MEDIA
        const mediaArea = store.media.area && Array.isArray(store.media.area) && store.media.area.length ? store.media.area : [];
        const mediaGallery = store.media.gallery && Array.isArray(store.media.gallery) && store.media.gallery.length ? store.media.gallery : [];
        const mediaService = store.media.service && Array.isArray(store.media.service) && store.media.service.length ? store.media.service : [];
        // const mediaGalleryData = mediaGallery && Array.isArray(mediaGallery) && mediaGallery.length ? mediaGallery : [];
        // const mediaGalleryHTML = generateMediaGalleryHTML(mediaGalleryData);
        
        // CAROUSEL
        // const service = store.media.gallery && Array.isArray(store.media.gallery) && store.media.gallery.length ? store.media.gallery : [];
        // const galleryData = mediaGallery && Array.isArray(mediaGallery) && mediaGallery.length ? mediaGallery : [];
        // const galleryHTML = generateMediaGalleryHTML(mediaGalleryData);
        const carouselArea = generateMediaCarouselHTML(mediaArea, 5);
        const carouselServices = generateMediaCarouselHTML(mediaService, 6);
        const carouselGallery = generateMediaCarouselHTML(mediaGallery, 3);
        

    
        const nearbyLogoData = nearbyStores.nearbyLogo && Array.isArray(nearbyStores.nearbyLogo) && nearbyStores.nearbyLogo.length ? nearbyStores.nearbyLogo : [];
        const nearbyGalleryHTML = generateLogoCarouselHTML(nearbyLogoData);


        // Current
        const currentHour = new Date().getHours();
        const currentDay = new Date().getDay();
        console.log("time",currentHour, currentDay);

        // TAGS
        const tags = store.tag && store.tag.length ? store.tag[0].tags : [];
        const attributeTags = store.tag && store.tag.length ? store.tag[0].attributeTags : [0];
        //   console.log("Header tags",tags);
        const limitedTags01 = tags.slice(0, 1);
        const originalTag = store.tag && store.tag.length ? store.tag : [];
        const limitedTags02 = originalTag && originalTag.length ? originalTag[0].tags.slice(0, 3) : [];
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
                    <span class="bold02">
                    <i class="store-attributes-icon icon-attributes-${attr.key}"></i>
                    </span>
                </div>
                </div>
                <div class="store-attributes-content">
                <span class="bold02">${attr.key}</span>
                <span class="text02">${attr.value}</span>
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
                    <span class="bold02">
                    <i class="store-attributes-icon icon-attributes-${attr.key}"></i>
                    </span>
                </div>
                </div>
                <div class="store-attributes-content">
                    <span class="bold02">${attr.key}</span>
                    <span class="text02">${attr.value}</span>
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
                    <span class="bold02">
                    <i class="store-attributes-icon icon-attributes-${attr.key}"></i>
                    </span>
                </div>
                </div>
                <div class="store-attributes-content">
                    <span class="bold02">${attr.key}</span>
                    <span class="text02">${attr.value}</span>
                </div>
            </div>
            <div class="lineH"></div>
            `).join('');
        }

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
                        <span class="bold02">
                            <i class="store-attributes-icon icon-attributes-${iconString}"></i>
                        </span>
                    </div>
                </div>
                <div class="store-storeAttributes-contemt">
                    <span class="bold02">
                        ${storeAttributes.key}
                    </span>
                    <span class="text02">
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
                        <span class="bold02">
                            <i class="store-attributes-icon icon-attributes-${iconString}"></i>
                        </span>
                    </div>
                </div>
                <div class="store-storeAttributes-contemt">
                    <span class="bold02">
                        ${summaryFacility.key}
                    </span>
                    <span class="text02">
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
                        <span class="text02">
                            <i class="store-service-icon icon-service-${iconString}"></i>
                        </span>
                    </div>
                </div>
                <div class="store-storeAttributes-contemt">
                        <span class="text02">
                            ${summaryService.key}
                        </span>
                        <span class="text02">
                            ${summaryService.value}
                        </span>

                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        console.log("summaryServiceHTML",summaryServiceHTML);
        console.log("store.storeService", storeDetails.storeService);



        // BEST
        let bestHTML = '';
        limitedBest02.forEach(best => {
            bestHTML += `
            <div class="metadata-tag">
            <span class="metadata-tag-text text01 bold">${best}</span>
            </div>`;
        });




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


        // Neustar
        const generateNeustarRank = (neustar) => {
            let iconsHTML = '';
            switch (neustar) {
                case 0:
                    iconsHTML += '';
                    break;  
                case 1:
                    iconsHTML += '<i class="neustar-gold60"></i>';
                    break;
                case 2:
                    iconsHTML += '<i class="neustar-silver60"></i>';
                    break;
                case 3:
                    iconsHTML += '<i class="neustar-bronze60"></i>';
                    break;
                default:    
                    iconsHTML += '';
            }
     
            return iconsHTML;
        };
        const neustarRank = `${generateNeustarRank(store.neustar)}`;







        // CAROUSEL// CAROUSEL// CAROUSEL// CAROUSEL// CAROUSEL// CAROUSEL
        // Assuming you have Node.js environment to serve this code and a basic HTML file to run it
        if (document.getElementById('store-body-media-carousel')) {
            document.addEventListener('DOMContentLoaded', function() {
                const carousel = document.createElement('div');
                carousel.className = 'carousel w-full max-w-xs';
        
                const carouselContent = document.createElement('div');
                carouselContent.className = 'carousel-content';
        
                for (let index = 0; index < 5; index++) {
                    const carouselItem = document.createElement('div');
                    carouselItem.className = 'carouselServices';
        
                    const cardContainer = document.createElement('div');
                    cardContainer.className = 'p-1';
        
                    const card = document.createElement('div');
                    card.className = 'card';
        
                    const cardContent = document.createElement('div');
                    cardContent.className = 'card-content flex aspect-square items-center justify-center p-6';
        
                    const numberSpan = document.createElement('span');
                    numberSpan.className = 'text-4xl font-semibold';
                    numberSpan.textContent = index + 1;
        
                    cardContent.appendChild(numberSpan);
                    card.appendChild(cardContent);
                    cardContainer.appendChild(card);
                    carouselItem.appendChild(cardContainer);
                    carouselContent.appendChild(carouselItem);
                }
        
                const carouselPrevious = document.createElement('button');
                carouselPrevious.className = 'carousel-previous';
                carouselPrevious.textContent = '<'; // Set the text or icon for previous button
                carouselPrevious.addEventListener('click', function() {
                    // Implement previous slide functionality
                });
        
                const carouselNext = document.createElement('button');
                carouselNext.className = 'carousel-next';
                carouselNext.textContent = '>'; // Set the text or icon for next button
                carouselNext.addEventListener('click', function() {
                    // Implement next slide functionality
                });
        
                carousel.appendChild(carouselContent);
                carousel.appendChild(carouselPrevious);
                carousel.appendChild(carouselNext);
        
                document.getElementById('store-body-media-carousel').appendChild(carousel);
            });
        } else {
            console.error('store-body-media-carousel element not found');
        }

        // CAROUSEL// CAROUSEL// CAROUSEL// CAROUSEL// CAROUSEL// CAROUSEL









        



        const storeCurrentStatusHTMLss = getStoreCurrentStatusHTML(popularTime);
        const storeCurrentStatusHTMLs = storeCurrentStatusHTML;
      
      
        storeCurrentStatusHTMLss.forEach((chartsContainer, idx) => {
            // Check if there is data for the current index
            if (!popularTime[idx] || !Array.isArray(popularTime[idx]) || popularTime[idx].length < 2) return; 
        
                
                // Logging for debugging
                // console.log("Index:", idx, "Data:", popularTime[idx]);
                
            for (let dayIndex = 1; dayIndex < popularTime[idx][0].length; dayIndex++) {
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
      



        //   AREA
        const storeArea = store.media.area && store.media.area.length ? store.media.area : [];
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
      



        //   Title
        function generateTitle() {
            return `
            <div class="store-areas-item">
            
                <div class="store-areas-container">

                    <span class="header04">
                        ${categoryType}
                    </span>
                    <span class="header04">
                        in
                    </span>
                    <span class="header04">
                        ${store.location.region}
                    </span>

                </div>

            </div>
            
            <div class="lineH"></div>
            `;
        }
        const generateTitleHTML = generateTitle();















       







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
        // console.log("SUMMARYDETAILS", summaryText);

        let summaryTextHTML = '';
        limitedsummaryText04.forEach(summaryText => {
            summaryTextHTML += `
            <div class="store-summary-item">
                <div class="store-summary-icons">
                    <div class="store-summary-icons-container">
                        <span class="bold02">
                            <i class="section-tag-icon icon-${summaryText.key}-21"></i>
                        </span>
                    </div>
                </div>
                <div class="store-summary-contemt">
                    <span class="bold02">
                        ${summaryText.key}
                    </span>
                    <span class="text02">
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
                        <span class="bold02">
                            <i class="section-tag-icon icon-${summaryDetails.key}-21"></i>
                        </span>
                    </div>
                </div>
                <div class="store-summary-contemt">
                    <span class="bold02">
                        ${summaryDetails.key}
                    </span>
                    <span class="text02">
                        ${summaryDetails.value}
                    </span>
                </div>
            </div>
            <div class="lineH"></div>
            `
        });
        console.log("summaryDetailsHTML",summaryDetailsHTML);










































////////// Headline ////////// Headline ////////// Headline //////////
        // Headline Eyebrow
        function generateHeadlineEyebrow() {
            const eyebrowContent = document.createElement('span');
                eyebrowContent.className = 'current-storeRange current-storeType';
                eyebrowContent.innerHTML = 'Neaby' + ' ' + categoryType;
            const currentDistance = document.createElement('span');
                currentDistance.className = 'current-storeDistance';
                currentDistance.innerHTML = '12' + 'mi';
            return `
            <div class="headline-eyebrow">
                <div class="eyebrow">
                    <div class="icon">
                        <i class="icon-point-24"></i>
                    </div>
                    <div class="text">
                        <div class="title">
                            <span class="eyebrow text02 bold">
                                Business
                            </span>
                        </div>
                        <div class="subtitle">
                            <span class="eyebrow text02">
                                ${eyebrowContent.innerHTML}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="label">
                    <span class="eyebrow text02 ">
                        ${currentDistance.innerHTML}
                    </span>
                </div>
            </div>
            `;
        }
        const headlineEyebrow = generateHeadlineEyebrow();


        // ATTRIBUTES
        function generateAttributesArray() {
            let attributesArray = '';
            limitedBest02.forEach(best => {
                attributesArray += `
                <div class="glyph-15-item">
                   
                    <span class="bold text02">${best}</span>
                    <i class="glyph-check-15"></i>

                </div>`;
            });
            return attributesArray;
        }
        
        // Headline Text
        function generateHeadlineText() {
            const eyebrowContent = document.createElement('span');
                eyebrowContent.className = 'card-postCarousel-item listingAStore';
                eyebrowContent.innerHTML = 'Neaby' + ' ' + categoryType;
            const currentDistance = document.createElement('span');
                currentDistance.className = 'currentDistance';
                currentDistance.innerHTML = '12' + 'mi';
            const attributesArray = generateAttributesArray();
            return `
            <div class="headline">

                <div class="text">
                    <div class="primary">
                        <span class="header05">
                            ${store.headline.text}
                        </span>
                    </div>
                    <div class="secondary">
                        <span class="header05">
                            ${store.location.region}
                        </span>
                    </div>
                </div>

                <div class="array">
                    ${attributesArray}
                </div>

            </div>
            `;
        }
        const headlineText = generateHeadlineText();

        // Headline Hero
        function generateHeadlineHeroGallery() {
            const eyebrowContent = document.createElement('span');
                eyebrowContent.className = 'card-postCarousel-item listingAStore';
                eyebrowContent.innerHTML = 'Neaby' + ' ' + categoryType;
            const currentDistance = document.createElement('span');
                currentDistance.className = 'currentDistance';
                currentDistance.innerHTML = '12' + 'mi';
            return `
            <div class="headline-hero">
                <div class="primary">
                    <img src="${store.media.hero}" alt="" />
                </div>
                <div class="secondary">
                    <div class="secondary-item" id="secondary01">
                        <img src="${store.media.gallery[0].url}" alt="" />
                    </div>
                    <div class="secondary-item" id="secondary02">
                        <img src="${store.media.gallery[1].url}" alt="" />
                    </div>
                </div>
    
            </div>
            `;
        }
        const headlineHeroGallery = generateHeadlineHeroGallery();

       // Headline Hero
       function generateHeadlineHeroSingle() {
        const eyebrowContent = document.createElement('span');
            eyebrowContent.className = 'card-postCarousel-item listingAStore';
            eyebrowContent.innerHTML = 'Neaby' + ' ' + categoryType;
        const currentDistance = document.createElement('span');
            currentDistance.className = 'currentDistance';
            currentDistance.innerHTML = '12' + 'mi';
        return `
        <div class="headline-hero">
            <div class="primary">
                <img src="${store.media.hero}" alt="" />
            </div>
        </div>
        `;
    }
    const headlineHeroSingle = generateHeadlineHeroSingle();
////////// Headline ////////// Headline ////////// Headline //////////



































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
                        <div class="headline">
                            ${headlineEyebrow}

                            <!------ HEADLINE ------>
                            <div class="headline-container">
                                
                                ${headlineHeroSingle}
                                ${headlineText}
                                    
                            </div>
                            <!------ HEADLINE ------>

                        </div>
                        <!------ STORE HEADER ------>  
                    </div>
                </section>
                <!---- HEADLINE ----> 


                <section class="store-intro>
                    <!---- DETAILS ----> 
                    <div class="store-headline-details">

                        <!---- CONTENT ----> 
                        <div class="store-headline-details-content">
                            <!--- TITLE --->    
                            <div class="store-info">
                                <div class="store-title">
                                    ${generateTitleHTML}

                                    ${bestHTML}
                                </div>
                            </div>
                            <!--- TITLE --->  

                            <div class="lineH"></div>

                            <!--- OVERVIEW --->    
                            <div class="store-overview">
                                <div class="store-overview-title">
                                    <span class="header04">
                                        Overview
                                    </span>
                                </div>
                                <div class="store-overview-body">
                                    <span class="text02">
                                        ${snippetOverview}
                                    </span>
                                </div>
                            </div>
                            <!--- OVERVIEW --->

                            <div class="lineH"></div>

                            <!--- LIST --->  
                            <div class="content-summary">
                                <div class="blog-data">
                                    <div class="store-summary">
                                        ${summaryTextHTML}
                                    </div>
                                </div>
                            </div>
                            <!--- LIST --->  

                            <div class="lineH"></div>

                        </div>
                    </div>
                </section>




                <div class="lineH"></div>



                <!------ EXPERIENCE ------>
                <section class="store-facility"> 
                
                    <!------ HEADLINE ------>
                    <div class="store-title">
                        <div class="store-body-title-container"> 
                            <span class="header04">
                                Experience
                            </span>   
                        </div>   

                        <!------ SUMMARY LIST ------>
                        <div class="body-title">
                            <span class="text02 bold">
                                Space
                            </span>
                        </div>
                        <div class="blog-data">
                            <div class="store-summary">
                                <span class="text02">
                                    ${summaryTextHTML}
                                </spanz>
                            </div>
                        </div>
                        <!------ SUMMARY LIST ------>

                        <div class="store-body-media-carousel">
                            ${carouselArea}
                        </div>
                        <div class="store-body-title-subtext">
                        
                            <span class="text02">
                                ${summaryDetailsHTML}
                            </span>   
                    
                        </div>
                    </div>
                    <!------ HEADLINE ------>

                    <!------ OVERVIEW ------>
                    <div class="store-snippet">
                        <span class="text02">
                            Facility Overview
                        </span>
                        <span class="text02">
                            ${store.snippet.facility}
                        </span>
                    </div>
                    <!------ OVERVIEW ------>

                    <div class="lineH"></div>
                    
                    <!------ SPACE ------>
                    <div class="store-snippet">
                        <div class="body-title">
                            <span class="text02 bold">
                                The Inside
                            </span>
                        </div>
                        <div class="store-snippet-body">
                            <span class="text02">
                                The seating arrangement of the facility is thoughtfully arranged to embraced the shared space in order to create an environment similar to a school yard during lunch break.
                            </span>
                        </div>
                    </div>
                    <!------ SPACE ------>

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

                    <div class="lineH"></div>

                </section>
                <!------ EXPERIENCE ------>



                <!------ SERVICE ------>
                <section class="store-service"> 
                
                    <!------ HEADLINE ------>
                    <div class="store-title">
                        <div class="store-body-title-container"> 
                            <span class="header04">
                                Services
                            </span>   
                        </div>   
                        <div class="store-body-media-carousel">
                            ${carouselServices}
                        </div>
                        
                        
                    </div>
                    <!------ HEADLINE ------>

                    <!------ OVERVIEW ------>
                    <div class="store-body-title-container"> 
                        <span class="text02 bold">
                            Services
                        </span>   
                    </div>   
                    <div class="store-body-title-container"> 
                        <span class="text02">
                            ${store.snippet.service}
                        </span>   
                    </div>   
                    <!------ OVERVIEW ------>

                    <div class="lineH"></div>

                    
                    <!------ LIST ------>
                    <div class="body-title">
                        <span class="text02 bold">
                            Space
                        </span>
                    </div>
                    <div class="store-snippet-body">
                    <div class="blog-data">
                        <div class="store-summary">
                            <div class="store-storeAttributes-">
                                <span class="text02">
                                    ${summaryServiceHTML}
                                </span>
                            </div>
                        </div>
                    </div>
                    <!------ LIST ------>

                </section>
                <!------ SERVICE ------>

                <!------ LOCATION ------>
                <section class="store-location"> 
                
                    <!------ HEADLINE ------>
                    <div class="store-title">
                        <div class="store-body-title-container"> 
                            <span class="header04">
                                LOCATION
                            </span>   
                        </div>   
                        

                        <!------ MAP ------>
                        <div class="map nearbyMap" id="map">
                            <div id="map-container" class="nearbyMap-container"></div>
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
                        <span class="text02">
                            Facility Overview
                        </span>
                        <span class="text02">
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









                <span class="header06">
                <br><br><br><br>
                TEST         TEST         TEST         TEST         TEST         TEST
                <br><br><br><br>
                </span>


                <div class="w-full max-w-xs" id="carouselContainer>
                    <div class="w-full max-w-xs" id="carouselContainer">
                        <img class="carouselImage" src="image1.jpg" alt="Image 1">
                        <img class="carouselImage" src="image2.jpg" alt="Image 2">
                        <img class="carouselImage" src="image3.jpg" alt="Image 3">
                    </div>
                </div>




                <span class="header06">
                <br><br><br><br>
                TEST         TEST         TEST         TEST         TEST         TEST
                <br><br><br><br>
                </span>















                <span class="header06">
                <br><br><br><br>
                OLD   OLD   OLD   OLD   OLD   OLD   OLD   OLD   OLD   OLD   OLD   OLD
                <br><br><br><br>
                </span>













































                            

                <section class="store-intro>
                    <!---- DETAILS ----> 
                    <div class="store-headline-details">

                        <!---- CONTENT ----> 
                        <div class="store-headline-details-content">
                            <!---- INFO ---->    
                            <div class="store-info">
                                <div class="store-subtext">
                                    <span class="bold02">
                                        Hours
                                    </span>
                                    <span class="text02">
                                        ${store.hours}
                                    </span>
                                </div>

                                <div class="store-subtext">
                                    <span class="bold02">
                                        Location
                                    </span>
                                    <span class="text02">
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
                            <span class="text02">
                                Overview
                            </span>
                            <span class="text02">
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





                

                



                

                






                    <!------ TIME ------>
                    <section class="store-time"> 
                    
                        <!------ HEADLINE ------>
                        <div class="store-title">
                            <div class="store-body-title-container"> 
                                <span class="header04">
                                    LOCATION
                                </span>   
                            </div>   
                            

                            <!------ GRAPH ------>

                            <div class="chart-container" id="chartsContainer">
                                <!-- Dynamic content will be appended here -->
                                ${storeCurrentStatusHTMLss.map(container => container.outerHTML).join('')}
                            </div>
                            <!------ GRAPH ------>

                            <div class="store-body-title-subtext">
                            
                                <span class="header04">
                                    ${summaryDetailsHTML}
                                </span>   
                        
                            </div>
                        </div>
                        <!------ HEADLINE ------>

                        <!------ OVERVIEW ------>
                        <div class="store-snippet">
                            <span class="text02">
                                Facility Overview
                            </span>
                            <span class="text02">
                                ${store.snippet.facility}
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
                    <!------ TIME ------>
                    



                    
















                    

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
                                        <span class="bold02">
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
                            
                            <span class="text02">
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
                        <span class="header02">
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
                        <span class="text02">
                            {store.content.body}
                        </span>
                        </div>
                        <div class="store-content">
                        <span class="text02">
                        {store.content.conclusion}
                        </span>
                        </div>
                        <div class="store-content">
                        <span class="text02">
                        {store.content.postscript}
                        </span>
                        </div>
                    </div>
                    <!-- /// STORE CONTENT /// -->








                    <!-- /// STORE SIDEPANEL /// -->
                    <div class="content">
                        <div class="store-content">
                        <span class="header02">
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
        after_render: async () => {
            window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
            });

            if (!store || !store.someProperty) {
                // Handle error or missing data
                const popularTime = store.popularTimes || [];
                const popularTimes = store.popularTimes || [];
                // const storeLocation = [store.location.geolocation.lat,store.location.geolocation.lon];
                // const storeLocation = store.location.geolocation || [];
                const storeLocation = store.location && store.location.geolocation ? 
                      { lat: store.location.geolocation.lat, lon: store.location.geolocation.lon } : 
                      { lat: 0, lon: 0 }; // Default values if location is not defined
                // Initialize the map object
                console.log("storeLocation",storeLocation);
                // console.log("store.location.geolocation",[store.location.geolocation.lat,store.location.geolocation.lon]);
                // console.log("popularTime",popularTime);
                // console.log("popularTimes",popularTimes);
                
                // Ensure storePopularTimes is called after the DOM is fully loaded
                if (document.getElementById('chartsContainer')) {
                    const popularTimesData = [popularTimes]; // Replace with actual data
                    console.log("popularTimesData",popularTimesData);
                    storePopularTimes(popularTimesData);
                } else {
                    console.error('chartsContainer element not found');
                }
        

                const map = initMap({
                    container: 'map-container',
                    style: 'mapbox://styles/mapbox/streets-v11', // your map style here
                    center: storeLocation, // Center the map on the store's location
                    zoom: 13, // Adjust zoom as needed
                    attributionControl: false,
                });

                // Add a marker for the store location
                // new mapboxgl.Marker()
                //     .setLngLat([storeLocation.lon, storeLocation.lat])
                //     .addTo(map);
                // const bounds = new mapboxgl.LngLatBounds();
                // bounds.extend(new mapboxgl.LngLat([storeLocation.lon, storeLocation.lat]));
                // console.log()
                

                new mapboxgl.Marker()
                    .setLngLat([storeLocation.lon, storeLocation.lat])
                    .addTo(map);
                const bounds = new mapboxgl.LngLatBounds();
                bounds.extend(new mapboxgl.LngLat(storeLocation.lon, storeLocation.lat));
                map.fitBounds(bounds, { padding: 50, duration: 1000 });

                
                // const bounds = new mapboxgl.LngLatBounds();
                // bounds.extend([storeLocation.lon, storeLocation.lat]);
                // map.fitBounds(bounds, { padding: 50, duration: 1000 });

            
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

function generateMediaCarouselHTML(mediaGallery, limit) {
    let mediaGalleryHTML = '';
    const summaryText = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
    console.log("SUMMARYDETAILS", summaryText);
    mediaGallery.slice(0, limit).forEach(mediaGalleryItem => {
      mediaGalleryHTML += `
            <div class="gallery-item">
                <img src="${mediaGalleryItem.url}" class="gallery-item-img" alt="" />
                <div class="gallery-item-details">
                    <span class="text02">
                        ${mediaGalleryItem.description}
                    </span>
                </div>
            </div>
            
      `;
    });
    return mediaGalleryHTML;
}

function generateSectionHTML(header, features, overview, summary) {
    let mediaGalleryHTML = '';
    const summaryText = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
    console.log("SUMMARYDETAILS", summaryText);
    mediaGallery.slice(0, limit).forEach(mediaGalleryItem => {
      mediaGalleryHTML += `
            <div class="gallery-item">
                <img src="${mediaGalleryItem.url}" class="gallery-item-img" alt="" />
                <div class="gallery-item-details">
                    <span class="text02">
                        ${mediaGalleryItem.description}
                    </span>
                </div>
            </div>
            
      `;
    });
    return mediaGalleryHTML;
}

function generateLogoCarouselHTML(nearbyLogo) {
    let nearbyLogoHTML = '';
    nearbyLogo.slice(0, 3).forEach(nearbyLogoItem => {
        nearbyLogoHTML += `
                <img src="${nearbyLogoItem}" class="galleryItem" alt="" />
      `;
    });
    console.log("mediaGallery",nearbyLogo);
    return nearbyLogoHTML;
}   // Generate the HTML for the carousel









// let index = 0;
// let images = document.querySelectorAll('.carouselImage');

// function carousel() {
//     for(let i = 0; i < images.length; i++) {
//         images[i].style.display = 'none';
//     }
//     index++;
//     if(index > images.length) {index = 1}
//     images[index-1].style.display = 'block';
//     setTimeout(carousel, 2000); // Change image every 2 seconds
// }

// carousel();