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
import HeaderHome from "../components/HeaderHome";
import { createAuth0Client } from '@auth0/auth0-spa-js';

let auth0Client;

async function initAuth0() {
  console.log('Inside initAuth0 function...');
  try {
    console.log('Creating Auth0 client...');
    auth0Client = await createAuth0Client({
      domain: 'dev-6rixmw8fmaozoez8.us.auth0.com',
      client_id: 'auAhXeiV7MIcFDR5cMBjV9TK95YMeaVG',
      client_secret: '5t9vScczdsoOnhPxb9TuUcTUFjkzfCrs22PB9Rp6FqxHMz8s5FUJTn18OPPAgH5o',
      redirect_uri: 'https://www.theneumad.com',
      audience: 'https://www.theneumad.com',
      scope: 'openid profile email',
      responseType: 'token id_token',
      prompt: 'none'
    });
    console.log('Auth0 client created.');
  } catch (err) {
    console.error('Error creating Auth0 client:', err);
  }
}

initAuth0();

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
                        
                        <form action="/ " method="post" id="login-form">
                            <input type="email" id="email" name="email" placeholder="Email" required>
                            <input type="password" id="password" name="password" placeholder="Password" required>
                            <button type="submit">Login</button>
                        </form>
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
      console.log('Form submitted with the following data:');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      try {
        // Ensure auth0Client is defined before calling loginWithRedirect
        if (!auth0Client) {
          console.log('Initializing Auth0 client...');
          await initAuth0();
          console.log('Auth0 client initialized.');
        }
        console.log('Redirecting to Auth0 login...');
        await auth0Client.loginWithRedirect({
          redirect_uri: 'http://localhost:3000/callback',
          appState: { targetUrl: window.location.href }
        });
        console.log('Redirected to Auth0 login.');
      } catch (err) {
        console.error('An error occurred:', err);
      }
    });
  }
};
export default LoginScreen;