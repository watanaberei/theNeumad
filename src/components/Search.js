// ..components/Search.js
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import SearchFunction from './SearchFunction.js';
import mapboxgl from "mapbox-gl";

const Search = {
  render: async () => {
    return `
    SEARCH
        <div class="search-container">
          <div class="search-input">
            <div class="search">
              <div class="search-field-container">       
                <div class="search-category" id="search-category">      
                  <a class="search-field search-fieldPlace" id="category" href="#" >
                    <div class="cta">            
                      <div class="cta-icon">
                        <i class="icon-category-Work20px">
                        </i>
                      </div>
                  
                      <input type="text" id="category" placeholder="Category" />
                      
                      
              
                    </div>
                  </a>

                  <div class="search-category-results" id="search-category-results">
                    <div class="search-category-results-split" >
                      <div class="search-category-results-list">
                        <div class="list-item-title">
                          Categories
                        </div>
                        <div class="search-location-results-list-item">
                          <div class="list-item-img-container">
                            <img class="list-item-img">
                            </img>
                          </div>
                          <div class="list-item-text">
                            Long Beach
                          </div>
                        </div>
                        <div class="search-category-results-list-item">
                          <div class="list-item-img-container">
                            <img class="list-item-img">
                          </img>
                          </div>
                          <div class="list-item-text">
                            Torrance
                          </div>
                        </div>
                        <div class="search-category-results-list-item">
                          <div class="list-item-img-container">
                            <img class="list-item-img">
                            </img>
                          </div>
                          <div class="list-item-text">
                            Cerritos
                          </div>
                        </div>
                      </div>
                      <div class="search-category-results-card">
                        <div class="list-item-title">
                          Categories
                        </div>
                        <div class="search-location-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-category-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                          </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-category-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-category-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-category-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                          </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-category-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="search-filler">
                  <div class="filler">
                    <div class="cta-input">
                      <span class="field-text">
                        in
                      </span>
                    </div>
                  </div>
                </div>   
                <div class="search-location" id="search-location">
                    <a class="search-field search-fieldPlace" id="location" href="#">
                    <div class="cta">
                      <div class="cta-input field" display>
                        <span class="ink field-text">
                        <div id='geocoder' class='geocoder'></div>
                        
                        </span>
                      </div>
                    </div>
                  </a>
                  <div class="search-location-results" id="search-location-results">
                    <div class="search-location-results-split" >
                      <div class="search-location-results-list">
                        <div class="list-item-title">
                          Location
                        </div>
                        <div class="search-location-results-list-item">
                          <div class="list-item-img-container">
                            <img class="list-item-img">
                            </img>
                          </div>
                          <div class="list-item-text">
                            Long Beach
                          </div>
                        </div>
                        <div class="search-location-results-list-item">
                          <div class="list-item-img-container">
                            <img class="list-item-img">
                          </img>
                          </div>
                          <div class="list-item-text">
                            Torrance
                          </div>
                        </div>
                        <div class="search-location-results-list-item">
                          <div class="list-item-img-container">
                            <img class="list-item-img">
                            </img>
                          </div>
                          <div class="list-item-text">
                            Cerritos
                          </div>
                        </div>
                      </div>
                      <div class="search-location-results-card">
                        <div class="list-item-title">
                          Categories
                        </div>
                        <div class="search-location-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-location-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                          </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-location-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-location-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-location-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                          </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                        <div class="search-location-results-card-item">
                          <div class="card-item">
                            <img class="card-item-img">
                            </img>
                          </div>
                          <div class="card-item-text">
                            img item
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="menu cta">
                <button id="search-btn">
                  <i class="menu-icon icon-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    },
    after_render: () => {
      mapboxgl.accessToken = 'pk.eyJ1IjoibmV1bWFkIiwiYSI6ImNsaG53eXJjbjFwbWEzbnFzNms1bzhpYXUifQ.y-7_YrQsMtwBcyreTeqOww'; 

      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Location',
        flyTo: false
      });
     
      geocoder.on('result', function(e) {
        lastSelectedResult = e.result;
      });
  
  
      document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
      
  
  
  
      var markers = [];
      geojson.features.forEach(function(marker) {
        var el = document.createElement('div');
        el.className = 'marker';
        var newMarker = new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h3>' + marker.properties.title + '</h3><p>'  + '<div id="category">' + marker.properties.category + '</div>'+ marker.properties.address + '</p>'))
          .addTo(map);
        markers.push({marker: newMarker, feature: marker});
      });
      let lastSelectedResult = null;
  
      
  
  
      
      const categories = markers.map(m => m.feature.properties.category);
      console.log("categories: ", categories);
          // Store all markers in a separate variable
          var allMarkers = markers;
      
      document.getElementById('search-btn').addEventListener('click', function() {
        var category = document.getElementById('category').value;
        var location = lastSelectedResult;
        if (category || location) {
          allMarkers.forEach(m => {
            // If the marker does not match the filter, change its style
            if (!category || m.feature.properties.category.toLowerCase() !== category.toLowerCase()) {
              var el = m.marker.getElement();
              el.id = 'markerInactive';
            } else {
              // If the marker matches the filter, reset its style
              var el = m.marker.getElement();
              el.id = 'markerActive';
              // el.style.backgroundColor = ''; // Reset to the original color
              // el.style.width = ''; // Reset to the original width
              // el.style.height = ''; // Reset to the original height
            }
          });
          if (location) {
            map.flyTo({center: location.geometry.coordinates, zoom: 14});
          }
        } else {
          alert('Please enter a category or select a location');
        }
      });
    },
  };
  
  export default Search;