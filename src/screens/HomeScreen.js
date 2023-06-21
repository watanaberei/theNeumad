// src/Screens/HomeScreen.js
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost } from "../api.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import AllBlog from "../components/AllBlog.js";
import { sortByDistance } from '../utils';
import { createGeojsonListing } from '../components/GeojsonListing';


    
const HomeScreen = {
render: async () => {
    const articleData = await getArticleNeumadsTrail(9, 0);
    const storeData = await getStoresNeumadsReview(9, 0);
    const postData = await getArticlePost(9, 0);
    // console.log("articleData", articleData);
    // console.log("storeData", storeData);
    // console.log("postData", postData);
    const BlogData = [...articleData, ...storeData, ...postData];  
    

    
    // console.log("getAllBlogsData", getBlogData);
    // console.log("getBlogData", getBlogData);
    // console.log("getBlogsData", getBlogsData);
    
    const primaryFeaturedBlogDatas = BlogData;
    const featuredBlogDatas = BlogData;
    const allBlogDatas = BlogData;
    const allGeojsonStores = BlogData;

    // console.log(`primaryFeaturedBlogDatas`, primaryFeaturedBlogDatas);
    // console.log(`featuredBlogDatas`, featuredBlogDatas);
    // console.log(`getBlogData`, allBlogDatas);

    // console.log("BlogData", BlogData.slice(0,1));
    const primaryFeaturedBlogs = BlogData.slice(0,1);
    const featuredBlogs = BlogData.slice(2,5);
    const allBlogs = BlogData.slice(3);
    
    // const createListing = (store) => {
    //   const onClick = () => {}; // Define the onClick behavior if needed

    //   // Convert the blog data into the expected format for createGeojsonListing
    //   const geojsonStore = {
    //     type: 'Feature',
    //     properties: store,
    //     geometry: {
    //       type: 'Point',
    //       coordinates: store.coordinates || [0, 0], // Provide default coordinates if not available
    //     },
    //   };
    const selectedLocation = JSON.parse(localStorage.getItem('selectedLocation') || 'null');
    const sortedBlogData = sortByDistance(selectedLocation, BlogData);
  
    const createListing = (store) => {
      const onClick = () => {}; // Define the onClick behavior if needed
      return createGeojsonListing(store, onClick).outerHTML;
    };  
  
    const geojsonListings = sortedBlogData.slice(0, 3).map(createListing).join('\n');

    //   return createGeojsonListing(geojsonStore, onClick).outerHTML;
    // };

    // const geojsonListings = allBlogs.slice(0, -3).map(createListing).join('\n');

    return `
    <div>
      <div class="geojson-listings container" id="geojson-listings">
        ${geojsonListings}
      </div>
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