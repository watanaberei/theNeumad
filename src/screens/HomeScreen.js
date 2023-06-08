// HomeScreen.js
import { getArticleNeumadsTrail } from "../api.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import NonFeaturedBlog from "../components/NonFeaturedBlog.js";

const HomeScreen = {
  render: async () => {
    const blogDatas = await getArticleNeumadsTrail();
    const featuredBlogDatas = await getArticleNeumadsTrail();
    const primaryFeaturedBlogDatas = await getArticleNeumadsTrail();
    const articleNeumadsTrail = await getArticleNeumadsTrail();
  
    const nonFeaturedBlogsResponse = await getArticleNeumadsTrail();
  
    const articlePrimaryBlogNeumadsItems = [
      ...primaryFeaturedBlogDatas
        .filter((primaryFeaturedBlogData) => primaryFeaturedBlogData.featured)
        .slice(0, 1), // Limit the number of featured posts to render to 1 (latest post)
      ...primaryFeaturedBlogDatas.filter(
        (primaryFeaturedBlogData) => !primaryFeaturedBlogData.featured
      ),
    ];
  
    const articleFeaturedBlogNeumadsItems = [
      ...primaryFeaturedBlogDatas
        .filter((featuredBlogData) => featuredBlogData.featured)
        .slice(0, 1), // Limit the number of featured posts to render to 1 (latest post)
      ...featuredBlogDatas.filter(
        (featuredBlogData) => !featuredBlogData.featured
      ),
    ];
  
    const primaryFeaturedBlogs = articlePrimaryBlogNeumadsItems.slice(0).slice(-1);
    const featuredBlogs = articleFeaturedBlogNeumadsItems.slice(1).slice(-2);
    const blogs = blogDatas.slice(3);
  
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
          ${blogs.map((blog) => renderNonFeaturedBlog(blog)).join("\n")} <!-- Call renderNonFeaturedBlog function here -->
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


function renderNonFeaturedBlog(blog) {
  const category = blog?.category || "";
  const slug = blog?.slug || "";
  const url = `http://localhost:3000/#/article/${category}/${slug}`;
  return NonFeaturedBlog.render(blog || {}, url); // Provide an empty object as default if blog is undefined
}




renderNonFeaturedBlog();

export default HomeScreen;
