// HomeScreen.js 052623
import { getArticleNeumadsTrail } from "../api.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import NonFeaturedBlog from '../components/NonFeaturedBlog.js';


const HomeScreen = {
  render: async () => {
    // const articlesPrimary = await getArticleNeumadsTrail();
    // const articlesSecondary = await getArticleNeumadsTrail();
    // const articlesBlogs = await getArticleNeumadsTrail();

    // Filter the articles for the required components
    // const primaryFeaturedBlog = articlesPrimary.find((articlesPrimary) => articlesPrimary.featured && articlesPrimary.index === 0);
    // const secondaryFeaturedBlogs = articlesSecondary.filter((articlesSecondary) => articlesSecondary.featured && articlesSecondary.index > 0 && articlesSecondary.index < 4);
    const blogs = await getArticleNeumadsTrail();
    const featuredBlogs = await getArticleNeumadsTrail();
    const primaryFeaturedBlogs = await getArticleNeumadsTrail();
    const articleNeumadsTrail = await getArticleNeumadsTrail();

    console.log("getBlogs:", blogs);
    console.log("getFeaturedBlog:", featuredBlogs);
    console.log("getPrimaryFeaturedBlog:", primaryFeaturedBlogs);
    console.log("getArticleNeumadsTrail:", articleNeumadsTrail);

    const nonFeaturedBlogsResponse = await getArticleNeumadsTrail();
    

    console.log('getNonFeaturedBlog JSON:', nonFeaturedBlogsResponse);
    
    // console.log("primaryFeaturedBlog:" + primaryFeaturedBlog);
    // console.log("secondaryFeaturedBlogs:" + primaryFeaturedBlog);
    // console.log("visibleBlogs:" + visibleBlogs);
    // Check if the necessary data is available
    // const appFastFoodItems = nonFeaturedBlogsResponse?.appFastFoodHomePage031523Collection?.items || [];
    const articleBlogNeumadsItems = nonFeaturedBlogsResponse?.articleNeumadsTrailCollection?.items || [];
   

    // Generate the HTML content for primaryFeaturedBlogHTML
// const primaryFeaturedBlogHTML = primaryFeaturedBlog.map((primaryFeaturedBlog) => `${PrimaryFeaturedBlog.render(primaryFeaturedBlog)}`).join("\n");


// // Generate the HTML content for secondaryFeaturedBlogsHTML
// // const secondaryFeaturedBlogsHTML = secondaryFeaturedBlogs.map(blog => FeaturedBlog(blog)).join('');
// const secondaryFeaturedBlogsHTML = secondaryFeaturedBlogs.map(blog => NonFeaturedBlog(blog)).join('');


// // Render the HTML content
// const visibleBlogsHTML = visibleBlogs.map(blog => NonFeaturedBlog(blog)).join('');





    return `
      <div>
        <div class="featured-blog-layout container" id="featured-blog-layout">
        primary
        
        ${primaryFeaturedBlogs.map((primaryFeaturedBlog) => `${PrimaryFeaturedBlog.render(primaryFeaturedBlog)}`).join("\n")}
        secondary
        ${featuredBlogs.map((featuredBlog) => `${FeaturedBlog.render(featuredBlog)}`).join("\n")}
          
   
        </div>
        <div class="section-header container" id="section-header">
          <div class="work-title">
            <span class="display03">
              Other Neumadic Articles
            </span>
          </div>
        </div>
        <div class="blog-layout container" id="blog-layout">
        ${articleBlogNeumadsItems.map((blog) => NonFeaturedBlog.render(blog)).join("\n")}
        </div>
        <div class="load-btn">
          <button class="load" id="load">Load more</button>
        </div>
      </div>
    `;
  },
  after_render: () => {
    const btn = document.getElementById("load");
    let index = 0;
    btn.addEventListener("click", loadData);

    async function loadData() {
      // Fetch more blogs using the same getArticleNeumadsTrail function
      const blogs = await getArticleNeumadsTrail(3, 3 * ++index + 1);
      let template = document.getElementById("blog-layout");
      const data = blogs.map((blog) => FeaturedBlog.render(blog)).join("\n");
      template.insertAdjacentHTML("beforeend", data);
      if (blogs.length === 0) {
        btn.disabled = true;
        btn.innerText = "No more blogs";
      }
    }
  },
};

export default HomeScreen;























import { getBlogs, getNonFeaturedBlog, getFeaturedBlog, getArticleNeumadsTrail, getPrimaryFeaturedBlog } from "../api.js";
import Blog from "../components/Blog.js";
import NonFeaturedBlog from "../components/NonFeaturedBlog.js";
import FeaturedBlog from "../components/FeaturedBlog.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog.js";
import ArticleNeumadsTrail from "../components/ArticleNeumadsTrail";

const HomeScreen = {
  render: async () => {
    const blogs = await getBlogs();
    const featuredBlogs = await getFeaturedBlog();
    const primaryFeaturedBlogs = await getPrimaryFeaturedBlog();
    const articleNeumadsTrail = await getArticleNeumadsTrail();

    console.log("getBlogs:", blogs);
    console.log("getFeaturedBlog:", featuredBlogs);
    console.log("getPrimaryFeaturedBlog:", primaryFeaturedBlogs);
    console.log("getArticleNeumadsTrail:", articleNeumadsTrail);

    const nonFeaturedBlogsResponse = await getNonFeaturedBlog();

    console.log('getNonFeaturedBlog JSON:', nonFeaturedBlogsResponse);

    // Check if the necessary data is available
    const appFastFoodItems = nonFeaturedBlogsResponse?.appFastFoodHomePage031523Collection?.items || [];
    const articleNeumadsItems = nonFeaturedBlogsResponse?.articleNeumadsTrailCollection?.items || [];

    return `<div>
      <div class="featured-blog-layout container" id="featured-blog-layout">
        ${primaryFeaturedBlogs.map((primaryFeaturedBlog) => `${PrimaryFeaturedBlog.render(primaryFeaturedBlog)}`).join("\n")}
        ${featuredBlogs.map((featuredBlog) => `${FeaturedBlog.render(featuredBlog)}`).join("\n")}
      </div>
      
      <div>
        <div class="section-header container" id="section-header">
          <div class="work-title">
            <span class="display03">
              Other Neumadic Articles
            </span>
          </div>
        </div>
        <div class="blog-layout container" id="blog-layout">
          ${appFastFoodItems.map((item) => NonFeaturedBlog.render(item)).join("\n")}
          ${articleNeumadsItems.map((item) => NonFeaturedBlog.render(item)).join("\n")}
        </div>
  
        <div class="load-btn"><button class="load" id="load">Load more</button></div>
      </div>
    </div>`;
  },
  after_render: () => {
    const btn = document.getElementById("load");
    let index = 0;
    btn.addEventListener("click", loadData);

    async function loadData() {
      const blogs = await getBlogs(3, 3 * ++index + 1);
      let template = document.getElementById("blog-layout");
      const data = blogs.map((blog) => Blog.render(blog)).join("\n");
      template.insertAdjacentHTML("beforeend", data);
      if (blogs.length === 0) {
        btn.disabled = true;
        btn.innerText = "no more blogs";
      }
    }
  },
};

export default HomeScreen;
