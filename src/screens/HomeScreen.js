// HomeScreen.js
import { getStoresNeumadsReview, getArticleNeumadsTrail, getAllBlogs } from "../api.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import AllBlog from "../components/AllBlog.js";

const HomeScreen = {
  render: async () => {
    const articleNeumadsTrailData = await getArticleNeumadsTrail();
    const storesNeumadsReviewData = await getStoresNeumadsReview();
    const articleData = await getArticleNeumadsTrail(9, 0);
    const storeData = await getStoresNeumadsReview(9, 0);
    const allBlogData = [...articleData, ...storeData];
    
    // console.log("getAllBlogsData", getBlogData);
    // console.log("getBlogData", getBlogData);
    // console.log("getBlogsData", getBlogsData);

    const primaryFeaturedBlogDatas = allBlogData;
    const featuredBlogDatas = allBlogData;
    const allBlogDatas = allBlogData;

    console.log(`primaryFeaturedBlogDatas`, primaryFeaturedBlogDatas);
    console.log(`featuredBlogDatas`, featuredBlogDatas);
    console.log(`getBlogData`, allBlogDatas);

    const articlePrimaryBlogNeumadsItems = primaryFeaturedBlogDatas
      .filter((primaryFeaturedBlogData) => primaryFeaturedBlogData.featured)
      .slice(0, 1)
      .concat(
        primaryFeaturedBlogDatas.filter(
          (primaryFeaturedBlogData) => !primaryFeaturedBlogData.featured
        )
      );

    const articleFeaturedBlogNeumadsItems = featuredBlogDatas
      .filter((featuredBlogData) => featuredBlogData.featured)
      .slice(0, 1)
      .concat(
        featuredBlogDatas.filter(
          (featuredBlogData) => !featuredBlogData.featured
        )
      );


    const primaryFeaturedBlogs = allBlogDatas.slice(1).slice(-1);
    const featuredBlogs = allBlogDatas.slice(1).slice(-3);
    const allBlogs = allBlogDatas.slice(3);

    return `
      <div>
        <div class="featured-blog-layout container" id="featured-blog-layout">
          ${primaryFeaturedBlogs.map((primaryFeaturedBlog) => `${PrimaryFeaturedBlog.render(primaryFeaturedBlog)}`).join("\n")}
  
          ${featuredBlogs
            .map((featuredBlog) => FeaturedBlog.render(featuredBlog))
            .join("\n")}
        </div>
        <div class="section-header container" id="section-header">
          <div class="work-title">
            <span class="display03">
              Other Neumadic Articles
            </span>
          </div>
        </div>
        <div class="blog-layout container" id="blog-layout">
 
          ${allBlogs
            .map((allBlog) => AllBlog.render(allBlog))
            .join("\n")}

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
      const data = blogs
        .map((blog) => FeaturedBlog.render(blog))
        .join("\n");
      template.insertAdjacentHTML("beforeend", data);
      if (blogs.length === 0) {
        btn.disabled = true;
        btn.innerText = "No more blogs";
      }
    }
  },
};

export default HomeScreen;

















// import { getStoresNeumadsReview, getArticleNeumadsTrail, getAllBlogs } from "../api.js";
// import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
// import FeaturedBlog from "../components/FeaturedBlog";
// import AllBlogs from "../components/AllBlogs.js";

// const HomeScreen = {
//   render: async () => {
//     const articleNeumadsTrailData = await getArticleNeumadsTrail();
//     const storesNeumadsReviewData = await getStoresNeumadsReview();
//     const articleData = await getArticleNeumadsTrail(9, 0);
//     const storeData = await getStoresNeumadsReview(9, 0);
//     const getAllBlogData = [...articleData, ...storeData];
    
//     // console.log("getAllBlogsData", getBlogData);
//     // console.log("getBlogData", getBlogData);
//     // console.log("getBlogsData", getBlogsData);

//     const primaryFeaturedBlogDatas = articleNeumadsTrailData;
//     const featuredBlogDatas = storesNeumadsReviewData;
//     const getAllBlogDatas = getAllBlogData;

//     console.log(`primaryFeaturedBlogDatas`, primaryFeaturedBlogDatas);
//     console.log(`featuredBlogDatas`, featuredBlogDatas);
//     console.log(`getBlogData`, getAllBlogDatas);

//     const articlePrimaryBlogNeumadsItems = primaryFeaturedBlogDatas
//       .filter((primaryFeaturedBlogData) => primaryFeaturedBlogData.featured)
//       .slice(0, 1)
//       .concat(
//         primaryFeaturedBlogDatas.filter(
//           (primaryFeaturedBlogData) => !primaryFeaturedBlogData.featured
//         )
//       );

//     const articleFeaturedBlogNeumadsItems = featuredBlogDatas
//       .filter((featuredBlogData) => featuredBlogData.featured)
//       .slice(1, 3)
//       .concat(
//         featuredBlogDatas.filter(
//           (featuredBlogData) => !featuredBlogData.featured
//         )
//       );

//     const getAllBlogItems = getAllBlogDatas
//       .filter((getAllBlogData) => getAllBlogData.featured)
//       .slice(-2)
//       .concat(
//         getAllBlogDatas.filter(
//           (getAllBlogData) => !getAllBlogData.featured
//         )
//       );

//     const primaryFeaturedBlogs = articlePrimaryBlogNeumadsItems.slice(0).slice(-1);
//     const featuredBlogs = articleFeaturedBlogNeumadsItems.slice(-1).slice(-3);
//     const allBlogs = getAllBlogItems.slice(-2);

//     return `
//       <div>
//         <div class="featured-blog-layout container" id="featured-blog-layout">
//           ${primaryFeaturedBlogs.map((primaryFeaturedBlog) => `${PrimaryFeaturedBlog.render(primaryFeaturedBlog)}`).join("\n")}
  
//           ${featuredBlogs
//             .map((featuredBlog) => FeaturedBlog.render(featuredBlog))
//             .join("\n")}
//         </div>
//         <div class="section-header container" id="section-header">
//           <div class="work-title">
//             <span class="display03">
//               Other Neumadic Articles
//             </span>
//           </div>
//         </div>
//         <div class="blog-layout container" id="blog-layout">
 
//           ${allBlogs
//             .map((allBlog) => AllBlogs.render(allBlog))
//             .join("\n")}

//         </div>
//         <div class="load-btn">
//           <button class="load" id="load">Load more</button>
//         </div>
//       </div>
//     `;
//   },
  
//   after_render: () => {
//     const btn = document.getElementById("load");
//     let index = 0;
//     btn.addEventListener("click", loadData);

//     async function loadData() {
//       // Fetch more blogs using the same getArticleNeumadsTrail function
//       const blogs = await getArticleNeumadsTrail(3, 3 * ++index + 1);
//       let template = document.getElementById("blog-layout");
//       const data = blogs
//         .map((blog) => FeaturedBlog.render(blog))
//         .join("\n");
//       template.insertAdjacentHTML("beforeend", data);
//       if (blogs.length === 0) {
//         btn.disabled = true;
//         btn.innerText = "No more blogs";
//       }
//     }
//   },
// };

// export default HomeScreen;