// src/screens/Header.js
import { weatherData, fetchCityWeatherData } from './weatherReport.js';
import LocationInput from '../components/locationInput.js';
import fetchDateTime from  '../components/timeApi.js';
import { geojsonStore } from '../components/GeojsonStores';
import { createGeocoderInput } from '../components/GeocoderInput';


// Add city to timezone mapping
const cityTimezoneMapping = {
  'New York': 'America/New_York',
  'Texas': 'America/Chicago',
  // Add other city to timezone mappings here
};




const Header = {
  render: async () => {
    const weatherReport = await fetchCityWeatherData('New York'); // replace 'New York' with the desired location
    const { datetime } = await fetchDateTime(cityTimezoneMapping['New York']); // replace 'New York' with the same location as above

    const currentTemp = weatherReport.main.temp;
    const currentLocation = weatherReport.name;
    const currentDate = new Date(datetime).toDateString();


    const newLocal=`<nav class="navigation container nav-top">

          <section class="nav-reportBar">
            <div class="nav-reportBar-content">
              <div class="nav-reportBar-content-container">
                <div class="nav-reportBar-content-wrapper">
                  
                </div>
              </div>
            </div>
          </section>





          <section class="nav-utility">
            <div class="nav-utility-container">x
              <div class="nav-utility-left">
                <!-- hamburger --> 
                <div class="hamburger"><i class="icon-hamburger"></i></div>
              </div>
              <div class="nav-utility-mid">
                <div class="nav-utility-mid-logo">
                    <!-- logo -->
                    <img src="./_assets/_brand/logo/neumad_logo_text_light.svg" alt="">
                </div>
              </div>
              <!-- search -->
              
              <div class="nav-utility-right">
              <div id="geocoder-container"></div>
                <!--
                <div class="search-wrapper">
                    <header class="main-search clearfix">
                      <button type="button" class="btn pull-right" id="search-toggle">
                        <span class="fa fa-search icon-search"></i>
                      </button>
                      <div class="form-search stretch-to-fit">
                        <label for="search" class="btn pull-left">
                          <span class="btn fa fa-search icon-search"></i>
                        </label>
                        <div class="search-control stretch-to-fit">
                          <input type="text" id="search" placeholder="Search...">
                        </div>
                      </div>
                    </header>

                    <div class="search-container">
                      <div class="search-results">
                        <ul>
                          <li>You can show search results here.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur.</li>
                        </ul>
                      </div>
                    </div>

                  </div>
                 
                  <div class="search-wrapper">
                    <header class="main-search clearfix">
                      <div id="location-input-container"></div>
                    </header>
                  </div>
                  -->
              </div>
            </div>
          </section>




          <section class="nav-mid">
            <div class="nav-mid-left"> 
              <div class="current-date current-data">
                <span class="bold01" data-testid="current-date">
                  ${currentDate}
                </span>
              </div> 
              <div class="current-location current-data">
                <span class="text01" data-testid="current-location">
                  ${currentLocation}
                </span>
              </div>
            </div> 
            <div class="nav-brand-logo">
              <!-- logo -->
              <a class="logo" href="/"> 
                <img src="./_assets/_brand/logo/neumad_logo_text_light.svg" alt="" />
              </a>
            </div>
            <div class="nav-mid-right">
              <div class="current-temp current-data">
                <i class="bx bx-cloud"></i>
                <span class="bold01" data-testid="current-temp">
                  ${currentTemp}°F 
                </span>
              </div>
              <div class="current-time current-data">
                <span class="text01" data-testid="current-time">
                  ${datetime}
                </span>
              </div>
            </div>
          </section>
  
          <section class="nav-tags">
            <div class="nav-tags-container">
              <!--
              <div class="nav-search">
                <fieldset class="nav-search-container" id="nav-search-container">
                    <i class="bx bx-search"></i>
                    <div class="nav-list-divider"> 
                        <div class="lineV"></div>
                    </div> 
                    <input class="nav-search-input" id="search-input" type="search" placeholder="Search" /></input>
                </fieldset>    
              </div>  
              -->
          
              <div class="nav-tags-menu"> 
                <!-- menu -->  
                <ul class="nav-tags-list nav-tags-flex"> 
              
                  <li>
                    <a href="/#/work">
                      <div class="section-tag" id="Work">
                        <i class="section-tag-icon icon-Work"></i>
                        <!--<span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>-->
                        <span class="section-tag-text bold01">
                            Work
                        </span>
                      </div>
                    </a>
                  </li>
                  
                  <li>
                    <a href="/#/dine">
                      <div class="section-tag" id="Dine">
                        <i class="section-tag-icon icon-Dine"></i>
                        <!--<span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>-->
                        <span class="section-tag-text bold01">
                            Dine
                        </span>
                      </div>
                    </a>
                  </li>
            
                  <li>
                    <a href="/#/unwind">
                      <div class="section-tag" id="Unwind">
                        <i class="section-tag-icon icon-Unwind"></i>
                        <!--<span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>-->
                        <span class="section-tag-text bold01">
                            Unwind
                        </span>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="/#/shorts">
                      <div class="section-tag" id="Shorts">
                        <i class="section-tag-icon icon-Shorts"></i>
                        <!--<span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>-->
                        <span class="section-tag-text bold01">
                          Shorts
                        </span>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="/#/series">
                      <div class="section-tag" id="Series">
                        <i class="section-tag-icon icon-Series"></i>
                        <!--<span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>-->
                        <span class="section-tag-text bold01">
                          Series
                        </span>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="/#/Map">
                      <div class="section-tag" id="Location">
                        <i class="section-tag-icon icon-Places"></i>
                        <!--<span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>-->
                        <span class="section-tag-text bold01">
                          Places
                        </span>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="/#/reviews">
                      <div class="section-tag" id="Reviews">
                        <i class="section-tag-icon icon-Reviews"></i>
                        <!--<span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>-->
                        <span class="section-tag-text bold01">
                        Reviews
                        </span>
                      </div>
                    </a>
                  </li>
                  
                  
                  <div class="nav-list-divider">
                    <div class="lineV"></div>
                  </div>

                  <!--
                  <li>
                    <a href="/#/about">
                      <span class="text01">Dine</span>
                    </a>
                  </li>
                  <div class="nav-list-divider">
                    <div class="lineV"></div>
                  </div> 
                  <li>
                    <a href="/#/contact"> 
                      <span class="text01">Unwind</span>
                    </a>
                  </li>
                  <div class="nav-list-divider">
                    <div class="lineV"></div>
                  </div>
                  <li>
                    <a href="/#/shorts"> 
                      <span class="text01">Shorts</span>
                    </a> 
                  </li>
                  <li>
                    <a href="/#/series">
                      <span class="text01">Series</span>
                    </a>
                  </li>
                  <div class="nav-list-divider">
                    <div class="lineV"></div> 
                  </div> 
                  -->
                </ul>
              </div>  
 
            
            </div>   
          </section>


          <!--SIDEBAR-->
          <!-- menu -->  
          <section class="nav-menu">
              <div class="nav-menu-container">
              
          
                  <ul class="nav-menu-list nav-menu-flex"> 

                  <li>
                      <div class="nav-utility-right">
                          <!-- search -->
                          <!-- <div class="search-wrapper">
                              <header class="main-search clearfix">
                              <button type="button" class="btn pull-right" id="search-toggle">
                                  <span class="fa fa-search icon-search"></i>
                              </button>
                              <div class="form-search stretch-to-fit">
                                  <label for="search" class="btn pull-left">
                                  <span class="btn fa fa-search icon-search"></i>
                                  </label>
                                  <div class="search-control stretch-to-fit">
                                  <input type="text" id="search" placeholder="Search...">
                                  </div>
                              </div>
                              </header>
                          </div>-->
                      </div>
                  </li>

                  <li>
                  <div class="navWork-list-divider">
                      <div class="lineV"></div>
                  </div>
                  <li>
                      <a href="/#/work">
                      <span class="display06">Work</span>
                      </a>
                  </li>
                  <div class="navWork-list-divider">
                      <div class="lineV"></div>
                  </div>
                  <li>
                      <a href="/#/dine">
                      <span class="display06">Dine</span>
                      </a>
                  </li>
                  <div class="navWork-list-divider">
                      <div class="lineV"></div>
                  </div> 
                  <li>
                      <a href="/#/unwind"> 
                      <span class="display06">Unwind</span>
                      </a>
                  </li>
                  <div class="navWork-list-divider">
                      <div class="lineV"></div>
                  </div>
                  <li>
                      <a href="/#/shorts"> 
                      <span class="display06">Shorts</span>
                      </a> 
                  </li>
                  <div class="navWork-list-divider">
                      <div class="lineV"></div> 
                  </div> 
                  </ul>
              <div class="lineH"></div>
                  <ul class="nav-menu-list nav-menu-flex">
                  <li>
                      <a href="/#/about">
                      <span class="display03">About</span>
                      </a>
                  </li>
                  <div class="navWork-list-divider">
                      <div class="lineV"></div>
                  </div> 
                  <li>
                      <a href="/#/contact"> 
                      <span class="display03">Contact</span>
                      </a>
                  </li>
                  <div class="navWork-list-divider">
                      <div class="lineV"></div>
                  </div>
                  </ul>
              </div> 
          

              
              </div>   
          </section>        
        </nav>`;  
    return newLocal;  
  },
  after_render: async () => {
    const cityName = "New York";

    await fetchCityWeatherData(cityName);

    // const locationInput = new LocationInput();
    // locationInput.create();
    // document.getElementById('location-input-container').appendChild(locationInput.inputElement);
    // document.getElementById('location-input-container').appendChild(locationInput.submitButton);

    // // Update event listener for submitButton
    // // Inside the event listener in after_render
    // locationInput.submitButton.addEventListener('click', async () => {
    //   const cityName = locationInput.inputElement.value;
    //   const urlFriendlyCityName = cityName.replace(' ', '_'); // Replace spaces with underscore for URLs

    //   await fetchCityWeatherData(urlFriendlyCityName);

    //   // Fetch the time for the entered city
    //   const timezone = cityTimezoneMapping[location];
    //   fetchDateTime(timezone).then(dateTime => {
    //     //use dateTime here
    //     document.querySelector('[data-testid="current-date"]').innerText = dateTime;
    //   });
    //   if (!timezone) {
    //     console.error(`No timezone mapping for city: ${cityName}`);
    //   } else {
    //     const dateTimeData = await fetchDateTime(timezone);
    //     const dateTime = dateTimeData.datetime; // Replace this with actual property key if different
    //   }

    //   const weatherDataForCity = weatherData[cityName];

    //   if (!weatherDataForCity) {
    //     console.error(`No weather data for city: ${cityName}`);
    //     return;
    //   }

    //   // Update the date and location spans
    //   const currentDateElement = document.querySelector('[data-testid="current-date"]');
    //   const currentLocationElement = document.querySelectorAll('[data-testid="current-location"]');
    //   const currentTempElement = document.querySelector('[data-testid="current-temp"]');
    //   const currentTimeElement = document.querySelector('[data-testid="current-time"]');

    //   if (currentDateElement) {
    //     currentDateElement.innerText = dateTime; // Updated with the fetched dateTime
    //   }

    //   currentLocationElement.forEach((element) => {
    //     element.innerText = cityName;
    //   });

    //   if (currentTempElement) {
    //     currentTempElement.innerText = `${weatherDataForCity.temperature}°F`;
    //   }

    //   // Also update time
    //   if (currentTimeElement) {
    //     currentTimeElement.innerText = dateTime; // Replace with the correct property for time
    //   }


    //   // Then, use the data to update your span elements
    //   const weatherReportTitle = document.querySelector('.weatherReport_title');
    //   if (weatherReportTitle) {
    //     weatherReportTitle.innerText = weatherDataForCity.cityTitle;
    //   }

    //   document.querySelector('.weatherReport_temp').innerText = `${weatherDataForCity.temperature}°F`;
    //   document.querySelector('.weatherReport_description').innerText = weatherDataForCity.description;
    //   document.querySelector('.weatherReport_humidity').innerText = `${weatherDataForCity.humidity}% Humidity`;
    //   document.querySelector('.weatherReport_wind').innerText = `${weatherDataForCity.windSpeed} Km/h Wind speed`;
    // });
    // const cityName = "New York";

    // await fetchCityWeatherData(cityName);

    // const weatherDataForCity = weatherData[cityName];

    // if (!weatherDataForCity) {
    //   console.error(`No weather data for city: ${cityName}`);
    //   return;
    // }

    // // Then, use the data to update your span elements
    // const weatherReportTitle = document.querySelector('.weatherReport_title');
    // if (weatherReportTitle) {
    //   weatherReportTitle.innerText = weatherDataForCity.cityTitle;
    // }

    // document.querySelector('.weatherReport_temp').innerText = `${weatherDataForCity.temperature}°F`;
    // document.querySelector('.weatherReport_description').innerText = weatherDataForCity.description;
    // document.querySelector('.weatherReport_humidity').innerText = `${weatherDataForCity.humidity}% Humidity`;
    // document.querySelector('.weatherReport_wind').innerText = `${weatherDataForCity.windSpeed} Km/h Wind speed`;

    const navList = document.querySelector(".nav-menu");
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector(".header");
    const headerMid = document.querySelector(".nav-mid");
    const utilityLogo = document.querySelector(".nav-utility-mid-logo");
    // const search = document.querySelector("#search-toggle");

    hamburger.addEventListener("click", () => {
      navList.classList.toggle("show");
    });

    const navHeight = header.getBoundingClientRect().height;
    window.addEventListener("scroll", () => {
      const scrollHeight = window.pageYOffset;
      if (scrollHeight > navHeight) {
        header.classList.add("fix"); 
        headerMid.classList.add("hide");
        utilityLogo.classList.add("show");

      } else {
        header.classList.remove("fix");
        headerMid.classList.remove("hide");
        utilityLogo.classList.remove("show");
      }
      
    });

    // Search
    const { features } = await geojsonStore();

    const geocoder = createGeocoderInput(features);
    geocoder.addTo('#geocoder-container');


    // Listen for the 'results' event and log the result
    geocoder.on('results', function (results) {
      console.log(results);
      if (results.query[0].toLowerCase() === 'current location') {
        setCurrentLocation(features);
      }
    });

    // Clear results container when search is cleared.
    geocoder.on('clear', () => {
      results.innerText = '';
    });



    // const searchToggle = document.querySelector("#search-toggle");
    // searchToggle.addEventListener("click", function () {
    //   const searchInput = document.querySelector("#search");
    //   const searchIcon = this.querySelector("span");

    //   searchInput.value = "";
    //   if (searchIcon.classList.contains("fa-search")) {
    //     searchInput.focus();
    //   }

    //   document.querySelector(".main-search").classList.toggle("active");
    //   searchIcon.classList.toggle("icon-search");
    //   searchIcon.classList.toggle("icon-close");
    // });



    const links = [...document.querySelectorAll(".nav-menu a")];
      links.map((link) => {
        link.addEventListener("click", () => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        });
      });
    },
};

function setCurrentLocation(map, features) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userCoordinates = [position.coords.longitude, position.coords.latitude];
      
      const filteredFeatures = filterFeaturesInBounds(features, mapBounds);
      const sortedFeatures = sortFeaturesByDistance(filteredFeatures, userCoordinates);
      renderFeatures(sortedFeatures, map);

      zoomToShowAtLeastThreePins(map, features, userCoordinates);
    });
  } else {
    renderFeatures(features, map);
  }
}

function filterFeaturesInBounds(features, bounds) {
  return features.filter((feature) => {
    const coordinates = feature.geometry.coordinates;
    return bounds.contains(coordinates);
  });
}

function sortFeaturesByDistance(features, center) {
  return features.sort((a, b) => {
    const distanceA = getDistance(center, a.geometry.coordinates);
    const distanceB = getDistance(center, b.geometry.coordinates);
    return distanceA - distanceB;
  });
}

function renderFeatures(features, map) {
  document.getElementById('listings').innerHTML = '';
  features.forEach((store) => {
    const onClick = (store) => {
      flyToStore(store, map);
      createPopUp(store, map);
    };

    const marker = createMapMarker(store, map, onClick);
    const listing = createGeojsonListing(store, onClick);

    document.getElementById('listings').appendChild(listing);
  });
}

export default Header;


