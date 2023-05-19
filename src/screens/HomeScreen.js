// HomeScreen.js
import { getBlogs, getNonFeaturedBlog, getFeaturedBlog, getPrimaryFeaturedBlog } from "../api.js";

import Blog from "../components/Blog.js";
import NonFeaturedBlog from "../components/NonFeaturedBlog.js";
import FeaturedBlog from "../components/FeaturedBlog.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog.js";

const HomeScreen = {
  render: async () => {
    const blogs = await getBlogs();
    const nonFeaturedBlogs = await getNonFeaturedBlog();
    const featuredBlogs = await getFeaturedBlog();
    const primaryFeaturedBlogs = await getPrimaryFeaturedBlog();

    console.log("getBlogs:" + blogs);
    console.log("getNonFeaturedBlog:" + nonFeaturedBlogs);
    console.log("getFeaturedBlog:" + featuredBlogs);
    console.log("getPrimaryFeaturedBlog:" + primaryFeaturedBlogs);

    return `<div>
    
    <div class="section-header container" id="section-header">
        <div class="work-title">
            <span class="display03">
                Neumadic Reads
            </span>
        </div>
    </div>
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
      ${nonFeaturedBlogs.map((nonFeaturedBlog) => `${NonFeaturedBlog.render(nonFeaturedBlog)}`).join("\n")}
    </div>

    <div class="load-btn"><button class="load" id="load">Load more</button></div>
    </div>`;
  },
  after_render: () => {
    const btn = document.getElementById("load");
    let index = 0;
    btn.addEventListener("click", loadData);

    async function loadData() {
      const blogs = await getBlogs(3, 3 * ++index + 1);
      let template = document.getElementById("blog-layout");
      const data = blogs
        .map(function (blog) {
          return Blog.render(blog);
        })
        .join("\n");
      template.insertAdjacentHTML("beforeend", data);
      if (blogs.length === 0) {
        btn.disabled = true;
        btn.innerText = "no more blogs";
      }
    }
  },
};

export default HomeScreen;
