// ../components/HeaderHome.js
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import DineScreen from '../screens/DineScreen';
let lastSelectedResult = null;
// Initialize the geocoder only once
var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Location',
  flyTo: false
});
// Attach the 'result' event listener only once
geocoder.on('result', function(e) {
  lastSelectedResult = e.result;
});
const HeaderHome = {
  render: async () => {
    return `
          <nav class="nav navigation container nav-top" id="top-nav">
            <section class="grid base nav-main">
          
              <div class="nav-main-left left">
                  <div class="nav-main-logo">
                      <!-- hamburger -->  
                      <img class="img-logo" src="./_assets/_brand/logomark/logomark-neumad.svg" alt="">
                  </div>
              </div>
              <div class="nav-main-center search-container">
              
                <div class="search-input">
                  <div class="search">

                  <!--CATEGORY-->
                    <div class="searchBar-categoryType searchBar-item">
                      <div class="searchBar-categoryType-container category">
                          <div class="categoryType-text">
                              <span class="text03">
                                  <input type="text" id="search category" placeholder="Category" />
                              </span>
                          </div>

                      </div>
                    </div>

                    <!--FILLER-->
                    <div class="search-filler searchBar-item">
                      <div class="filler">
                        <div class="cta-input">
                          <span class="field-text">
                            in
                          </span>
                        </div>
                      </div>
                    </div>
                    <!--FILLER-->

                    <!--LOCATION-->
                    <div class="searchBar-location searchBar-item">
                      <div id='geocoder' class='geocoder text03'></div>
                        <!--<div class="text03" id="geocoder"></div>-->
                        <pre id="result"></pre>
                      </div>
                    </div>
                    <!--LOCATION-->

                    <!--CTA-->
                    <div class="searchBar-cta searchBar-item">
                      <div class="searchBar-cta-container">
                        <button id="search-btn"><i class="cta menu-icon icon-Search-21px"></i></button>
                      </div>
                    </div>
                    <!--CTA-->

                  </div>
                </div>
                <div class="nav-main-right right">
                  <div class="nav-main-right-container">
                    <a href="/#/Map">
                      <div class="section-tag" id="Location">
                        <div class="section-tag-container">
                          <i class="section-tag-icon icon-Map"></i>
                          <span class="section-tag-text bold03">
                          Map View
                          </span>
                        </div>
                      </div>
                    </a>
                    <div class="section-tag" id="Location">
                      <div class="section-tag-icon hamburger">
                        <i class="icon-hamburger">
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </nav>
    `;
  },
  after_render: async (map) => {
    // Detach the geocoder from any previous map instance
    if (geocoder._map) {
      geocoder.remove();
    }
    

    // Attach the geocoder to the new map instance
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    document.getElementById('search-btn').addEventListener('click', function() {
      // Your search button click handler code here...
    });

     // Grab the nav-main and search-container elements
     const navMain = document.querySelector('.nav-main');
     const searchContainer = document.querySelector('.nav-main-center.search-container');
 
     // Add event listener for mouseenter
     navMain.addEventListener('mouseenter', function() {
       let searchIcon = document.querySelector('.searchBar-cta .menu-icon.icon-Search-21px');
       if (!searchIcon) { 
         // Create the search icon and append to searchBar-cta-container
         const iconElem = document.createElement('i');
         iconElem.className = 'cta menu-icon icon-Search-21px';
         document.querySelector('.searchBar-cta-container').appendChild(iconElem);
 
         // Update grid-column for search-container
         searchContainer.style.gridColumn = '16 / 43 !important';
 
         // Update grid-column for the search icon (if needed)
         iconElem.style.gridColumn = '...';  // Adjust if needed
       }
     });
 
     // Add event listener for mouseleave
     navMain.addEventListener('mouseleave', function() {
       let searchIcon = document.querySelector('.searchBar-cta .menu-icon.icon-Search-21px');
       if (searchIcon) {
         searchIcon.remove();
 
         // Reset grid-column for search-container
         searchContainer.style.gridColumn = '24 / 35 !important';
       }
     });
  },
  getLastSelectedResult: () => lastSelectedResult
};

export default HeaderHome;