import createReviewCard from '../components/card-review.js';
import createArticleCard from '../components/card-article';
import createBlogCard from '../components/card-blog';
import createStoreCard from '../components/card-store';
import { createDefaultCard } from '../components/card-default';

export function createGeojsonListing(store, map, userCoordinates) {
    if (!store || !store.properties) {
        return '';
    }

    const { 
        lat, best, neustar, lon, seriesName, region, address, tag, slug, variant, 
        thumbnail, gallery: originalGallery, logo, area, recommendations, 
        categoryType, genre, text, subtext, eyebrow, location, hours, summary,
    } = store.properties;

    const tags = tag && tag.length ? tag[0].tags : [];
    const bests = best || [];
    const title = text || [];
    const subtitle = subtext || [];
    const galleryData = originalGallery && Array.isArray(originalGallery) && originalGallery.length ? originalGallery : [];
    const galleryHTML = generateGalleryHTML(galleryData);
    
    let bestHTML = '';
    tags.slice(0, 3).forEach(best => {
        bestHTML +=  `
        <div class="metadata-tag">
        <span class="metadata-tag-text text01 bold">${best}</span>
        </div>`;
    });

    let tagsHTML = '';
    bests.slice(0, 3).forEach(tag => {
        tagsHTML += `<div class="metadata-tag">
                       <span class="metadata-tag-text text01 bold">${tag}</span>
                     </div>`;
    });

    const listing = document.createElement('a');
    listing.href = '/#/' + variant + '/' + slug;
    listing.rel = 'noopener noreferrer nofollow';
    listing.target = categoryType + '-${store.sys.id}';
    listing.onclick = function() {
        mapRoute(userCoordinates, store.geometry.coordinates);
    }

    let contentHTML = '';
    switch (variant) {
        case 'articles':
            contentHTML = `
            <div class="articles">
                articles
                <div class="articles-container">
                    ${createArticleCard(logo, title, categoryType, region, bestHTML, thumbnail)}
                </div>
            </div>`;
            break;
        case 'stores':
            contentHTML = `
            <div class="stores">
                stores
                <div class="stores-container">
                    ${createStoreCard(logo, neustar, galleryHTML, title, genre, categoryType, region, bestHTML)}
                </div>
            </div>`;
            break;
        case 'reviews':
            contentHTML = `
            <div class="reviews">
                reviews
                <div class="reviews-container">
                    ${createReviewCard(logo, thumbnail, title, region, bestHTML)}
                </div>
            </div>`;
            break;
        case 'blogs':
            contentHTML = `
            <div class="blogs">
                blogs
                <div class="blogs-container">
                    ${createBlogCard(variant, slug, categoryType, logo, title, subtitle, region, tagsHTML)}
                </div>
            </div>`;
            break;
        default:
            contentHTML = createDefaultCard(logo, title, subtitle, region, tagsHTML);
    }

    listing.innerHTML = contentHTML;

    const variantDiv = document.createElement('div');
    variantDiv.className = variant;
    variantDiv.appendChild(listing);
    return variantDiv;
}

function generateGalleryHTML(gallery) {
    let galleryHTML = '';
    gallery.slice(0, 3).forEach(galleryItem => {
        galleryHTML += `<img src="${galleryItem.url}" class="galleryItem ratio1x1" alt="" />`;
    });
    return galleryHTML;
}