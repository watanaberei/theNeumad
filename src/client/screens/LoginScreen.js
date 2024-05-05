// src/screens/LoginScreen.js
import mapboxgl from "mapbox-gl";
import { initMap } from "../components/MapApi.js";
import { geojsonStore } from "../components/GeojsonStores.js";
import { createMapMarker } from "../components/MapMarker.js";
import { createGeojsonListing } from "../components/GeojsonListing.js";
import { createGeojsonStoreListing } from "../components/GeojsonStoreListing.js";
import { createGeojsonReviewListing } from "../components/GeojsonReviewListing.js";
import { createGeojsonArticleListing } from "../components/GeojsonArticleListing.js";
import { createGeojsonBlogListing } from "../components/GeojsonBlogListing.js";
import { createGeocoderInput } from "../components/GeocoderInput.js";
import AllBlog from "../components/AllBlog.js";
import storeSelectedLocation from "../components/Header.js";
import mapRoute from "../components/mapRoute.js";
import polyline from '@mapbox/polyline';
import HeaderHome from "../components/HeaderHome.js";
import { createAuth0Client } from '@auth0/auth0-spa-js';



//////////////////////////////// ./src/screens/LoginScreen.js
const LoginScreen = {
  render: async () => {
    return `
    <!------ LOGIN SCREEN ------> 
    <div class="main">
      <!------ LOGIN CONTENT ------> 
      <div class="auth-container signup-detail">
          <div class="signup-container">
            <!------ HERO ------> 
            <section class="signup-hero">
            
                <!---- HEADLINE ----> 
                <div class="signup-headline">

                    <!------ LOGIN HEADER ------>
                    <div class="signup-header">

                        <!------ HEADLINE ------>
                        <div class="signup-headline">
                            <span class="header06">
                              Log in
                            </span>
                        </div>
                        
                        <form id="login-form">
                          <input type="email" id="email" placeholder="Email" required />
                          <input type="password" id="password" placeholder="Password" required />
                          <button type="submit">Login</button>
                        </form>
                        <!-- ... existing code ... -->
                        <a href="/signup" class="text02 medium">Make a new account</a>
                        <!------ HEADLINE ------>

                    </div>
                    <!------ LOGIN HEADER ------>

                </div>
                <!---- HEADLINE ---->

            </section>
            <!------ HERO ------>

          </div>
      </div>
      <!------ LOGIN CONTENT ------> 

    </div>
    <!------ LOGIN SCREEN ------> 
    `;
  },

  after_render: async () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
    // });
    // const login = async () => {
    //   const email = document.getElementById('email').value;
    //   const password = document.getElementById('password').value;
    
    //   const response = await fetch('http://localhost:4000/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email, password })
    //   });

      if (response.ok) {
        const data = await response.json();
    
        // Store the access token and refresh token in localStorage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
    
        // Redirect to the user page
        window.location.href = '/user';
      } else {
        // Handle error
        console.error('Login failed');
      }
    });

    // Call the login function
    // login();
  }
};

export default LoginScreen;


// const loginForm = document.getElementById('login-form');
//     loginForm.addEventListener('submit', async (e) => {
//       e.preventDefault();

//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;

//       const response = await fetch('http://localhost:4000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();
//       if (response.ok) {
        
//         // Handle successful login
//     // Store the access token and refresh token in localStorage
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);

//     // Redirect to the user page
//     window.location.href = '/user';
//       } else {
//         // Handle error
//         console.error(data);
//       }
//     });
//   }