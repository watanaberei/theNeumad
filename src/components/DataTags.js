// src/components/DataTags.js
const allTags = (tags) => {
    let tagsHTML = '';
    tags.forEach((tag) => {
      tagsHTML += `<div class="metadata-tag">
                     <span class="metadata-tag-text text01">${tag}</span>
                   </div>`;
    });
    return tagsHTML;
  };
  
  export default allTags;