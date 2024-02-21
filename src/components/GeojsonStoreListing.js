// src/components/GeojsonStoreListing.js
import createStoreCard from "./card-store.js";
import * as Geolocate from "./Geolocate.js";
import { calculateDistance } from "./MapDistance.js"; // Adjust the path as necessary

function getStoreCurrentStatusHTML(popularTimes) {
  return popularTimes.map(() => {
    const container = document.createElement("div");
    container.className = "chart-container";
    return container;
  });
}


export async function createGeojsonStoreListing(store, map, userCoordinates) {
  try {
   


    if (!store.properties) {
      return null; // Return null if there are no properties
    }
    const {
      lat,
      lon,
      popularTimes,
      best: originalBest,
      neustar,
      headline,
      title,
      seriesName,
      region,
      address,
      tag: originalTag,
      slug,
      variant,
      thumbnail,
      gallery: originalGallery,
      nearbyStore,
      logo,
      area,
      service,
      storeType,
      environment,
      noiseLevel,
      parking,
      categoryType,
      genre,
      text,
      subtext,
      eyebrow,
      location,
      hours,
      summary,
      publishedAt,
    } = store.properties;

    const popularTime = popularTimes || [];
    // // // console.log(popularTime);
    const limitedBest03 =
      originalBest && originalBest.length ? originalBest.slice(0, 3) : [];
    const limitedTags03 =
      originalTag && originalTag.length ? originalTag[0].tags.slice(0, 3) : [];
    const galleryData =
      originalGallery &&
      Array.isArray(originalGallery) &&
      originalGallery.length
        ? originalGallery
        : [];
    const galleryHTML = generateGalleryHTML(galleryData);
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();

    let storeStatus = "";
    if (
      popularTime &&
      popularTime[currentDay] &&
      popularTime[currentDay][currentHour + 1]
    ) {
      const currentValue = parseInt(popularTime[currentDay][currentHour + 1]);
      storeStatus = getStoreStatus(currentValue);
    }

    let bestHTML = "";
    limitedBest03.forEach((best) => {
      bestHTML += `
    <div class="metadata-tag">
      <span class="metadata-tag-text text01 bold">${best}</span>
    </div>`;
    });

    // const storeCurrentStatusHTML = getStoreCurrentStatusHTML(popularTime);
    // const storeCurrentStatusHTMLs = storeCurrentStatusHTML;

    // storeCurrentStatusHTML.forEach((chartsContainer, idx) => {
    //   // Check if there is data for the current index
    //   if (
    //     !popularTime[idx] ||
    //     !Array.isArray(popularTime[idx]) ||
    //     popularTime[idx].length < 2
    //   )
    //     return;

    //   for (
    //     let dayIndex = 1;
    //     dayIndex < popularTime[idx][0].length;
    //     dayIndex++
    //   ) {
    //     // Logging for debugging
    //     // // // console.log("Index:", idx, "Data:", popularTime[idx]);

    //     // Additional safety checks to ensure we're not accessing data that doesn't exist
    //     if (
    //       !popularTime[idx][currentHour + 1] ||
    //       typeof popularTime[idx][currentHour + 1][dayIndex] === "undefined"
    //     ) {
    //       continue;
    //     }

    //     const currentValue = parseInt(
    //       popularTime[idx][currentHour + 1][dayIndex]
    //     );

    //     const dayContainer = document.createElement("div");
    //     dayContainer.classList.add("chart");

    //     const header = document.createElement("div");
    //     header.classList.add("day-title");

    //     dayContainer.appendChild(header);

    //     if (dayIndex === currentDay + 1) {
    //       const currentStatus = document.createElement("div");
    //       currentStatus.classList.add("status");

    //       if (currentValue >= 0 && currentValue <= 5) {
    //         currentStatus.textContent = "NOT BUSY";
    //         currentStatus.classList.add("not-busy");
    //       } else if (currentValue > 5 && currentValue <= 10) {
    //         currentStatus.textContent = "MODERATELY BUSY";
    //         currentStatus.classList.add("moderately-busy");
    //       } else if (currentValue > 10 && currentValue <= 12) {
    //         currentStatus.textContent = "BUSY";
    //         currentStatus.classList.add("busy");
    //       } else {
    //         currentStatus.textContent = "PACKED";
    //         currentStatus.classList.add("packed");
    //       }

    //       dayContainer.appendChild(currentStatus);
    //     }
    //     chartsContainer.appendChild(dayContainer);
    //   }
    // });

    // Function to generate the Neustar icons
    const generateNeustarIcons = (neustar) => {
      let iconsHTML = "";
      for (let i = 1; i <= 3; i++) {
        if (i <= neustar) {
          iconsHTML += '<i class="icon-neustar-active12"></i>';
        } else {
          iconsHTML += '<i class="icon-neustar-inactive12"></i>';
        }
      }
      return iconsHTML;
    };

    const listing = document.createElement("a");
    listing.className = " " + "card-postListing-item";
    listing.href = "/" + variant + "/" + slug;
    listing.rel = "noopener noreferrer nofollow";
    listing.target = categoryType + "-${store.sys.id}";
    listing.onclick = function () {
      mapRoute(userCoordinates, store.geometry.coordinates);
    };
    const carousel = document.createElement("a");
    carousel.className = "card-postCarousel-item";
    carousel.href = "/" + variant + "/" + slug;
    carousel.rel = "noopener noreferrer nofollow";
    carousel.target = categoryType + "-${store.sys.id}";
    carousel.onclick = function () {
      mapRoute(userCoordinates, store.geometry.coordinates);
    };
    const cardContainer = document.createElement("div");
    cardContainer.className = "storeCard-container";

    const neustarHTML = `${store.properties.neustar} ${generateNeustarIcons(
      store.properties.neustar
    )}`;

    function generateStoreStatus() {
      const currentHour = new Date().getHours();
      const currentDay = new Date().getDay();
      let statusHTML = "";

      if (currentDay < popularTimes[0].length - 1) {
        const currentValue = parseInt(
          popularTimes[currentHour + 1][currentDay + 1]
        );
        if (currentValue >= 0 && currentValue <= 5) {
          statusHTML = '<div class="status not-busy">NOT BUSY</div>';
        } else if (currentValue > 5 && currentValue <= 10) {
          statusHTML =
            '<div class="status moderately-busy">MODERATELY BUSY</div>';
        } else if (currentValue > 10 && currentValue <= 12) {
          statusHTML = '<div class="status busy">BUSY</div>';
        } else {
          statusHTML = '<div class="status packed">PACKED</div>';
        }
      }

      return statusHTML;
    }
    
  // const getStoreDistance = await getStoreDistances(store);
  // console.log('THIS WORKS!!!', getStoreDistance);
  // // }).catch(error => {
  // //     console.error("Failed to get store distance: ", error);
  // // });
  // getStoreDistances(store).then(storeDistance => {
  //   const storeContentData = `<div>${storeDistance}mi</div>`; // replace with your actual HTML
  //   const storeCarouselItem = generateCarouselItem(storeContentData);
  //   cardContainer.appendChild(storeCarouselItem);
  // }).catch(error => {
  //   console.error("Failed to get store distance: ", error);
  // });


    if (variant === "stores") {
      carousel.className += " " + "listingStore-item";

      const data = popularTime;

      // DISTANCE

      // Then include the resolved distance value directly
      const storeContentData = {
        thumbnail: thumbnail,
        logo: logo,
        title: title,
        galleryHTML: galleryHTML,
        headline: headline,
        publishedAt: publishedAt,
        storeType: storeType,
        environment: environment,
        noiseLevel: noiseLevel,
        parking: parking,
        title: text,
        neustar: neustar,
        neustarHTML: neustarHTML,
        // storeDistanceHTML: getStoreDistance,
        categoryType: categoryType,
        storeCurrentStatusHTML: storeCurrentStatusHTML
          .map((container) => container.outerHTML)
          .join(""),
        region: region,
        storeCurrentStatus: storeStatus,
        bestHTML: bestHTML,
        genre: genre,
        best: originalBest,
        nearby: nearbyStore,
        storeCurrentStatus: storeStatus,
      };

    

      // console.log('THIS DOES NOT WORK', getStoreDistance);

      const chartsContainer = document.getElementById("chartsContainer");
      const storeStatus = generateStoreStatus();

      // const storeContentData = {
      //   thumbnail: thumbnail,
      //   logo: logo,
      //   title: title,
      //   galleryHTML: galleryHTML,
      //   headline: headline,
      //   publishedAt: publishedAt,
      //   storeType: storeType,
      //   environment: environment,
      //   noiseLevel: noiseLevel,
      //   parking: parking,
      //   title: text,
      //   neustar: neustar,
      //   neustarHTML: neustarHTML,
      //   storeDistanceHTML: `${getStoreDistance}mi`,
      //   categoryType: categoryType,
      //   storeCurrentStatusHTML: storeCurrentStatusHTML
      //     .map((container) => container.outerHTML)
      //     .join(""),
      //   region: region,
      //   storeCurrentStatus: storeStatus,
      //   bestHTML: bestHTML,
      //   genre: genre,
      //   best: originalBest,
      //   nearby: nearbyStore,
      //   storeCurrentStatus: storeStatus,
      // };
      // // console.log("storeStatus", storeStatus);

      // const storeContent = createStoreCard.render(storeContentData);
      // const storeCarouselItem = generateCarouselItem(storeContent);
      // cardContainer.appendChild(storeCarouselItem);
      // carousel.appendChild(cardContainer);
      const carouselItem = generateCarouselItem(contentHTML);
      document.querySelector('#carouselContainer').appendChild(carouselItem);
    }
  } catch (error) {
      console.error("Failed to get store distance: ", error);
  }
}

// function getStoreStatus(currentValue) {
//   if (currentValue >= 0 && currentValue <= 5) {
//     return "NOT BUSY";
//   } else if (currentValue > 5 && currentValue <= 10) {
//     return "MODERATELY BUSY";
//   } else if (currentValue > 10 && currentValue <= 12) {
//     return "BUSY";
//   } else {
//     return "PACKED";
//   }
// }

// function generateCarouselItem(content) {
//   const carouselItem = document.createElement("div");
//   carouselItem.className = "card-postCarousel-item listingAStore";
//   carouselItem.innerHTML = content;
//   return carouselItem;
// }

// function generateGalleryHTML(gallery) {
//   let galleryHTML = "";
//   gallery.slice(0, 3).forEach((galleryItem) => {
//     galleryHTML += `
//                 <img src="${galleryItem.url}" class="galleryItem ratio1x1" alt="" />
//       `;
//   });
//   return galleryHTML;
// }

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
  const carouselItem = document.createElement("div");
  carouselItem.className = "card-postCarousel-item listingAStore";
  carouselItem.innerHTML = content;
  return carouselItem;
}

function generateGalleryHTML(gallery) {
  let galleryHTML = "";
  gallery.slice(0, 3).forEach((galleryItem) => {
    galleryHTML += `
      <img src="${galleryItem.url}" class="galleryItem ratio1x1" alt="" />
      `;
  });
  return galleryHTML;
}

function getStoreDistances(store) {
  return new Promise((resolve, reject) => {
    Geolocate.coordinateUser().then(userCoordinates => {
      const storeCoordinates = Geolocate.coordinateStore(store);
      const storeDistanceValue = Geolocate.GeolocateToStore(store);
      const getUserCoordinates = [userCoordinates[0], userCoordinates[1]]
      const getStoreCoordinates = [storeCoordinates[0], storeCoordinates[1]]
      console.log('!!!!!userCoordinates', userCoordinates);
      const getStoreDistance = calculateDistance(getUserCoordinates, getStoreCoordinates);
      console.log('!!!!!getStoreDistance', getStoreDistance);
  
      // Use storeDistanceValue here
      // ...
  }).catch(error => {
      console.error("Failed to get user coordinates: ", error);
  });
  });
}