// src/screens/Signup.js
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


const AccountScreen = {
  render: async () => {
    return `
    <!------ SIGNUP SCREEN ------> 
    <div class="main">
      <!------ SIGNUP CONTENT ------> 
      <div class="auth-container account-detail">
          <div class="account-container">
            <!------ HERO ------> 
            <section class="account-hero">
            
                <!---- HEADLINE ----> 
                <div class="account-headline">

                    <!------ SIGNUP HEADER ------>
                    <div class="account-header">

                        <!------ HEADLINE ------>
                        <div class="account-headline">

                        
                          <!--<form action="/account" id="account-form" method="post">-->

                            <fieldset class="step-hide">
                              <div class="title">
                                <span class="header06">
                                    Log in or create an account
                                </span>
                              </div>
                              <div class="form-container">
                                <span class="text02 medium">
                                  Login or sign up
                                </span>
                                <form action="http://localhost:5000/account" id="account-form" method="post">
                                <input type="email" id="email" name="email" placeholder="Email" required>
                                <input type="password" id="password" name="password" placeholder="Password" required>
                                <input type="submit" value="Submit">
                                </form>

                                <a href="/account" class="text02 medium">Make a new account
                                <!--<button type="submit">Login</button>-->
                              </div>
                            </fieldset>

                            
                          <!--</form>-->

                        </div>
                        <!------ HEADLINE ------>

                    </div>
                    <!------ SIGNUP HEADER ------>

                </div>
                <!---- HEADLINE ---->

            </section>
            <!------ HERO ------>

          </div>
      </div>
      <!------ SIGNUP CONTENT ------> 

    </div>
    <!------ SIGNUP SCREEN ------> 
    `;
  },

  after_render: async () => {
    document.getElementById('account-form').addEventListener('submit', async (event) => {
      event.preventDefault();
    
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
    
      const response = await fetch('http://localhost:5000/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
    
      if (response.ok) {
        const data = await response.json();

        if (data.isNewUser) {
          // Redirect to the signup page
          window.location.href = '/signup';
        } else {
          // Redirect to the user page
          window.location.href = '/user';
        }
      } else {
        console.error('Account creation failed');
      }
    });
  }
};
export default AccountScreen;