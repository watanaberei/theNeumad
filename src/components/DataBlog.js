// src/components/DataBlog.js
import { getStoresNeumadsReview, getArticleNeumadsTrail, getArticlePost } from "../api.js";

export default class DataBlog {
  constructor() {
    this.activeTags = [];
  }

  async fetchBlogs() {
    const articleData = await getArticleNeumadsTrail(9, 0);
    const storeData = await getStoresNeumadsReview(9, 0);
    const postData = await getArticlePost(9, 0);
    return [...articleData, ...storeData, ...postData];
  }

  async getData() {
    const BlogData = await this.fetchBlogs();

    const filteredBlogData = BlogData.filter(blog => {
      const blogTags = blog.tag && blog.tag.length ? blog.tag[0].tags : [];
      return this.activeTags.length === 0 ? true : blogTags.some(tag => this.activeTags.includes(tag));
    });

    return filteredBlogData;
  }

  setActiveTags(tags) {
    this.activeTags = tags;
  }
}















// import {

//     getStoresNeumadsReview,
//     getArticleNeumadsTrail,
//     getArticlePost,
//   } from "../api.js";
  
//   let activeTags = [];
  
//   const DataBlog = async () => {
//     const articleData = await getArticleNeumadsTrail(9, 0);
//     const storeData = await getStoresNeumadsReview(9, 0);
//     const postData = await getArticlePost(9, 0);
//     const BlogData = [...articleData, ...storeData, ...postData];
//     // Filter the BlogData based on the active tags
//     const filteredBlogData = BlogData.filter(blog => {
//         const blogTags = blog.tag && blog.tag.length ? blog.tag[0].tags : [];
//         // if no active tags, display all blogs, else filter by active tags
//         return activeTags.length === 0 ? true : blogTags.some(tag => activeTags.includes(tag));
//       });

//     return filteredBlogData;
//   };
  
//   const setActiveTags = (tag) => {
//     activeTags = tag;
//   };
  
//   export { DataBlog, setActiveTags };