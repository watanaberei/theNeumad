// src/screens/StoreScreens.js
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { parseRequestUrl } from "../utils.js";
import {
  getStoresNeumadsReview,
  getArticleNeumadsTrail,
  getArticlePost,
  getStore,
} from "../api.js";
import DataBlog from "../components/DataPost";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { format, parseISO } from "date-fns";

import * as hero from "../components/hero";
import * as eyebrow from "../components/eyebrow";
import * as MapDistance from "../components/MapDistance";
import * as Geolocate from "../components/Geolocate";
import * as section from "../components/section";
import * as experience from "../components/experience";
import * as service from "../components/service";
import * as facility from "../components/facility";
import * as panel from "../components/panel";
import * as suggestion from "../components/suggestion";
import { modals } from "../components/modal";


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

//   function getStoreCurrentStatusHTML(popularTimes) {
//     return popularTimes.map(() => {
//       const container = document.createElement('div');a
//       container.className = 'chart-container';
//       container.id = 'chartContainer';
//       return container;
//     });
//   }

// function generateStorePopularTimeHTML(popularTimes) {
//     // Assuming this function generates an array of div elements
//     let htmlString = '';
//     popularTimes.forEach(element => {
//         htmlString += element.outerHTML;
//     });
//     return htmlString;
// }











let store = "";
let dataBlog = new DataBlog();

const AboutScreen = {
  render: async () => {
    const request = parseRequestUrl();
    // console.log("Request slug:", request.slug);
    // console.log("store:", store);
    // const storeData = await dataBlog.getData();
    const storeData = await dataBlog.getData();
    // store = storeData.find(store => store.slug === request.slug);
    store = storeData[22];
    // console.log("storeData", storeData);
    const validStores = storeData.filter((store) => store.slug);
    // console.log("Valid stores:", validStores);
    // store = validStores.find(store => store.slug === request.slug);
    // console.log("slug", store.slug);
    console.log("store", store);

    // DISTANCE
    let userCoordinates = null;
    const coordinateUser = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              userCoordinates = [
                position.coords.longitude,
                position.coords.latitude,
              ];
              // console.log("WORKS userCoordinates geolocate", userCoordinates);
              resolve(userCoordinates);
              return [userCoordinates[0], userCoordinates[1]];
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          console.log("Geolocation not available");
          reject(new Error("Geolocation not available"));
        }
      });
    };
    const coordinateStore = Geolocate.coordinateStore(store);
    // console.log("!!!!!!!!!coordinateStore", coordinateStore);
    const storeLocation = [
      store.location.geolocation.lon,
      store.location.geolocation.lat,
    ];

    const userLocation = await coordinateUser();
    // console.log("userLocation", userLocation);

    const calculateDistance = MapDistance.calculateDistance(
      userLocation,
      storeLocation
    );
    // console.log("calculateDistance", calculateDistance);

    const storeRange = getStoreRange(calculateDistance);
    // console.log("storeRange",storeRange);
    









        // MEDIA
        const mediaArea = store.media.area && Array.isArray(store.media.area) && store.media.area.length ? store.media.area : [];
        const mediaGallery = store.media.gallery && Array.isArray(store.media.gallery) && store.media.gallery.length ? store.media.gallery : [];
        const mediaService = store.media.service && Array.isArray(store.media.service) && store.media.service.length ? store.media.service : [];
        // CAROUSEL
        const carouselArea = generateMediaCarouselHTML(mediaArea, 5);
        const carouselServices = generateMediaCarouselHTML(mediaService, 6);
        const carouselGallery = generateMediaCarouselHTML(mediaGallery, 3);


   //////////////////////////// SNIPPET ////////////////////////////
   const snippetOverview = store.snippet.overview || [];
   const snippetFacility = store.snippet.facility || [];
   const snippetExperience = store.snippet.experience || [];
   const snippetService = store.snippet.service || [];
   const snippetLocation = store.snippet.location || [];
   const snippetHours = store.snippet.hours || [];





    const popularTimesData = store.popularTimes || [];
    



    
    const thumbnails = store?.media?.thumbnail;
    const heroModuleHtml = hero.heroModule.render(store.media.hero);
    const neustar = store.neustar;
    const headline = store?.headline?.text;
    const locationRegion = store?.location?.region;
    // console.log("!#$#%#@$%!$#%$!#", headline, locationRegion);

    const limitedBest02 = store?.summary?.best?.length
      ? store.summary.best.slice(0, 3)
      : [];
    // ATTRIBUTES
    function generateAttributesArray() {
      let attributesArray = "";
      limitedBest02.forEach((best) => {
        attributesArray += `
          <div class="item">
              <div class="text">
                
                <span class="bold text02">${best}</span>
                <i class="glyph glyph-check-15"></i>
              </div>
          </div>`;
      });
      return attributesArray;
    }

    const attributesArray = generateAttributesArray();
    let headlineOBject = {
      headlineText: store.headline.text,
      locationRegion: store.location.region,
      attributesArrays: attributesArray,
    };

    const storeCoordinates = Geolocate.coordinateStore(store);
    // console.log("storeCoordinates", storeCoordinates);
    // console.log("coordinateUser", coordinateUser);

    // const mediaArea = store.media.area && Array.isArray(store.media.area) && store.media.area.length ? store.media.area : [];
    
    let storeObject = {
      mediaArea: store.media.area && Array.isArray(store.media.area) && store.media.area.length ? store.media.area : [],
      mediaPlatinum: thumbnails,
      neustar: neustar,
      buttonFloating: "labelButton",
      headlineText: store?.headline?.text || "Default Headline", // Provide a default value
      locationRegion: store?.location?.region || "Default Region", // Provide a default value
      attributesArrays: attributesArray,
      storeRegion: store.region,
      // userLocation: coordinateUser,
      currentDistance: MapDistance.calculateDistance(userLocation,storeLocation),
      storeRange: getStoreRange(calculateDistance),
      storeTypes: store.category.genre,
      storeType: store.category.categoryType,
      storeCategory: store.location.type,


       // ATTRIBUTES
       attributesBest: store?.summary?.best?.length ? store.summary.best.slice(0, 3) : [],
       attributesFacility: store.summary.facility && store.summary.facility.length ? store.summary.facility : [],
       attributesExperience: store.summary.experience && store.summary.experience.length ? store.summary.experience : [],
       attributesOverview: store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [],
       attributeService: store.summary.service && store.summary.service.length ? store.summary.service : [],

      // MEDIA
      // code array of store.media.area.description
      mediaArea: store.media.area && Array.isArray(store.media.area) && store.media.area.length ? store.media.area : [],
      // mediaService: store.media.service && Array.isArray(store.media.service) && store.media.service.length ? store.media.service : [],
      // mediaAreaLimit: '6',
      storeArea: store?.media?.area?.description || [],
      snippetOverview:store.snippet.overview || [],
      snippetFacility:store.snippet.facility || [],
      snippetExperience:store.snippet.experience || [],
      snippetService: store.snippet.service || [], 
      

      // SUGGESTIONS
      suggestThumbnailURL01: "store.suggestThumbnailURL01",
      suggestTitle01: "store.suggestTitle01",
      suggestTitle01: "store.suggestNeustarHTML01",
      suggestStoreDistanceHTML01: "store.suggestStoreDistanceHTML01",
      suggestGenre01: "store.suggestGenre01",
      suggestRegion01: "store.suggestRegion01",
      suggestCurrentStatus01:" store.suggestCurrentStatus01",
      suggestCurrentHoursHTML01: "store.suggestCurrentHoursHTML01",
      suggestEnvironment01: "store.suggestEnvironment01",
      suggestNoiseLevel01: "store.suggestNoiseLevel01",
      suggestParking01:" store.suggestParking01[0]"
    };
    // console.log("storeObject", storeObject);

    let heroMediaHTML = hero.mediaHero.render(storeObject);
    let eyebrowHeroHTML = eyebrow.eyebrowHero.render(storeObject);
    let overviewSection = await section.section.render(storeObject);
    let experienceSection = experience.experiences.render(storeObject);
    // console.log(storeObject);
    // const heroModuleHtml = hero.heroModule.render( thumbnails );

    //////////////////////////////////////////////////////////////
    //////////////////////////// HERO ////////////////////////////
    //////////////////////////////////////////////////////////////









 

//     <!------ STORE HEADER ------>
//  ${headlineEyebrow}
//  <!------ HEADLINE ------>
// ${headlineHeroSingle}
//                                 ${headlineText}
//  <!------ HEADLINE ------>
//  <!------ STORE HEADER ------>  
/* <section class="store-intro>
<!--- TITLE --->    
${generateTitleHTML}
${bestHTML}
<!--- TITLE --->  
<!--- OVERVIEW --->    
Overview
${snippetOverview}
<!--- OVERVIEW --->
<!--- LIST --->  
 ${summaryTextHTML}
<!--- LIST --->  
</section>
<!------ EXPERIENCE ------>
<section class="store-facility"> 
 <!------ HEADLINE ------>
 Experience
<!------ SUMMARY LIST ------>
 Space
${summaryTextHTML}
 <!------ SUMMARY LIST ------>
 ${carouselArea}
 ${summaryDetailsHTML}
<!------ HEADLINE ------>
<!------ OVERVIEW ------>
Facility Overview
${store.snippet.facility}
<!------ OVERVIEW ------>

<!------ SPACE ------>
 The Inside
 The seating arrangement of the facility i
<!------ SPACE ------>
 <!------ LIST ------>
${summaryFacilityHTML}
<!------ LIST ------>
 <!------ EXPERIENCE ------>
<!------ SERVICE ------>
 <section class="store-service"> 
Services
${carouselServices}
<!------ HEADLINE ------>
<!------ OVERVIEW ------>
Services
${store.snippet.service}
<!------ OVERVIEW ------>
<!------ LIST ------>
Space
 ${summaryServiceHTML}
 <!------ LIST ------>
 <!------ SERVICE ------>
<!------ LOCATION ------>
<section class="store-location"> 
<!------ HEADLINE ------>
 LOCATION
<!------ MAP ------>
 <div class="map nearbyMap" id="map">
                            <div id="map-container" class="nearbyMap-container"></div>
                        </div>
${nearbyGalleryHTML}
<!------ MAP ------>
 ${summaryDetailsHTML}
 <!------ HEADLINE ------>
 <!------ OVERVIEW ------>
Facility Overview
${store.snippet.service}
<!------ OVERVIEW ------>
<!------ LIST ------>
${summaryServiceHTML}
 <!------ LIST ------>
<!------ LOCATION ------></section> }*/
















    //////////////////////////////////////////////////////////////
    ////////////////////////// OVERVIEW //////////////////////////
    //////////////////////////////////////////////////////////////
    // const experienceSections = experience.experienceSection.render(store);

    const recommendFacilityTextTemp = `
    <div class="item">
        <a class="coffee-bar">Coffee Bar</a>
        <span class="div">,</span>
    </div>
    <div class="item">
        <a class="main-room">Main Room</a>
        <span class="div">,</span>
    </div>
    <div class="item">
        <a class="back-corner-room">Back Corner Room</a>
        <span class="div">,</span>
    </div>
    <div class="item">
        <a class="outdoor-patio">Outdoor Patio</a>
        <span class="div">,</span>
    </div>
    <div class="item">
        <a class="bathroom">Bathroom</a>
    </div>`;

    const recommendFacilityPictogramTemp = `
                    <div class="pictogram">
                        <i class="pictogram-facility-indoor-30"></i>
                    </div>
                    <div class="pictogram">
                      <i class="pictogram-facility-outdoor-30"></i>
                  </div>
                  `

    let storeIntro = {
      recommendFacilityText: recommendFacilityTextTemp,
      recommendFacilityPictogram: recommendFacilityPictogramTemp,
      recommendValue: "90%",
      snippetOverview: store.summaryDetails,
      title: store.summaryText,
      neustar: neustar,
      buttonFloating: "labelButton",
      headlineText: store?.headline?.text || "Default Headline", // Provide a default value
      locationRegion: store?.location?.region || "Default Region", // Provide a default value
      attributesArrays: attributesArray,
      // storeLocation: store.location,
      // userLocation: coordinateUser,
      storeType: store.category.categoryType,
      storeCategory: store.location.type,
    };
    // const overviewSection = section.section.render(store);
    //////////////////////////////////////////////////////////////
    ////////////////////////// OVERVIEW //////////////////////////
    //////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////
    /////////////////////////// SECTION ///////////////////////////
    ///////////////////////////////////////////////////////////////
    
    

    ///////////////////////////////////////////////////////////////
    /////////////////////////// SERVICE ///////////////////////////
    ///////////////////////////////////////////////////////////////
  
    let storeServices = {
      recommendFacilityText: recommendFacilityTextTemp,
      recommendFacilityPictogram: recommendFacilityPictogramTemp,
      recommendValue: "90%",
      snippetOverview: store.summaryDetails,
      title: store.summaryText,
      neustar: neustar,
      buttonFloating: "labelButton",
      headlineText: store?.headline?.text || "Default Headline", // Provide a default value
      locationRegion: store?.location?.region || "Default Region", // Provide a default value
      attributesArrays: attributesArray,
      attributeService: store.summary.service && store.summary.service.length ? store.summary.service : [],
      snippetService: store.snippet.service || [], 
      // store.snippet.service,
      mediaTopThree: store.media.service && Array.isArray(store.media.service) && store.media.service.length ? store.media.service : [],
      mediaGallery: store.media.gallery && Array.isArray(store.media.gallery) && store.media.gallery.length ? store.media.gallery : [],
      // storeLocation: store.location,
      // userLocation: coordinateUser,
      storeType: store.category.categoryType,
      storeCategory: store.location.type,
    };
// console.log("storeServices", storeServices);
    const sectionServiceHTML = service.services.render(storeServices);
    ///////////////////////////////////////////////////////////////
    /////////////////////////// SERVICE ///////////////////////////
    ///////////////////////////////////////////////////////////////



    const nearbyStore = store.nearbyStore || [];
    const nearbyHeadline = nearbyStore.headline;
    const nearbyHours = nearbyStore.hours;
    const nearbyLocation = nearbyStore.nearbyLocation;
    const nearbyStores = store.nearbyStore || [];
    const nearbyLogoData = nearbyStores.nearbyLogo && Array.isArray(nearbyStores.nearbyLogo) && nearbyStores.nearbyLogo.length ? nearbyStores.nearbyLogo : [];
    const nearbyGalleryHTML = generateLogoCarouselHTML(nearbyLogoData);
    // console.log("nearby", nearbyStore, nearbyHeadline, nearbyHours, nearbyLocation, nearbyStores, nearbyLogoData, nearbyGalleryHTML);
    function generateLogoCarouselHTML(nearbyLogo) {
      let nearbyLogoHTML = '';
      nearbyLogo.slice(0, 3).forEach(nearbyLogoItem => {
          nearbyLogoHTML += `
                  <img src="${nearbyLogoItem}" class="galleryItem" alt="" />
        `;
      });
      // console.log("mediaGallery",nearbyLogo);
      return nearbyLogoHTML;
  }   // Generate the HTML for the carousel
  
        
    

    ////////////////////////////////////////////////////////////////
    /////////////////////////// FACILITY ///////////////////////////
    ////////////////////////////////////////////////////////////////

    let storeFacility = {
      recommendFacilityText: recommendFacilityTextTemp,
      recommendFacilityPictogram: recommendFacilityPictogramTemp,
      recommendValue: "90%",
      snippetOverview: store.summaryDetails,
      title: store.summaryText,
      neustar: neustar,
      buttonFloating: "labelButton",
      headlineText: store?.headline?.text || "Default Headline", // Provide a default value
      locationRegion: store?.location?.region || "Default Region", // Provide a default value
      attributesArrays: attributesArray,
      


      headlineText: store?.headline?.text || "Default Headline", // Provide a default value
      locationRegion: store?.location?.region || "Default Region", // Provide a default value
      storeRegion: store.region,
      currentDistance: MapDistance.calculateDistance(userLocation,storeLocation),
      storeRange: getStoreRange(calculateDistance),
      storeTypes: store.category.genre,
      storeType: store.category.categoryType,
      storeCategory: store.location.type,

      nearbyStore: store.nearbyStore || [],
      nearbyHeadlines: store.nearbyStore.nearbyHeadline || [],
      nearbyHeadline: store.nearbyStoresCollection.items.nearbyHeadline && Array.isArray(store.nearbyStoresCollection.items.nearbyHeadline) && store.nearbyStoresCollection.items.nearbyHeadline.length ? store.nearbyStoresCollection.items.nearbyHeadline : [],
      // nearbyHeadlinesss:  store.nearbyStore?.items.headline || [],

       // ATTRIBUTES
      attributesFacility: store.summary.facility && store.summary.facility.length ? store.summary.facility : [],
      mediaArea: store.media.area && Array.isArray(store.media.area) && store.media.area.length ? store.media.area : [],
      snippetFacility:store.snippet.facility || [],
      popularTimes: store.popularTimes || [],


      // storeLocation: store.location,
      // userLocation: coordinateUser,
      storeType: store.category.categoryType,
      storeCategory: store.location.type,
    };

    const sectionFacilityHTML = facility.facilities.render(storeFacility);
    ////////////////////////////////////////////////////////////////
    /////////////////////////// FACILITY ///////////////////////////
    ////////////////////////////////////////////////////////////////





    /////////////////////////////////////////////////////////////////////
    /////////////////////////// POPULAR TIMES ///////////////////////////
    /////////////////////////////////////////////////////////////////////
    const popularTimesHTML = await storePopularTimes(popularTimesData);
    // console.log("popularTimesHTML", popularTimesHTML);  
    // console.log("popularTimesData", popularTimesData);  
    /////////////////////////////////////////////////////////////////////
    /////////////////////////// POPULAR TIMES ///////////////////////////
    /////////////////////////////////////////////////////////////////////





    ///////////////////////////////////////////////////////////////
    /////////////////////////// DETAILS ///////////////////////////
    ///////////////////////////////////////////////////////////////
    let storeDetails = {
      storeGenre: store.category.genre,
      storeType: store.category.categoryType,
      storeContact: store.contact,
      storeAddress: store?.location.address || [],
      storeLocatedIn: store.location.locatedIn,
      storeRegion: store?.location?.region || "Default Region", // Provide a default value
      currentDistance: MapDistance.calculateDistance(userLocation,storeLocation),
      storeRange: getStoreRange(calculateDistance),
      storeName: store?.headline?.text || "Default Headline", // Provide a default value
      storeHours: store?.hours,
      storeRatings: store.ratings[0].key || [],
      storeRatingGoogle: store.googleRatings,
      storeRatingYelp: store.yelpRatings,
      storeHandle: store.handles,
      storeReviews: store.ratings[0].value || [], 
      storeLogo: store.media.logo
    };

    console.log("storeDetails", storeDetails);
    
    const detailsPanel = panel.panel.render(storeDetails);

    ///////////////////////////////////////////////////////////////
    /////////////////////////// DETAILS ///////////////////////////
    ///////////////////////////////////////////////////////////////

    // Hero (feature)

    // Overview(section)

    // Experience (section)

    // Service (section)

    // Facility (section)

    // Location (section / map)

    // Review (social)

    return `
          
          <div class="article-container">

            <div class="body">
            
              <div class="top content">
              
                <div class= "store hero">
                  ${eyebrowHeroHTML}
                  ${heroMediaHTML}
                </div>


                
                <div id="chartsContainer">
                </div>


                <container class="ngrid store store-details main-container" id="ngrid platinum">

                  <div class="store primary">
                    <!-- <div class= "store-overview overview"> -->
                      ${overviewSection}
                    <!-- </div> -->
                    
                    <!-- <div class= "store-experience experience"> -->
                      ${experienceSection}
                    <!-- </div> -->
                    
                    <!-- <div class= "store-service service"> -->
                      ${sectionServiceHTML}
                    <!-- </div> -->
                    
                    <!-- <div class= "store-facility facility sticky-stopper"> -->
                      ${sectionFacilityHTML}
                    <!-- </div> -->
                  </div>

                  <div class="store secondary sticky">
                    <div class="panel details panel-details">
                      ${ detailsPanel }
                    </div>
                  </div>

                </container>

              </div>
            </div>
            <a href="#" class="btn btn-primary" role="button" data-bs-toggle="button">Toggle link</a>
            <a href="#" class="btn btn-primary active" role="button" data-bs-toggle="button" aria-pressed="true">Active toggle link</a>
            <a class="btn btn-primary disabled" aria-disabled="true" role="button" data-bs-toggle="button">Disabled toggle link</a>
              
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Laborum labore recusandae ratione dolorum deserunt maiores,
                  magni magnam ab vitae provident expedita eius alias quisquam
                  tempora temporibus, molestiae consequatur esse id.
                </p>
                <div class="content-img">
                  <img src="./images/profile.jpg" alt="" />
                </div>  
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Laborum labore recusandae ratione dolorum deserunt maiores,
                  magni magnam ab vitae provident expedita eius alias quisquam
                  tempora temporibus, molestiae consequatur esse id.
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Laborum labore recusandae ratione dolorum deserunt maiores,
                  magni magnam ab vitae provident expedita eius alias quisquam
                  tempora temporibus, molestiae consequatur esse id.
                </p>
              </div>
            </div>
            <div class="side-ad">
              <a href="#" class="vertical-ad">
                <img src="/images/side-ad.svg"/>
              </a>
            </div>
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
                // console.log("storeLocation",storeLocation);
                // // console.log("store.location.geolocation",[store.location.geolocation.lat,store.location.geolocation.lon]);
                // // console.log("popularTime",popularTime);
                // // console.log("popularTimes",popularTimes);
                
                // Ensure storePopularTimes is called after the DOM is fully loaded
                if (document.getElementById('chartsContainer')) {
                    const popularTimesData = [popularTimes]; // Replace with actual data
                    // console.log("popularTimesData",popularTimesData);
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

                const modal = modals.init();
                
                if (document.getElementById('myBtn')) {
                    document.addEventListener('DOMContentLoaded', () => {
                      modals.init();
                      // console.log("modals.init()", modals.init());
                      // console.log("modals", modals);
                    });
                } else {
                    console.error('myBtn element not found');
                }
        
                
                // Add a marker for the store location
                // new mapboxgl.Marker()
                //     .setLngLat([storeLocation.lon, storeLocation.lat])
                //     .addTo(map);
                // const bounds = new mapboxgl.LngLatBounds();
                // bounds.extend(new mapboxgl.LngLat([storeLocation.lon, storeLocation.lat]));
                // // console.log()
                

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
  export default AboutScreen;
  
    
// function setCurrentLocation(map, features) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const userCoordinates = [position.coords.longitude, position.coords.latitude];
//       const userLocationMarker = createUserLocationMarker(userCoordinates, map);
//     });
//   }
// }

function getStoreRange(currentRange) {
  if (currentRange >= 0 && currentRange <= 1) {
    return "Closeby";
  } else if (currentRange > 1 && currentRange <= 3) {
    return "Nearby";
  } else if (currentRange > 3 && currentRange <= 6) {
    return "Quick Drive";
  } else if (currentRange > 6 && currentRange <= 12) {
    return "Driving Distance";
  } else if (currentRange > 12 && currentRange <= 21) {
    return "~2hr Drive";
  } else if (currentValue > 12 && currentValue <= 21) {
    return "1hr+ Drive";
  } else {
    return "PACKED";
  }
}


function generateMediaCarouselHTML(mediaGallery, limit) {
  let mediaGalleryHTML = '';
  const summaryText = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
  // console.log("SUMMARYDETAILS", summaryText);
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

// // src/screens/StoreScreens.js
// import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
// import { parseRequestUrl } from "../utils.js";
// import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost, getStore } from "../api.js";
// import DataBlog from "../components/DataPost";
// import { BLOCKS, INLINES } from "@contentful/rich-text-types";
// import { format, parseISO } from "date-fns";
// // import mapNearby from "..components/mapNearby.js";
// import mapboxgl from "mapbox-gl";
// import { initMap } from "../components/MapApi";
// import { storePopularTimes } from "../components/StorePopularTimes";

// const renderOptions = {
//     renderNode: {
//       [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
//         // Adjust the code as per your actual data structure and needs
//       },
//       [INLINES.HYPERLINK]: (node, next) => {
//         // Adjust the code as per your actual data structure and needs
//       },
//       [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
//         // Adjust the code as per your actual data structure and needs
//       },
//     },
//   };

//   function getStoreCurrentStatusHTML(popularTimes) {
//     return popularTimes.map(() => {
//       const container = document.createElement('div');
//       container.className = 'chart-container';
//       container.id = 'chartContainer';
//       return container;
//     });
//   }

// function generateStorePopularTimeHTML(popularTimes) {
//     // Assuming this function generates an array of div elements
//     let htmlString = '';
//     popularTimes.forEach(element => {
//         htmlString += element.outerHTML;
//     });
//     return htmlString;
// }

//   let store = '';
//   let dataBlog = new DataBlog();
//   const AboutScreen = {
//     render: async () => {
//         const request = parseRequestUrl();
//         console.log("Request slug:", request.slug);
//         console.log("store:", store);
//         // const storeData = await dataBlog.getData();
//         const storeData = await dataBlog.getData();
//         store = storeData.find(store => store.slug === request.slug);
//         console.log("storeData", storeData);
//         const validStores = storeData.filter(store => store.slug);
//         console.log("Valid stores:", validStores);
//         // store = validStores.find(store => store.slug === request.slug);
//         console.log("store", store);

//         // SNIPPET
//         // const snippetOverview = store.snippet.overview || [];
//       // const storeContent = createStoreCard.render(snippetOverview);
//       return `
//       <div class="blog-detail">
//         <div class="side-ad">
//           <a href="#" class="vertical-ad">
//           <img src="/images/side-ad.svg"/>
//           </a>
//         </div>
//         <div class="article-container">
//         <div class="content">
//         <div class="top">
//         <h1>About Me</h1>
//         </div>
//         <p>
//         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//         Laborum labore recusandae ratione dolorum deserunt maiores,
//         magni magnam ab vitae provident expedita eius alias quisquam
//         tempora temporibus, molestiae consequatur esse id.
//         </p>
//         <div class="content-img">
//         <img src="./images/profile.jpg" alt="" />
//         </div>
//         <p>
//         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//         Laborum labore recusandae ratione dolorum deserunt maiores,
//         magni magnam ab vitae provident expedita eius alias quisquam
//         tempora temporibus, molestiae consequatur esse id.
//         </p>
//         <p>
//         Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//         Laborum labore recusandae ratione dolorum deserunt maiores,
//         magni magnam ab vitae provident expedita eius alias quisquam
//         tempora temporibus, molestiae consequatur esse id.
//         </p>
//         </div>
//         </div>
//         <div class="side-ad">
//           <a href="#" class="vertical-ad">
//           <img src="/images/side-ad.svg"/>
//           </a>
//         </div>
//         </div>        `;
//       },
//       after_render: async () => {
//           window.scrollTo({
//           top: 0,
//           left: 0,
//           behavior: "smooth",
//           });

//           if (!store || !store.someProperty) {
//               // Handle error or missing data
//               const popularTime = store.popularTimes || [];
//               const popularTimes = store.popularTimes || [];
//               // const storeLocation = [store.location.geolocation.lat,store.location.geolocation.lon];
//               // const storeLocation = store.location.geolocation || [];
//               const storeLocation = store.location && store.location.geolocation ?
//                     { lat: store.location.geolocation.lat, lon: store.location.geolocation.lon } :
//                     { lat: 0, lon: 0 }; // Default values if location is not defined
//               // Initialize the map object
//               console.log("storeLocation",storeLocation);
//               // console.log("store.location.geolocation",[store.location.geolocation.lat,store.location.geolocation.lon]);
//               // console.log("popularTime",popularTime);
//               // console.log("popularTimes",popularTimes);

//               // Ensure storePopularTimes is called after the DOM is fully loaded
//               if (document.getElementById('chartsContainer')) {
//                   const popularTimesData = [popularTimes]; // Replace with actual data
//                   console.log("popularTimesData",popularTimesData);
//                   storePopularTimes(popularTimesData);
//               } else {
//                   console.error('chartsContainer element not found');
//               }

//               const map = initMap({
//                   container: 'map-container',
//                   style: 'mapbox://styles/mapbox/streets-v11', // your map style here
//                   center: storeLocation, // Center the map on the store's location
//                   zoom: 13, // Adjust zoom as needed
//                   attributionControl: false,
//               });

//               // Add a marker for the store location
//               // new mapboxgl.Marker()
//               //     .setLngLat([storeLocation.lon, storeLocation.lat])
//               //     .addTo(map);
//               // const bounds = new mapboxgl.LngLatBounds();
//               // bounds.extend(new mapboxgl.LngLat([storeLocation.lon, storeLocation.lat]));
//               // console.log()

//               new mapboxgl.Marker()
//                   .setLngLat([storeLocation.lon, storeLocation.lat])
//                   .addTo(map);
//               const bounds = new mapboxgl.LngLatBounds();
//               bounds.extend(new mapboxgl.LngLat(storeLocation.lon, storeLocation.lat));
//               map.fitBounds(bounds, { padding: 50, duration: 1000 });

//               // const bounds = new mapboxgl.LngLatBounds();
//               // bounds.extend([storeLocation.lon, storeLocation.lat]);
//               // map.fitBounds(bounds, { padding: 50, duration: 1000 });

//           }

//       },
//   };
// export default AboutSce;

// function getStoreStatus(currentValue) {
//   if (currentValue >= 0 && currentValue <= 5) {
//       return "NOT BUSY";
//   } else if (currentValue > 5 && currentValue <= 10) {
//       return "MODERATELY BUSY";
//   } else if (currentValue > 10 && currentValue <= 12) {
//       return "BUSY";
//   } else {
//       return "PACKED";
//   }
// }

// function generateCarouselItem(content) {
//   const carouselItem = document.createElement('div');
//   carouselItem.className = 'card-postCarousel-item listingAStore';
//   carouselItem.innerHTML = content;
//   return carouselItem;
// }

// function generateMediaGalleryHTML(mediaGallery) {
//   let mediaGalleryHTML = '';
//   mediaGallery.slice(0, 3).forEach(mediaGalleryItem => {
//     mediaGalleryHTML += `
//               <img src="${mediaGalleryItem.url}" class="galleryItem ratio1x1" alt="" />
//     `;
//   });
//   return mediaGalleryHTML;
// }

// function generateMediaCarouselHTML(mediaGallery, limit) {
//   let mediaGalleryHTML = '';
//   const summaryText = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
//   console.log("SUMMARYDETAILS", summaryText);
//   mediaGallery.slice(0, limit).forEach(mediaGalleryItem => {
//     mediaGalleryHTML += `
//           <div class="gallery-item">
//               <img src="${mediaGalleryItem.url}" class="gallery-item-img" alt="" />
//               <div class="gallery-item-details">
//                   <span class="text02">
//                       ${mediaGalleryItem.description}
//                   </span>
//               </div>
//           </div>

//     `;
//   });
//   return mediaGalleryHTML;
// }

// function generateSectionHTML(header, features, overview, summary) {
//   let mediaGalleryHTML = '';
//   const summaryText = store.summary && store.summary.text && store.summary.text.length ? store.summary.text : [];
//   console.log("SUMMARYDETAILS", summaryText);
//   mediaGallery.slice(0, limit).forEach(mediaGalleryItem => {
//     mediaGalleryHTML += `
//           <div class="gallery-item">
//               <img src="${mediaGalleryItem.url}" class="gallery-item-img" alt="" />
//               <div class="gallery-item-details">
//                   <span class="text02">
//                       ${mediaGalleryItem.description}
//                   </span>
//               </div>
//           </div>

//     `;
//   });
//   return mediaGalleryHTML;
// }

// function generateLogoCarouselHTML(nearbyLogo) {
//   let nearbyLogoHTML = '';
//   nearbyLogo.slice(0, 3).forEach(nearbyLogoItem => {
//       nearbyLogoHTML += `
//               <img src="${nearbyLogoItem}" class="galleryItem" alt="" />
//     `;
//   });
//   console.log("mediaGallery",nearbyLogo);
//   return nearbyLogoHTML;
// }   // Generate the HTML for the carousel

// const AboutScreen = {
//   render: () => {
//     return `<div class="blog-detail">
//             <div class="side-ad">
//               <a href="#" class="vertical-ad">
//               <img src="/images/side-ad.svg"/>
//               </a>
//             </div>
//             <div class="article-container">
//             <div class="content">
//             <div class="top">
//             <h1>About Me</h1>
//             </div>
//             <p>
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//             Laborum labore recusandae ratione dolorum deserunt maiores,
//             magni magnam ab vitae provident expedita eius alias quisquam
//             tempora temporibus, molestiae consequatur esse id.
//             </p>
//             <div class="content-img">
//             <img src="./images/profile.jpg" alt="" />
//             </div>
//             <p>
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//             Laborum labore recusandae ratione dolorum deserunt maiores,
//             magni magnam ab vitae provident expedita eius alias quisquam
//             tempora temporibus, molestiae consequatur esse id.
//             </p>
//             <p>
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit.
//             Laborum labore recusandae ratione dolorum deserunt maiores,
//             magni magnam ab vitae provident expedita eius alias quisquam
//             tempora temporibus, molestiae consequatur esse id.
//             </p>
//             </div>
//             </div>
//             <div class="side-ad">
//               <a href="#" class="vertical-ad">
//               <img src="/images/side-ad.svg"/>
//               </a>
//             </div>
//             </div>`;
//   },
// };

// export default AboutScreen;
