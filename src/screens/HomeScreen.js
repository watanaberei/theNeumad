// src/Screens/HomeScreen.js
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import AllBlog from "../components/AllBlog.js";
import { sortByDistance } from "../utils";
import { createGeojsonListing } from "../components/GeojsonListing";
import DataBlog from "../components/DataBlog";
import DataFilter from "../components/DataFilter";

let dataBlog = new DataBlog();

const HomeScreen = {
  render: async () => {
    const BlogData = await dataBlog.getData();

    const primaryFeaturedBlogs = BlogData.slice(0, 1);
    const featuredBlogs = BlogData.slice(2, 5);
    const allBlogs = BlogData.slice(3);

    const selectedLocation = JSON.parse(localStorage.getItem('selectedLocation') || 'null');
    const sortedBlogData = sortByDistance(selectedLocation, BlogData);
    

   return `
      <div id="blog-layout">
        <div id="blog-container">
          <div class="featured-blog-layout container" id="featured-blog-layout">
            ${primaryFeaturedBlogs
              .map((primaryFeaturedBlog) => PrimaryFeaturedBlog.render(primaryFeaturedBlog))
              .join("\n")}
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
            ${allBlogs.map((allBlog) => AllBlog.render(allBlog)).join("\n")}
          </div>
          <div class="load-btn">
            <button class="load" id="load">Load more</button>
          </div>
        </div>
      </div>
    `;
  },
  
  async after_render() {
    // No need to update activeTags, instead update dataBlog and render content
    document.querySelectorAll('.tag').forEach(tagElement => {
      tagElement.addEventListener('click', async () => {
        const tag = tagElement.dataset.tag;
        const newActiveTags = dataBlog.activeTags.includes(tag)
              ? dataBlog.activeTags.filter(activeTag => activeTag !== tag)
              : [...dataBlog.activeTags, tag];
        dataBlog.setActiveTags(newActiveTags);
        // Then render your content as needed...
        // For example:
        document.querySelector('#blog-layout').innerHTML = await this.render();
        this.after_render();
      });
    });
    const btn = document.getElementById("load");
    let index = 0;
    btn.addEventListener("click", loadData);

    async function loadData() {
      // Fetch more blogs using the same getArticleNeumadsTrail function
      const BlogData = await dataBlog.getData(3, 3 * ++index + 1);
      let template = document.getElementById("blog-layout");
      
      // Render PrimaryFeaturedBlog and FeaturedBlog separately
      const primaryFeaturedData = BlogData.slice(0, 1);
      const featuredData = BlogData.slice(1);

      const primaryFeaturedHTML = primaryFeaturedData.map((blog) => PrimaryFeaturedBlog.render(blog)).join("\n");
      const featuredHTML = featuredData.map((blog) => FeaturedBlog.render(blog)).join("\n");
      
      template.insertAdjacentHTML("beforeend", primaryFeaturedHTML + featuredHTML);

      if (BlogData.length === 0) {
        btn.disabled = true;
        btn.innerText = "No more blogs";
      }
    }
  },
};

export default HomeScreen;