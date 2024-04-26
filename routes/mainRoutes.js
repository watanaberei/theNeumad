// routes/mainRoutes.js
import { getArticleNeumadsTrail } from "../api.js";
import "../src/components/Style.js";   
import * as Components from '../src/components/Components.js';
import HeaderSecondary from "../src/components/HeaderSecondary.js";
import HeaderArticle from "../src/components/HeaderArticle.js";
import HeaderStore from "../src/components/HeaderStore.js";
import HeaderReview from "../src/components/HeaderReview.js";
import HeaderWork from "../src/components/HeaderWork.js";
import HeaderHome from "../src/components/HeaderHome.js";
import HeaderUnwind from "../src/components/HeaderUnwind.js";
import HeaderShorts from "../src/components/HeaderShorts.js";
import HeaderSeries from "../src/components/HeaderSeries.js";
import HeaderDine from "../src/components/HeaderDine.js";
import HeaderMap from "../src/components/HeaderMap.js";
import HeaderReviews from "../src/components/HeaderReviews.js";
import HomeScreen from "../src/screens/HomeScreen.js";
import WorkScreen from "../src/screens/WorkScreen.js";
import UnwindScreen from "../src/screens/UnwindScreen.js";
import DineScreen from "../src/screens/DineScreen.js";
import SignupScreen from "../src/screens/SignupScreen.js";
import LoginScreen from "../src/screens/LoginScreen.js";
import BlogScreen from "../src/screens/BlogScreen.js";
import ArticleScreen from "../src/screens/ArticleScreen.js";
import StoreScreen from "../src/screens/StoreScreen.js";
import ShortsScreen from "../src/screens/ShortsScreen.js";
import SeriesScreen from "../src/screens/SeriesScreen.js";
import AboutScreen from "../src/screens/AboutScreen.js";
import ContactScreen from "../src/screens/ContactScreen.js";
import MapScreen from "../src/screens/MapScreen.js";
import ReviewScreen from "../src/screens/ReviewScreen.js";
import Error404Page from "../src/screens/Error404Page.js";
import { parseRequestUrl, showLoading, hideLoading } from "../src/utils.js";
import { createAuth0Client } from '@auth0/auth0-spa-js';
// import "./mongodb.js";
// import "./setupProxy.js";

/// Enable CORS
const routes = {
  "/": HomeScreen,
  "/work": WorkScreen,
  "/unwind": UnwindScreen,
  "/dine": DineScreen,
  "/signup": SignupScreen,
  "/login": LoginScreen,
  "/shorts": ShortsScreen,
  "/blogs/:slug": BlogScreen,
  "/stores/:slug": StoreScreen,
  "/articles/:slug": ArticleScreen,
  "/reviews/:slug": ReviewScreen,
  "/about": AboutScreen,
  "/contact": ContactScreen,
  "/map": MapScreen,
};




// Update the router function to use the window's pathname
const router = async () => {
  const request = parseRequestUrl(window.location.pathname); // Use the pathname without hash
  const path = request.resource || '/';
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.slug ? "/:slug" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;
  const header = document.getElementById("header");
  if (parseUrl === "/work") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else if (parseUrl === "/blogs/:slug") {
    header.innerHTML = await HeaderSecondary.render();
    await HeaderSecondary.after_render();
  } else if (parseUrl === "/stores/:slug") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else if (parseUrl === "/reviews/:slug") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else if (parseUrl === "/articles/:slug") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else if (parseUrl === "/unwind") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else if (parseUrl === "/dine") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else if (parseUrl === "/shorts") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  // } else if (parseUrl === "/signup") {
  //   header.innerHTML = await HeaderSecondary.render();
  //   await HeaderSecondary.after_render();
  // } else if (parseUrl === "/login") {
  //   header.innerHTML = await HeaderSecondary.render();
  //   await HeaderSecondary.after_render();
  } else if (parseUrl === "/map") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  }
// Catch errors since some browsers throw when using the new `type` option.
// https://bugs.webkit.org/show_bug.cgi?id=209216
try {
  // Mark the start of some operation
  performance.mark('startOperation');

  const main = document.getElementById("content");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();

  // Mark the end of the operation
  performance.mark('endOperation');

  // Measure the duration of the operation
  performance.measure('operation', 'startOperation', 'endOperation');

  const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Log the entry and all associated details.
      console.log(entry.toJSON());
    }
  });

  // Observe the 'measure' entries
  po.observe({type: 'measure'});
} catch (e) {
    // Do nothing if the browser doesn't support this API.
  }
  const main = document.getElementById("content");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();

};
// The load event listener has been removed
document.addEventListener('DOMContentLoaded', () => {
  router();
  window.addEventListener('popstate', router);
});

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });
  router();
});

// The load event listener has been removed
document.addEventListener('DOMContentLoaded', router);