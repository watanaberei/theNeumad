// main.js

const navList = document.querySelector(".nav-list");
const hamburger = document.querySelector(".hamburger");
const header = document.querySelector(".header");
const headerSecondary = document.querySelector(".headerSecondary");

hamburger.addEventListener("click", () => {
  navList.classList.toggle("show");
});

const navHeight = header.getBoundingClientRect().height;
const secondaryNavHeight = headerSecondary.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    header.classList.add("fix");
    headerSecondary.classList.add("fix");
  } else {
    headerSecondary.classList.remove("fix");
  }
});


module.exports = {
  collect: require('@turf/collect'),
  buffer: require('@turf/buffer')
};

