// src/components/HeaderMap061023.js
import { createGeocoderInput } from '../components/GeocoderInput';
import { geojsonStore } from '../components/GeojsonStores';

const HeaderMap = {
  render: () => {
    const newLocal = `
    <nav class="navigation container nav-top">

          <section class="nav-reportBar">
            <div class="nav-reportBar-content">
              <div class="nav-reportBar-content-container">
                <div class="nav-reportBar-content-wrapper">
                  <span class="text01">Report Bar Content 01</span>
                  <span class="text01">Data 01</span>
                  <span class="text01">Data 02</span>
                </div>
                <div class="nav-reportBar-content-wrapper">
                  <span class="text01">Report Bar Content 01</span>
                  <span class="text01">Data 01</span>
                  <span class="text01">Data 02</span>
                </div>
              </div>
            </div>
          </section>



          <section class="nav-utility">
          <div class="nav-utility-container">
            <div class="nav-utility-left">
              <div class="hamburger"><i class="icon-hamburger"></i></div>
            </div>
            <div class="nav-utility-mid">
              <div class="navSecondary-utility-mid-logo">
                <a class="navSecondary-utility-mid-logo-container" href="/"> 
                  <img src="./images/brand/twn_brand_logo-H-med_v08.svg" alt="">
                </a>
              </div>
            </div>
            <div class="nav-utility-right">
              <div class="search-wrapper" id="geocoder-container">
              </div>
            </div>
          </div>


  
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
                        <span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>
                        <span class="section-tag-text medium01">
                            Work
                        </span>
                      </div>
                    </a>
                  </li>
                  
                  <li>
                    <a href="/#/dine">
                      <div class="section-tag" id="Dine">
                        <i class="section-tag-icon icon-Dine"></i>
                        <span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>
                        <span class="section-tag-text medium00">
                            Dine
                        </span>
                      </div>
                    </a>
                  </li>
            
                  <li>
                    <a href="/#/unwind">
                      <div class="section-tag" id="Unwind">
                        <i class="section-tag-icon icon-Unwind"></i>
                        <span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>
                        <span class="section-tag-text medium01">
                            Unwind
                        </span>
                      </div>
                    </a>
                  </li>
                  
                  <a href="/#/shorts">
                    <div class="section-tag" id="Shorts">
                        <i class="section-tag-icon icon-Shorts"></i>
                        <span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>
                        <span class="section-tag-text medium01">
                            Shorts
                        </span>
                    </div>
                  </a>
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
                  <div class="nav-list-divider">
                    <div class="lineV"></div> 
                  </div> 
                  -->
                </ul>
              </div>  
 
            
            </div>   
          </section>  
             
        </nav>`;  
    return newLocal;  
  },
  after_render: async () => {
    const features = await geojsonStore();
    const geocoder = createGeocoderInput(features);
    const navList = document.querySelector(".nav-list");
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector(".header");
    const headerMid = document.querySelector(".nav-mid");
    const utilityLogo = document.querySelector(".nav-utility-mid-logo");
    const search = document.querySelector("#search-toggle");

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
//REPLACE THIS CODE BELOW WITH GEOCODER FUNCTIONS AND CONST
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
    const geocoderContainer =document.getElementById('geocoder-container')
    document.getElementById('geocoder-container').appendChild(geocoder.onAdd(window.map));
    geocoder.on('result', function (result) {
      window.handleGeocoderResult(result);
      console.log(result);
    });

    // // Get the geocoder results container.
    // const results = document.getElementById('result');
    
    // // Add geocoder result to container.
    // geocoder.on('result', (e) => {
    // results.innerText = JSON.stringify(e.result, null, 2);
    // });
    
    // // Clear results container when search is cleared.
    // geocoder.on('clear', () => {
    // results.innerText = '';
    // });



    const links = [...document.querySelectorAll(".nav-list a")];
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

export default HeaderMap;


