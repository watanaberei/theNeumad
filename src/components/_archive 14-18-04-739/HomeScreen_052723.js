// HomeScreen.js 
import { getArticleNeumadsTrail } from "../api.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import NonFeaturedBlog from "../components/NonFeaturedBlog.js";

const HomeScreen = {
  render: async () => {
    const blogs = await getArticleNeumadsTrail();
    const featuredBlogs = await getArticleNeumadsTrail();
    const primaryFeaturedBlogDatas = await getArticleNeumadsTrail();
    const articleNeumadsTrail = await getArticleNeumadsTrail();

    const nonFeaturedBlogsResponse = await getArticleNeumadsTrail();

    const articleBlogNeumadsItems = [
      ...primaryFeaturedBlogDatas
        .filter((primaryFeaturedBlogData) => primaryFeaturedBlogData.featured)
        .slice(0, 1), // Limit the number of featured posts to render to 1 (latest post)
      ...primaryFeaturedBlogDatas.filter(
        (primaryFeaturedBlogData) => !primaryFeaturedBlogData.featured
      ),
    ];
    
    console.log('articleBlogNeumadsItems:', articleBlogNeumadsItems);
    const primaryFeaturedBlogs = articleBlogNeumadsItems.slice(0).slice(-1);
    console.log('primaryFeaturedBlogs:', primaryFeaturedBlogs);
    
    return `
      <div>
        <div class="featured-blog-layout container" id="featured-blog-layout">
          primary
          ${primaryFeaturedBlogs.map((primaryFeaturedBlog) => `${PrimaryFeaturedBlog.render(primaryFeaturedBlog)}`).join("\n")}
          
          secondary
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
          ${blogs.map((blog) => NonFeaturedBlog.render(blog)).join("\n")}
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




























// // HomeScreen.js
// import { getArticleNeumadsTrail } from "../api.js";
// import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
// import FeaturedBlog from "../components/FeaturedBlog";
// import NonFeaturedBlog from '../components/NonFeaturedBlog.js';


// const HomeScreen = {
//   render: async () => {
    
//     const blogs = await getArticleNeumadsTrail();
//     const featuredBlogs = await getArticleNeumadsTrail();
//     const primaryFeaturedBlogDatas = await getArticleNeumadsTrail();
//     const articleNeumadsTrail = await getArticleNeumadsTrail();

//     const nonFeaturedBlogsResponse = await getArticleNeumadsTrail();
    

    


//     const articleBlogNeumadsItems = [...primaryFeaturedBlogDatas.filter((primaryFeaturedBlogData) => primaryFeaturedBlogData.featured), ...primaryFeaturedBlogDatas.filter((primaryFeaturedBlogData) => !primaryFeaturedBlogData.featured)]
//     console.log('articleBlogNeumadsItems:', articleBlogNeumadsItems);
//     const primaryFeaturedBlogs = articleBlogNeumadsItems[0];
//     console.log('primaryFeaturedBlogs:', primaryFeaturedBlogs);
    
    
//     return `
//       <div>
//         <div class="featured-blog-layout container" id="featured-blog-layout">
//         primary
//         ${primaryFeaturedBlogs
//           .map((primaryFeaturedBlog) =>
//             PrimaryFeaturedBlog.render(primaryFeaturedBlog)
//           )
//           .join("\n")}

        
//         secondary
//         ${featuredBlogs.map((featuredBlog) => `${FeaturedBlog.render(featuredBlog)}`).join("\n")}
   
//         </div>
//         <div class="section-header container" id="section-header">
//           <div class="work-title">
//             <span class="display03">
//               Other Neumadic Articles
//             </span>
//           </div>
//         </div>
//         <div class="blog-layout container" id="blog-layout">
//         ${blogs.map((blog) => `${NonFeaturedBlog.render(blog)}`).join("\n")}
        
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
//       const data = blogs.map((blog) => FeaturedBlog.render(blog)).join("\n");
//       template.insertAdjacentHTML("beforeend", data);
//       if (blogs.length === 0) {
//         btn.disabled = true;
//         btn.innerText = "No more blogs";
//       }
//     }
//   },
// };

// export default HomeScreen;