// src/Screens/HomeScreen.js
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost,
} from "../api.js";
import PrimaryFeaturedBlog from "../components/PrimaryFeaturedBlog";
import FeaturedBlog from "../components/FeaturedBlog";
import AllBlog from "../components/AllBlog.js";
import { sortByDistance } from "../utils";
import { createGeojsonListing } from "../components/GeojsonListing";
import { geojsonStore } from "../components/GeojsonStores";
import { DataBlog, setActiveTags } from "../components/DataBlog";
import DataFilter from "../components/DataFilter";

let activeTags = [];

const HomeScreen = {
  
  render: async () => {
    const BlogData = await DataBlog();
    // Extract all tags from the BlogData
    const allTags = BlogData.reduce((tags, blog) => {
      const blogTags = blog.tag && blog.tag.length ? blog.tag[0].tags : [];
      return [...tags, ...blogTags];
    }, []);
     // Get the top 10 tags
     const topTags = allTags.slice(0, 10);

     // Create the DataFilter component
     const dataFilter = DataFilter(topTags, activeTags, setActiveTags);
 
    console.log("Homescreen dataFilter01",dataFilter);
     const primaryFeaturedBlogs = BlogData.slice(0, 1);
     console.log("suggestion: primaryFeaturedBlogs",primaryFeaturedBlogs);
     const featuredBlogs = BlogData.slice(2, 5);
     const allBlogs = BlogData.slice(3);
     console.log("Homescreen allBlogs",allBlogs);

     const primaryFeaturedBlogsHTML = primaryFeaturedBlogs
  .map(
    (primaryFeaturedBlog) =>
      `${PrimaryFeaturedBlog.render(primaryFeaturedBlog)}`
  )
  .join("\n");
console.log("suggestion: primaryFeaturedBlogsHTML",primaryFeaturedBlogsHTML);

    const selectedLocation = JSON.parse(localStorage.getItem('selectedLocation') || 'null');
    const sortedBlogData = sortByDistance(selectedLocation, BlogData);
  
    const createListing = (store) => {
      const onClick = () => {}; // Define the onClick behavior if needed
      return createGeojsonListing(store, onClick).outerHTML;
    };  
  
    
    const geojsonListings = sortedBlogData.slice(0, 3).map(createListing).join('\n');
    console.log("Homescreen geojsonListings", geojsonListings);
    return `
    <div id = "blog-layout">
      <div id="blog-filter">
        ${dataFilter}
        <!-- Rest of your code -->
      
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
          ${allBlogs.map((allBlog) => AllBlog.render(allBlog)).join("\n")}
        </div>
        <div class="load-btn">
          <button class="load" id="load">Load more</button>
        </div>
      </div>
      </div>
    `;
  },
  
after_render: () => {
  // Add click event listeners to the tags
  document.querySelectorAll('.tag').forEach(tagElement => {
    tagElement.addEventListener('click', async () => {
      const tag = tagElement.dataset.tag;
      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(activeTag => activeTag !== tag);
      } else {
        activeTags.push(tag);
      }
      // Set the active tags
      setActiveTags(activeTags);

      // Fetch updated data with active tags applied.
      const BlogData = await DataBlog();
      // Compute your topTags again
      const allTags = BlogData.reduce((tags, blog) => {
        const blogTags = blog.tag && blog.tag.length ? blog.tag[0].tags : [];
        return [...tags, ...blogTags];
      }, []);
      const topTags = allTags.slice(0, 10);

      // Re-render the filter
      document.querySelector('#blog-filter').innerHTML = DataFilter(topTags, activeTags, setActiveTags);
      // Re-render blogposts
      document.querySelector('#blog-layout').innerHTML = await HomeScreen.render();
      // Re-render the component
      HomeScreen.after_render();
    });
  });
    const btn = document.getElementById("load");
    let index = 0;
    btn.addEventListener("click", loadData);

    async function loadData() {
      // Fetch more blogs using the same getArticleNeumadsTrail function
        const BlogData = await DataBlog(3, 3 * ++index + 1);
      // const blogs = await getArticleNeumadsTrail(3, 3 * ++index + 1);
      let template = document.getElementById("blog-layout");
      const data = BlogData.map((blog) => FeaturedBlog.render(blog)).join("\n");
      template.insertAdjacentHTML("beforeend", data);
      if (BlogData.length === 0) {
        btn.disabled = true;
        btn.innerText = "No more blogs";
      }
    }
  },
};

export default HomeScreen;