// src/components/GeojsonListing.js
export function createGeojsonListing(store, onClick) {
   console.log("Creating listing for properties:", store); // Add this line
  if (!store.properties) {
    return '';
  }

  const { tag, slug,  thumbnail, category, headline } = store.properties;
  const tags = tag && tag.length ? tag[0].tags : [];
  const title = headline || [];
  // const medias = media || [];

  // const thumbnailss = medias.url;
console.log("tags", tags);
  const limitedTags03 = tags.slice(0, 3);
  let tagsHTML = '';
  limitedTags03.forEach(tag => {
    tagsHTML += `<div class="metadata-tag">
                   <span class="metadata-tag-text text01">${tag}</span>
                 </div>`;
  });

  const listing = document.createElement('div');
  listing.className = 'blog';
  listing.addEventListener('click', () => onClick(store));

  listing.innerHTML = `
    <div class="blog-img">
      <a href="/#/article/${category.category}/${slug}">
        <img src="${thumbnail}" alt="" />
      </a>
    </div>
    <div class="blog-text">
      <div class="blog-header">
        <a href="/#/${category.category}/${slug}">
          <div class="blog-header-container">
            <span class="blog-title-text header04">
              ${title}
            </span>
          </div>
        </a>
      </div>
      <div class="blog-data">
        <div class="tag-collection">
          <div class="blog-data-container">
            <a href="/#/dine">
              <div class="section-tag" id="${category.category}">
                <i class="section-tag-icon icon-${category.category}"></i>
                <span class="section-tag-divider">
                  <div class="lineV"></div>
                </span>
                <span class="section-tag-text medium00">
                  ${category.category}
                </span>
              </div>
            </a>
          </div>
          <div class="nav-list-divider">
            <div class="lineV"></div>
          </div>
          <div class="blog-data">
            ${tagsHTML}
          </div>
        </div>
        <div class="data-time">
          <span class="data-time-text text01">2m Read</span>
        </div>
      </div>
      <div class="lineH"></div>
    </div>
  `;

  return listing;
}


  

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

