// src/components/GeojsonListing.js
export function createGeojsonListing(store) {
    const listing = document.createElement('div');
    listing.className = 'listing';
    listing.textContent = store.properties.address;
  
    

    return listing;
  }











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

