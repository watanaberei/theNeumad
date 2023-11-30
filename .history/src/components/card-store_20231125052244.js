import { format, parseISO } from "date-fns";

const createStoreCard = {

  render: (storeData) => {
    return `
    <div class="map-container grid platinum postContainer">
    <div class="m sidebar">
        <div class="sidebar-container">
            <div class="listing-item" id="listing-series">
                <div class="heading">
                    <span class="header01">Series Posts</span>
                </div>
                <div id="series-posts-container" class="postSeries"></div>
            </div>

            <div class="listing-item" id="listing-stores">
                <div class="heading">
                    <span class="header01">Stores</span>
                </div>
                <div id="stores-container" class="postStore"></div>
            </div>

            <div class="listing-item" id="listing-reviewed">
                <div class="heading">
                    <span class="header01">Reviewed Stores</span>
                </div>
                <div id="reviewed-stores-container" class="postReviewed"></div>
            </div>

            <div class="listing-item" id="listing-second-stores">
                <div class="heading">
                    <span class="header01">More Stores</span>
                </div>
                <div id="second-closest-stores-container" class="postSecondStores"></div>
            </div>

            <div class="listing-item" id="listing-blogs">
                <div class="heading">
                    <span class="header01">Blogs</span>
                </div>
                <div id="latest-nearby-blogs-container" class="postBlogs"></div>
            </div>

            <div class="listing-item" id="listing-third-stores">
                <div class="heading">
                    <span class="header01">Even More Stores</span>
                </div>
                <div id="third-closest-stores-container" class="postThirdStores"></div>
            </div>
        </div>
    </div>
    <div class="s map" id="map">
        <div id="map-container" class="fullBleed"></div>
    </div>
</div>
    `;
  },
};

export default createStoreCard;
