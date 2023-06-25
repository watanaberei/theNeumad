// src/components/DataFilter.js
const DataFilter = (tags, activeTags, setTags) => {
    const tagElements = tags.map(tag => `
        <div class="tag ${activeTags.includes(tag) ? 'tag-active' : ''}" data-tag="${tag}">
            ${tag}
        </div>
    `).join('');
  
    return `
      <div class="tag-filter">
        ${tagElements}
      </div>
    `;
  };
  
  export default DataFilter;