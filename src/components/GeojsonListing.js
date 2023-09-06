// src/components/GeojsonListing.js
export function createGeojsonListing(store, map, userCoordinates) {
  if (!store.properties) {
    return '';
  }
  
 
  const { 
    lat, best, neustar, lon, series, region, address, tag, slug, variant, 
    thumbnail, gallery: originalGallery, logo, area, recommendations, 
    categoryType, genre, text, subtext, eyebrow, location, summary, 
  } = store.properties;

  console.log(store.properties)

  const tags = tag && tag.length ? tag[0].tags : [];
  // const bests = best && best.length ? best[0].bests : [];
  // const bests = best && best.length ? best[0].bests : [];
  const bests = best || [];
  const title = text || [];
  const subtitle = subtext || [];
  const eyebrows = eyebrow || [];
  const locations = location || [];
  const limitedBest03 = tags.slice(0, 3);
  const limitedTags03 = bests.slice(0, 3);


  
  console.log("subtitle", subtitle);
  console.log("title", title);
  console.log("eyebrow", eyebrow);


  const galleryData = originalGallery && Array.isArray(originalGallery) && originalGallery.length ? originalGallery : [];
  // console.log("Gallery Data:", galleryData);

  const galleryHTML = generateGalleryHTML(galleryData);
  // console.log("Generated Gallery HTML:", galleryHTML);


  // console.log("best",best);
  // console.log("bests",bests);
  
  // console.log('Title: ' + title + ', ' + 'Category: ' + category + ', ' + 'Latitude: ' + lat + ', ' + 'Longitude: ' + lon  + ', ' + 'Address: '+ address)
  let tagsHTML = '';

  let bestHTML = '';
  limitedBest03.forEach(best => {
    bestHTML +=  `<span class="metadata-tag-text text01 bold">${best}</span>`;
  });

  limitedTags03.forEach(tag => {
    tagsHTML += `<div class="metadata-tag">
                   <span class="metadata-tag-text text01 bold">${tag}</span>
                 </div>`;
  });



  


  
 
  const listing = document.createElement('a');
  listing.className = ' ' + 'card-postListing-item';
  listing.href = '/#/'+variant+'/'+slug;
  listing.rel = 'noopener noreferrer nofollow';
  listing.target = categoryType + '-${store.sys.id}';
  listing.onclick = function() {
    mapRoute(userCoordinates, store.geometry.coordinates);
  }
  if (variant === 'articles') { ////////////////////ARTICLES////////////////////
    listing.className += ' ' + 'listingArticles' + ' ' + 'card-full-item';
    listing.innerHTML = `
    <div class="c1-c3 card-postListing-item-content">
      <div class="content-title">
        <span class="header05">
          ${title}
        </span>
        <span class="paragraph">
        ${categoryType}
        </span>
        <span class="paragraph">
        ${region}
        </span>
      </div>
  
      <div class="post-data">
        <div class="tag-collection">

          <div class="nav-list-divider">
            <div class="lineV"></div>
          </div>
          <div class="post-data">
            ${bestHTML}
          </div>
        </div>
        <div class="data-time">
          <span class="data-time-text text01">2m Read</span>
        </div>
      </div>
    </div>
    <div class="c3col2-c5col2 ratio1x1 card-articleListing-item-img">
    <img class="item-img" src="${thumbnail}" alt="" />
    <img class="item-img" src="${thumbnail}" alt="" />
    </div>
  `; 
  // Create different innerHTML based on variant
} else if (variant === 'stores') {////////////////////STORES////////////////////
    listing.className += ' ' + 'listingStore' + ' ' + 'card-mid-item';
    listing.innerHTML = `
    <div class="neustar-tag rating-tag">
      <span class="metadata-tag-text neustar-tag-text bold03">${neustar}</span>
      <i class="icon-rating-neustar"></i>
    </div>
    <div class="p1-c2col1 ratioPlatinum card-postListing-item-img">
      <div class="galleryContainer">
        ${galleryHTML}
      </div>
    </div>
  <div class="c1col2-p2 card-postListing-item-content">
    <div class="content-title">
      <span class="bold03">
        ${title}
      </span>
      <span class="text03">
      ${genre} in ${region}
      </span>

    </div>

    <div class="post-data">
      <div class="tag-collection">
        <div class="nav-list-divider">
          <div class="lineV"></div>
        </div>
        <div class="post-data">
          ${tagsHTML}
        </div>
      </div>
      <div class="data-time">
        <span class="data-time-text text01">2m Read</span>
      </div>

      <div class="lineH"></div>
    </div>
  </div>
  `; 
} else if (variant === 'reviews') { ////////////////////REVIEWS////////////////////
    listing.className += ' ' + 'listingReviews' + ' ' + 'card-mid-item';
    listing.innerHTML = `
  <div class="p1-c2col1 ratioPlatinum card-postListing-item-img">
    <img class="item-img" src="${thumbnail}" alt="" />
  </div>

  <div class="c1col2-p2 card-postListing-item-content">
    <div class="content-title">
      <span class="header04">
        ${title}
      </span>
      ${best}
      ${bests}
      ${bestHTML}
      <span class="paragraph">
       ${region}
      </span>
      </div>

      <div class="post-data">
        <div class="tag-collection">
          <div class="nav-list-divider">
            <div class="lineV"></div>
          </div>
          <div class="post-data">
            ${tagsHTML}
          </div>
        </div>
        <div class="data-time">
          <span class="data-time-text text01">2m Read</span>
        </div>

      <div class="lineH"></div>
    </div>
  </div>`; 
  
  } else if (variant === 'blogs') { ////////////////////BLOGS////////////////////
    listing.className += ' ' + 'listingPosts' + ' ' + 'card-mid-item';
    listing.innerHTML = `


  <div class="c1col2-p2 card-postListing-item-content">
    <div class="content-title">
      <span class="header04">
        ${title}
      </span>
      <span class="paragraph03">
      ${subtitle}
      </span>

      <span class="paragraph">
       ${region}
      </span>
      </div>

      <div class="blogs-data">
        <div class="tag-collection">
          <div class="nav-list-divider">
            <div class="lineV"></div>
          </div>
          <div class="post-data">
            ${tagsHTML}
          </div>
        </div>
        <div class="data-time">
          <span class="data-time-text text01">2m Read</span>
        </div>

      <div class="lineH"></div>
    </div>
  </div>`; // You should replace '...' with the HTML for posts variant
  } else {
    // Fallback case if the variant is not recognized
    listing.className += ' ' + 'listingPosts' + ' ' + 'card-mid-item';
    listing.innerHTML = `
    

    <div class="c1col2-p2 card-postListing-item-content">
      <div class="content-title">
        <span class="header04">
          ${title}
        </span>
        <span class="text03">
        ${subtitle}
        </span>
        <span class="paragraph">
        ${region}
        </span>
      </div>

      <div class="post-data">
        <div class="tag-collection">
          <div class="nav-list-divider">
            <div class="lineV"></div>
          </div>
          <div class="post-data">
            ${tagsHTML}
          </div>
        </div>
        <div class="data-time">
          <span class="data-time-text text01">2m Read</span>
        </div>

      <div class="lineH"></div>
    </div>
  </div>`; // You should replace '...' with the fallback HTML
  }
 
  return listing;
 }
 
 function generateGalleryHTML(gallery) {
  let galleryHTML = '';
  gallery.slice(0, 3).forEach(galleryItem => {
    // console.log("Processing gallery item:", galleryItem);
    galleryHTML += `

              <img src="${galleryItem.url}" class="galleryItem ratio1x1" alt="" />
    `;
  });
  return galleryHTML;
}



// export function createGeojsonListing(store, onClick) {
//   // console.log("Creating listing for properties:", store); // Add this line
//  if (!store.properties) {
//    return '';
//  }

//  const { region, tag, slug, variant, thumbnail, category, text,location } = store.properties;
//  const tags = tag && tag.length ? tag[0].tags : [];
//  const title = text || [];
//  const locations = location || [];
//  const coordinate = locations.geolocation;
//  const limitedTags03 = tags.slice(0, 3);


//  let tagsHTML = '';
//  limitedTags03.forEach(tag => {
//    tagsHTML += `<div class="metadata-tag">
//                   <span class="metadata-tag-text text01">${tag}</span>
//                 </div>`;
//  });

//  const listing = document.createElement('a');
//  listing.className = 'card-postListing-item';
//  listing.href = '/#/'+variant+'/'+slug;
// //  listing.addEventListener('click', () => onClick(store));


//  listing.innerHTML = `
//   <div class="p1-c2col1 ratio1x1 card-postListing-item-img">
//     <img class="item-img" src="${thumbnail}" alt="" />
//   </div>

//   <div class="c1col2-p2 card-postListing-item-content">
//     <div class="content-title">
//       <span class="header05">
//         ${title}
//       </span>

//       <span class="paragraph">
//        ${region}
//       </span>
//       </div>

//       <div class="post-data">
//         <div class="tag-collection">
//           <div class="post-data-container">
//             <a href="/#/dine">
//               <div class="metadata-tag-icon" id="${category.category}">
//                 <i class="icon-${category.category}"></i>
//                 <span class="metadata-tag-divider">
//                   <div class="lineV"></div>
//                 </span>
//                 <span class="metadata-tag-text medium00">
//                   ${category.category}
//                 </span>
//               </div>
//             </a>
//           </div>
//           <div class="nav-list-divider">
//             <div class="lineV"></div>
//           </div>
//           <div class="post-data">
//             ${tagsHTML}
//           </div>
//         </div>
//         <div class="data-time">
//           <span class="data-time-text text01">2m Read</span>
//         </div>

//       <div class="lineH"></div>
//     </div>
//   </div>
//  `;
//       // //   add click event listeners to each store listing
//       // const storeElements = listings.querySelectorAll('.store');
//       // storeElements.forEach((store) => {
//       //   store.addEventListener('click', () => {
//       //         const id = store.dataset.id;
//       //         const marker = markers[id];
//       //         map.flyTo({ center: marker.getLngLat(), zoom: 16 });
     
//       //         // highlight selected store and unhighlight others
//       //         storeElements.forEach((el) => el.classList.remove('active'));
//       //         store.classList.add('active');
//       //     });
//       // });
      
//  return listing;
// }


 

// src/components/GeojsonListing.js
// export function createGeojsonListing(store, map) {
//     const listing = document.createElement('div');
//     listing.className = 'listing';
//     listing.textContent = store.properties.address;
 
//     // Add an icon next to the listing suggestion
//     const icon = document.createElement('span');
//     icon.className = 'listing-icon';
//     icon.textContent = '📍';
//     listing.appendChild(icon);
 
//     const address = document.createElement('span');
//     address.textContent = store.properties.address;
//     listing.appendChild(address);
 
//     // Add event listener to the listing
//     listing.addEventListener('click', () => onClick(store));
 
//     return listing;
//   }




// const CreateListing = (stores) => {
//     // const { name, address, phone } = stores.properties;

//     // render: (properties) => {
//     // const stores = properties.featuress.map((stores, i) => {
//     // const { title, text, address } = stores.properties;
//     // return `
//     //     <div class="store" data-id="${i}"> 
//     //         <h3>${title}</h3>
//     //         <p>${text}</p> 
//     //         <p>${address}</p> 
//     //     </div> 
//     //     ;`
//     //     }).join('');
       

//         const listing = document.createElement('div');
//         listings.className = 'listings';
//         listings.innerHTML = stores;

//         const title = document.createElement('h3');
//         title.textContent = properties.title;
//         listing.appendChild(title);

       
   
//         const text = document.createElement('h3');
//         text.textContent = properties.text;
//         listing.appendChild(text);
   
//         const address = document.createElement('p');
//         address.textContent = properties.address;
//         listing.appendChild(address);
       

//         address
// : 
// "Mission District, San Francisco, CA, USA"
// category
// : 
// "Work"
// text
// : 
// "Mission District Magic: Top Three Coffee Shops to Work in San Francisco's Vibrant Neighborhood"
// series
// : 
// "Neumads Pick"
// slug
// : 
// "ca-san-fransisco-top-three-mission-district"
// snippet
// : 
// undefined
// tags
// : 
// undefined
// thumbnail
// : 
// "https://images.ctfassets.net/i1hcb4885ci0/6hfaVA1TiDdUVILNc4xihv/08e880a99958fcb962655d70f7deb711/The_Neumadic_Trails__Bay_Area_thumbnail.png"
// title
// : 
// "CA, San Fransisco, Top Three, Mission District"
// type
// : 
// "Region"
       
//         // add click event listeners to each store listing
//         // const storeElements = listings.querySelectorAll('.store');
//         // storeElements.forEach((store) => {
//         //     stores.addEventListener('click', () => {
//         //         const id = stores.dataset.id;
//         //         const marker = markers[id];
//         //         map.flyTo({ center: marker.getLngLat(), zoom: 16 });
       
//         //         // highlight selected store and unhighlight others
//         //         storeElements.forEach((el) => el.classList.remove('active'));
//         //         stores.classList.add('active');
//         //     });
//         // });
//         // };
 
//     return listing;
// };
// export default CreateListing;