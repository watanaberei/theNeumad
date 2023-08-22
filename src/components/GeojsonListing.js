// src/components/GeojsonListing.js
export function createGeojsonListing(store, map, userCoordinates) {
  if (!store.properties) {
    return '';
  }
 
  const { lat, lon, series, region, address, tag, slug, variant, thumbnail, category, headline,location } = store.properties;
  const tags = tag && tag.length ? tag[0].tags : [];
  const title = headline || [];
  const locations = location || [];
  const limitedTags03 = tags.slice(0, 3);
  
  console.log('Title: ' + title + ', ' + 'Category: ' + category + ', ' + 'Latitude: ' + lat + ', ' + 'Longitude: ' + lon  + ', ' + 'Address: '+ address)
  let tagsHTML = '';

  limitedTags03.forEach(tag => {
    tagsHTML += `<div class="metadata-tag">
                   <span class="metadata-tag-text text01 bold">${tag}</span>
                 </div>`;
  });
 
  const listing = document.createElement('a');
  listing.className = ' ' + 'card-postListing-item';
  listing.href = '/#/'+variant+'/'+slug;
  listing.rel = 'noopener noreferrer nofollow';
  listing.target = category + '-${store.sys.id}';
  listing.onclick = function() {
    mapRoute(userCoordinates, store.geometry.coordinates);
  }
  // Create different innerHTML based on variant
  if (variant === 'store') {////////////////////STORES////////////////////
    listing.className += ' ' + 'listingStore';
    listing.innerHTML = `
  <div class="c1col2-p2 card-postListing-item-content">
    <div class="content-title">
      <span class="header04">
        ${title}
      </span>

      <span class="paragraph">
       ${region}
      </span>
    </div>

    <div class="post-data">
      <div class="tag-collection">
        <!--
        <div class="post-data-container">
          <a href="/#/${category.category}">
            <div class="metadata-tag-icon" id="${category.category}">
              <i class="icon-${category.category}"></i>
              <span class="metadata-tag-divider">
                <div class="lineV"></div>
              </span>
              <span class="metadata-tag-text medium00">
                ${category.category}
              </span>
            </div>
          </a>
        </div>
        -->
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
    listing.className += ' ' + 'listingReviews';
    listing.innerHTML = `
  <div class="p1-c2col1 ratio1x1 card-postListing-item-img">
    <img class="item-img" src="${thumbnail}" alt="" />
  </div>

  <div class="c1col2-p2 card-postListing-item-content">
    <div class="content-title">
      <span class="header04">
        ${title}
      </span>

      <span class="paragraph">
       ${region}
      </span>
      </div>

      <div class="post-data">
        <div class="tag-collection">
          <!--
          <div class="post-data-container">
            <a href="/#/${category.category}">
              <div class="metadata-tag-icon" id="${category.category}">
                <i class="icon-${category.category}"></i>
                <span class="metadata-tag-divider">
                  <div class="lineV"></div>
                </span>
                <span class="metadata-tag-text medium00">
                  ${category.category}
                </span>
              </div>
            </a>
          </div>
          -->
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
  } else if (variant === 'articles') { ////////////////////ARTICLES////////////////////
    listing.className += ' ' + 'listingArticles';
    listing.innerHTML = `
    <div class="c1-c3 card-postListing-item-content">
      <div class="content-title">
        <span class="header05">
          ${title}
        </span>
        <span class="paragraph">
        ${series.series}
        </span>
        <span class="paragraph">
        ${region}
        </span>
      </div>

      <div class="post-data">
        <div class="tag-collection">
          <!--
          <div class="post-data-container">
            <a href="/#/${category.category}">
              <div class="metadata-tag-icon" id="${category.category}">
                <i class="icon-${category.category}"></i>
                <span class="metadata-tag-divider">
                  <div class="lineV"></div>
                </span>
                <span class="metadata-tag-text medium00">
                  ${category.category}
                </span>
              </div>
            </a>
          </div>
          -->
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
      </div>
    </div>
    <div class="c3col2-c5col2 ratio1x1 card-articleListing-item-img">
    <img class="item-img" src="${thumbnail}" alt="" />
    <img class="item-img" src="${thumbnail}" alt="" />
    </div>
  `; 
  } else if (variant === 'blogs') { ////////////////////BLOGS////////////////////
    listing.className += ' ' + 'listingPosts';
    listing.innerHTML = `
  <div class="p1-c2col1 ratio1x1 card-postListing-item-img">
    <img class="item-img" src="${thumbnail}" alt="" />
  </div>

  <div class="c1col2-p2 card-postListing-item-content">
    <div class="content-title">
      <span class="header04">
        ${title}
      </span>
      <span class="paragraph03">
        $ {snippet}
      </span>

      <span class="paragraph">
       ${region}
      </span>
      </div>

      <div class="blogs-data">
        <div class="tag-collection">
          <!--
          <div class="post-data-container">
            <a href="/#/${category.category}">
              <div class="metadata-tag-icon" id="${category.category}">
                <i class="icon-${category.category}"></i>
                <span class="metadata-tag-divider">
                  <div class="lineV"></div>
                </span>
                <span class="metadata-tag-text medium00">
                  ${category.category}
                </span>
              </div>
            </a>
          </div>
          -->
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
    listing.innerHTML = `
    <div class="p1-c2col1 ratio1x1 card-postListing-item-img">
      <img class="item-img" src="${thumbnail}" alt="" />
    </div>

    <div class="c1col2-p2 card-postListing-item-content">
      <div class="content-title">
        <span class="header04">
          ${title}
        </span>

        <span class="paragraph">
        ${region}
        </span>
      </div>

      <div class="post-data">
        <div class="tag-collection">
          <!--
          <div class="post-data-container">
            <a href="/#/${category.category}">
              <div class="metadata-tag-icon" id="${category.category}">
                <i class="icon-${category.category}"></i>
                <span class="metadata-tag-divider">
                  <div class="lineV"></div>
                </span>
                <span class="metadata-tag-text medium00">
                  ${category.category}
                </span>
              </div>
            </a>
          </div>
          -->
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
 



// export function createGeojsonListing(store, onClick) {
//   // console.log("Creating listing for properties:", store); // Add this line
//  if (!store.properties) {
//    return '';
//  }

//  const { region, tag, slug, variant, thumbnail, category, headline,location } = store.properties;
//  const tags = tag && tag.length ? tag[0].tags : [];
//  const title = headline || [];
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
//     // const { title, headline, address } = stores.properties;
//     // return `
//     //     <div class="store" data-id="${i}"> 
//     //         <h3>${title}</h3>
//     //         <p>${headline}</p> 
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

       
   
//         const headline = document.createElement('h3');
//         headline.textContent = properties.headline;
//         listing.appendChild(headline);
   
//         const address = document.createElement('p');
//         address.textContent = properties.address;
//         listing.appendChild(address);
       

//         address
// : 
// "Mission District, San Francisco, CA, USA"
// category
// : 
// "Work"
// headline
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