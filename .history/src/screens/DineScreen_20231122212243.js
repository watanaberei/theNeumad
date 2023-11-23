// HomeScreen.js
import { getDineBlog, getDineFeaturedBlog } from "../api.js";

import DineBlog from "../components/DineBlog.js";
import DineFeaturedBlog from "../components/DineFeaturedBlog.js";

const DineScreen = {
  render: async () => {
    const dineBlogs = await getDineBlog();
    const dineFeaturedBlogs = await getDineFeaturedBlog();

    console.log("getDineBlog:" + dineBlogs);
    console.log("getDineFeaturedBlog:" + dineFeaturedBlogs);

    return `<div>
    <div class="section-header container" id="section-header">
        <div class="dine-title">
            <span class="display03">
                Articles on Dining
            </span>
        </div>
    </div>
    <div class="featured-blog-layout container" id="featured-blog-layout">
    ${dineFeaturedBlogs.map((dineFeaturedBlog) => `${DineFeaturedBlog.render(dineFeaturedBlog)}`).join("\n")}


    </div>
    <div class="section-header container" id="section-header">
        <div class="dine-title">
            <span class="display03">
                Dining Related Articles
            </span>
        </div>
    </div>
    <div class="blog-layout container" id="blog-layout">
      ${dineBlogs.map((dineBlog) => `${DineBlog.render(dineBlog)}`).join("\n")}
    </div>

    <div class="load-btn"><button class="load" id="load">Load more</button></div>
    </div>`;
  },
  after_render: () => {
    const btn = document.getElementById("load");
    let index = 0;
    btn.addEventListener("click", loadData);

    async function loadData() {
      const dineBlogs = await getDineBlogs(3, 3 * ++index + 1);
      let template = document.getElementById("blog-layout");
      const data = dineBlogs
        .map(function (dineBlog) {
          return DineBlog.render(dineBlog);
        })
        .join("\n");
      template.insertAdjacentHTML("beforeend", data);
      if (dineBlogs.length === 0) {
        btn.disabled = true;
        btn.innerText = "no more dineBlogs";
      }
    }
  },
};

export default DineScreen;
