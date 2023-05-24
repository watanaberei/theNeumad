// Header.js

import { getBlogs } from "../api";

const Header = {
  
  render: () => {
    const newLocal=`<nav class="navigation container nav-top">

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
                <!-- hamburger --> 
                <div class="hamburger"><i class="icon-hamburger"></i></div>
              </div>
              <div class="nav-utility-mid">
                <div class="nav-utility-mid-logo">
                    <!-- logo -->
                    <img src="./_assets/_brand/logo/neumad_logo_text_light.svg" alt="">
                </div>
              </div>
              <div class="nav-utility-right">
                <!-- search -->
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
                    <!--
                    div class="search-container">
                      <div class="search-results">
                        <ul>
                          <li>You can show search results here.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur.</li>
                          <li>Lorem ipsum dolor sit amet, consectetur.</li>
                        </ul>
                      </div>
                    </div>
                    -->
                  </div>
              </div>
            </div>
          </section>




          <section class="nav-mid">
            <div class="nav-mid-left"> 
              <div class="current-date current-data">
                <span class="text01" data-testid="current-date">
                  Friday, April 7, 2023
                </span>
              </div> 
              <div class="current-location current-data">
                <span class="text01" data-testid="current-location">
                  LA, California
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
                <span class="text01" data-testid="current-temp">
                  63°F 
                </span>
              </div>
              <div class="current-location current-data">
                <span class="text01" data-testid="current-location">
                  LA, California
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

                  <li>
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
                  </li>

                  <li>
                    <a href="/#/series">
                      <div class="section-tag" id="Series">
                        <i class="section-tag-icon icon-Series"></i>
                        <span class="section-tag-divider">
                          <div class="lineV"></div>
                        </span>
                        <span class="section-tag-text medium01">
                          Series
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
                          </div>
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
  after_render: () => {
    const navList = document.querySelector(".nav-menu");
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

    const searchToggle = document.querySelector("#search-toggle");
    searchToggle.addEventListener("click", function () {
      const searchInput = document.querySelector("#search");
      const searchIcon = this.querySelector("span");

      searchInput.value = "";
      if (searchIcon.classList.contains("fa-search")) {
        searchInput.focus();
      }

      document.querySelector(".main-search").classList.toggle("active");
      searchIcon.classList.toggle("icon-search");
      searchIcon.classList.toggle("icon-close");
    });



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

export default Header;


