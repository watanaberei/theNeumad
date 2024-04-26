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
import HeaderHome from "../components/HeaderHome";
import { createAuth0Client } from '@auth0/auth0-spa-js';


const SignupScreen = {
  render: async () => {
    return `
    <!------ SIGNUP SCREEN ------> 
    <div class="main">
      <!------ SIGNUP CONTENT ------> 
      <div class="auth-container signup-detail">
          <div class="signup-container">
            <!------ HERO ------> 
            <section class="signup-hero">
            
                <!---- HEADLINE ----> 
                <div class="signup-headline">

                    <!------ SIGNUP HEADER ------>
                    <div class="signup-header">

                        <!------ HEADLINE ------>
                        <div class="signup-headline">

                        
                          <!--<form action="/signup" id="signup-form" method="post">-->

                            <fieldset class="step-hide">
                              <div class="title">
                                <span class="header06">
                                  Welcome Neumad
                                </span>
                              </div>
                              <div class="form-container">
                                <span class="text02 medium">
                                  Login or sign up
                                </span>
                                <form action="/signup" id="signup-form" method="post">
                                  <input email type="email" id="email" name="email" placeholder="Email" required>
                                  <input password type="password" id="password" name="password" placeholder="Password" required>
                                  <input submit type="submit">
                                </form>

                                <a href="/signup" class="text02 medium">Make a new account
                                <!--<button type="submit">Login</button>-->
                              </div>
                            </fieldset>

                            
                            <!--
                            <fieldset class="step-hide">
                              <div class="title">
                                <span class="header06">
                                  Finish singing up
                                </span>
                              </div>
                              <div class="container form">
                                <span class="text02 medium>
                                  Name
                                </span>
                                <input type="text" id="firstName" placeholder="First Name" required />
                                <input type="text" id="lastName" placeholder="Last Name" required /> 
                              </div>
                              <div class="container form">
                                <span class="text02 medium>
                                  Birthdate
                                </span>
                                <input type="date" name="birthdate" id="birthdate" required />
                              </div>
                              <div class="container form">
                                <span class="text02 medium>
                                  Confirm email
                                </span>
                                <input type="email" id="email" placeholder="Confirm Email" required />
                              </div>
                             </fieldset>
                            -->
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
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful signup (e.g., show a success message, redirect to login page, etc.)
      } else {
        // Handle error (e.g., show an error message)
        console.error(data);
      }
    });
  }
};
export default SignupScreen;