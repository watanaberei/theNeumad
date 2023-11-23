// card-default.js
import { format, parseISO } from "date-fns";

const createDefaultCard = {

  render: (storeData) => {
    return `
    <div class="p1-c2col1 ratioPlatinum card-postListing-item-img">
        <div class="galleryContainer">
        ${storeData.galleryHTML}
        </div>
    </div>

    <div class="c1col2-p2 storeListing-content card-postListing-item-content">
    
        <div class="card-content-header">
        <div class="content-title">
            <span class="text03 bold">
            ${storeData.title}
            </span>
            <span class="text03 bold icon-neustar-container">
            ${storeData.neustarHTML}
        </span>
            
        <div class="content-details">

            <div class="content-details-item" id="storeDetails">
                <span class="text02">
               Current:
               <div class="store-status">
               ${storeData.storeCurrentStatus}
           </div>
                </span>
                <span class="text02">
                    ${storeData.genre}
                </span>
                <span class="text02 filler">
                    in 
                </span>
                <span class="text02">
                    ${storeData.region}
                </span>
            </div>

            <div class="content-summary">
                <div class="content-summary-item" id="environment">
                    <span class="text02">
                        ${storeData.environment[0]}
                    </span>
                </div>
                <div class="content-summary-filler">
                    <span class="text02">
                        ,
                    </span>
                </div>
                <div class="content-summary-item" id="noiseLevel">
                    <span class="text02">
                        ${storeData.noiseLevel}
                    </span>
                </div>
                <div class="content-summary-filler">
                    <span class="text02">
                        in
                    </span>
                </div>
                <div class="content-summary-item" id="parking">
                    <span class="text02">
                        ${storeData.parking[0]}
                    </span>
                </div>
            </div>

        </div>

        </div>
            <div class="data-time">
                <span class="data-time-text text01">12m</span>
            </div>
        </div>

        <div class="post-data">
            <div class="tag-collection">
                <div class="post-data">
                    ${storeData.bestHTML}
                </div>
            </div>
        </div>
    
    </div>`;
  },
};

export default createDefaultCard;




// export function createDefaultCard(variant, title, region, tagsHTML) {
//   const card = document.createElement('a');
//   card.href = '/#/' + variant + '/' + slug;
//   card.rel = 'noopener noreferrer nofollow';
//   card.target = categoryType + '-${storeId}';
//   card.onclick = function() {
//       mapRouteFunction(userCoords, storeCoords);
//   }
  
//     card.className = 'default-item card-postListing-item listingPosts card-mid-item';
//     card.innerHTML = `
    

//     <div class="c1col2-p2 card-postListing-item-content">
//       <div class="card-content-header">
//         <div class="content-title">
//           <span class="header04">
//             ${title}
//           </span>
//           <span class="text03">
//           ${subtitle}
//           </span>
//           <span class="text03">
//           ${region}
//           </span>
//         </div>
//         <div class="data-current">
//           <span class="data-time-text text01">2m Read</span>
//         </div>
//       </div>


//       <div class="post-data">
//         <div class="tag-collection">
//           <div class="nav-list-divider">
//             <div class="lineV"></div>
//           </div>
//           <div class="post-data">
//             ${tagsHTML}
//           </div>
//         </div>
//       <div class="lineH"></div>
//     </div>
//   </div>`; // You should replace '...' with the fallback HTML
//     return card;
// }
