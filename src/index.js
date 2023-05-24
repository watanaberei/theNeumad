// index.js

import Header from "./components/Header";
import HeaderSecondary from "./components/HeaderSecondary";
import HeaderWork from "./components/HeaderWork";
import HeaderUnwind from "./components/HeaderUnwind";
import HeaderShorts from "./components/HeaderShorts";
import HeaderSeries from"./components/Header";
import HeaderDine from "./components/HeaderDine";
import HomeScreen from "./screens/HomeScreen.js";
import WorkScreen from "./screens/WorkScreen.js";
import UnwindScreen from "./screens/UnwindScreen.js";
import DineScreen from "./screens/DineScreen.js";
import DetailsScreen from "./screens/DetailsScreen.js";
import ArticleScreen from "./screens/ArticleScreen.js";
import ShortsScreen from "./screens/ShortsScreen.js";
import SeriesScreen from "./screens/SeriesScreen.js";
import AboutScreen from "./screens/AboutScreen.js";
import ContactScreen from "./screens/ContactScreen.js";
import Error404Page from "./screens/Error404Page.js";

// import { parseRequestUrl, showLoading, hideLoading } from "./utils.js";
import { parseRequestUrl } from "./utils.js";

const routes = {
  "/": HomeScreen,
  "/work": WorkScreen,
  "/unwind": UnwindScreen,
  "/dine": DineScreen,
  "/shorts": ShortsScreen,
  "/blogs/:slug": DetailsScreen,
  "/article/:slug" :  ArticleScreen,
  "/about": AboutScreen,
  "/contact": ContactScreen,
  "/series" :  SeriesScreen,
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
    header.innerHTML = await HeaderWork.render();
    await HeaderWork.after_render();
  } else if (parseUrl === "/blogs/:slug") {
    header.innerHTML = await HeaderSecondary.render();
    await HeaderSecondary.after_render();
  } else if (parseUrl === "/unwind") {
    header.innerHTML = await HeaderUnwind.render();
    await HeaderUnwind.after_render();
  } else if (parseUrl === "/dine") {
    header.innerHTML = await HeaderDine.render();
    await HeaderDine.after_render();
  } else if (parseUrl === "/shorts") {
    header.innerHTML = await HeaderShorts.render();
    await HeaderShorts.after_render();
  } else if (parseUrl === "/series/:slug") {
    header.innerHTML = await HeaderSecondary.render();
    await HeaderSeries.after_render();
  } else {
    header.innerHTML = await Header.render();
    await Header.after_render();
  }

  const main = document.getElementById("content");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
};


window.addEventListener("load", router);
window.addEventListener("hashchange", router);









// const router = async () => {
//   // showLoading();
//   const request = parseRequestUrl();
//   const parseUrl =
//     (request.resource ? `/${request.resource}` : "/") +
//     (request.slug ? "/:slug" : "") +
//     (request.verb ? `/${request.verb}` : "");
//   const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;
//   const header = document.getElementById("header");
//   header.innerHTML = await Header.render();
//   await Header.after_render();
//   const main = document.getElementById("content");
//   main.innerHTML = await screen.render();
//   if (screen.after_render) await screen.after_render();
//   // hideLoading();
// };
//
// window.addEventListener("load", router);
// window.addEventListener("hashchange", router);