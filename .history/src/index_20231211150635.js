// src/index.js
import { getArticleNeumadsTrail } from "./api.js";
import "./components/Style.js";  // Importing CSS from style.js
import Header from "./components/Header";
import HeaderSecondary from "./components/HeaderSecondary";
import HeaderArticle from "./components/HeaderArticle";
import HeaderStore from "./components/HeaderStore";
import HeaderReview from "./components/HeaderReview";
import HeaderWork from "./components/HeaderWork";
import HeaderHome from "./components/HeaderHome";
import HeaderUnwind from "./components/HeaderUnwind";
import HeaderShorts from "./components/HeaderShorts";
import HeaderSeries from "./components/HeaderSeries";
import HeaderDine from "./components/HeaderDine";
import HeaderMap from "./components/HeaderMap";
import HeaderReviews from "./components/HeaderReviews";
import HomeScreen from "./screens/HomeScreen.js";
import WorkScreen from "./screens/WorkScreen.js";
import UnwindScreen from "./screens/UnwindScreen.js";
import DineScreen from "./screens/DineScreen.js";
import SignupScreen from "./screens/SignupScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import BlogScreen from "./screens/BlogScreen.js";
import ArticleScreen from "./screens/ArticleScreen.js";
import StoreScreen from "./screens/StoreScreen.js";
import ShortsScreen from "./screens/ShortsScreen.js";
import SeriesScreen from "./screens/SeriesScreen.js";
import AboutScreen from "./screens/AboutScreen.js";
import ContactScreen from "./screens/ContactScreen.js";
import MapScreen from "./screens/MapScreen.js";
import ReviewScreen from "./screens/ReviewScreen.js";
import Error404Page from "./screens/Error404Page.js";
import { parseRequestUrl, showLoading, hideLoading } from "./utils.js";

console.log('Imported Header:', Header);


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

const router = async () => {
  const request = parseRequestUrl();
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
  } else if (parseUrl === "/signup") {
    header.innerHTML = await HeaderSecondary.render();
    await HeaderSecondary.after_render();
  } else if (parseUrl === "/login") {
    header.innerHTML = await HeaderSecondary.render();
    await HeaderSecondary.after_render();
  } else if (parseUrl === "/map") {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  } else {
    header.innerHTML = await HeaderHome.render();
    await HeaderHome.after_render();
  }
  const main = document.getElementById("content");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
};

window.addEventListener("hashchange", router);

// The load event listener has been removed
document.addEventListener('DOMContentLoaded', router);