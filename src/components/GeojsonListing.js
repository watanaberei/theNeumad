const GeojsonListing = {
    render: (props) => {
    const stores = props.features.map((store, i) => {
    const { name, address } = store.properties;
    return `<div class="store" data-id="${i}"> <h3>${name}</h3> <p>${address}</p> </div> ;`
    }).join('');
    const listings = document.createElement('div');
    listings.className = 'listings';
    listings.innerHTML = stores;
    
    // add click event listeners to each store listing
    const storeElements = listings.querySelectorAll('.store');
    storeElements.forEach((store) => {
        store.addEventListener('click', () => {
            const id = store.dataset.id;
            const marker = markers[id];
            map.flyTo({ center: marker.getLngLat(), zoom: 16 });
    
            // highlight selected store and unhighlight others
            storeElements.forEach((el) => el.classList.remove('active'));
            store.classList.add('active');
        });
    });}
    

};

export default GeojsonListing;