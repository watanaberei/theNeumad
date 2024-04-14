import { format, parseISO } from "date-fns";
import * as media from "../components/media";
import * as tag from "../components/tag";   
import * as card from "../components/card";



const createStoreCard = {
  render: (storeData) => {
    console.log('storeData', storeData);   
    const best = storeData.best || [];   
    const metaTagLabel = storeData.metaTagLabel || [];
    const tagLimit = storeData.tagLimit;
    const metatagLimit = tagLimit;
    const tagAttributes = storeData.tagAttributes || [];
    const ratings = storeData.ratings || [];
    const storeCurrentStatus = storeData.storeCurrentStatus;
    console.log('storeCurrentStatus', storeCurrentStatus);
    // const galleryURL = Array.isArray(storeData.thumbnail) ? storeData.thumbnail : [];
    const galleryURL = storeData.galleryHTML || [];
    console.log('galleryURL', galleryURL);
    console.log('best', best);
    console.log('storeData', storeData);  
    


    const storeTitleData = {
        title: storeData.title,
        location: storeData.city
    };
    const metaTagData = {
        label: tagAttributes,
        limit: metatagLimit
    };
    const storeEyebrow = {
        storeCurrentStatus: storeData.storeCurrentStatus,
        storeRange: null, // initialize storeRange as null
    }
    const rating = {
        score: ratings,
    }
    console.log('rating', rating);
    const neustar = {
        score: storeData.neustar,
        // storeRange: null, // initialize storeRange as null
    }
    console.log('neustar', neustar);
    // Define getStoreRange inside render function
    async function getStoreRange() {
        try {
            storeEyebrow.storeRange = await storeData.storeRange; // assuming storeRange is a property of storeData
            // console.log(storeEyebrow.storeRange); // should print '18.94' instead of '[object Promise]'
            return storeEyebrow.storeRange; // return the value
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    // Use the returned value
    getStoreRange().then(storeRange => {
        console.log("storeRange",); // should print the value of storeRange
        return storeRange
        // const renderedEyebrow = eyebrow.render(storeEyebrow.storeCurrentStatus, storeEyebrow.storeRange);
        // console.log("renderedEyebrow",renderedEyebrow);
    });
    
    const mediaThumbnail = generateThumbnailHTML(galleryURL, storeData.galleryLimit);
    const tagNeustar = tag.tagNeustar.render(neustar);
    const tagRating = tag.tagRating.render(rating);
    const tagGenre = tag.tagGenre.render(storeData.genre);
    const attributeTag = tag.attributeTag.render(storeData.best);
    const metaTag = tag.metaTag.render(metaTagData.label, metaTagData.limit);
    // const outletCounts = tag.outletCounts.render(storeData.outletCounts);
    // const metatag = tag.metatagArray.render(metaTagData, metatagLimit);
    // const metatag = Array.isArray(metaTagData.value) ? tag.metatagArray.render(metaTagData, metatagLimit) : '';

    
    // const limitedBest02 = Array.isArray(storeData.best) ? storeData.best.slice(0, 2) : [];
    // const attributesArray = generateAttributesArray(limitedBest02);
    
    
    const cardTitle = card.tagType.render(storeTitleData);
    const cardEyebrow = card.eyebrow.render(storeEyebrow.storeCurrentStatus, storeEyebrow.storeRange);

    
    return `
    ${cardEyebrow}
    <div class="thumbnail">
        <div class="media-array">
            ${mediaThumbnail}
        </div>
    </div>


    <div class="content">

        <!------------ TAG ------------>
        <!----------------------------->
        <!----------------------------->
        <div class="tags">


            <!----------- LEFT ------------>
            <!----------------------------->
            <div class="container-left">

                <!----------- TAG NEUSTAR ------------>
                ${tagNeustar}
                <!--
                <div class="tag-neustar">
                    <div class="label">
                        <div class="score">
                            <div class="stars">3/3</div>
                        </div>
                        <div class="neustar">
                            <div class="neustar-gold">
                            <svg
                                class="neumad-brand-logomark"
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M4.18796 6.32113L4.96032 6.45176C4.96468 6.43262 4.96935 6.4136 4.97435 6.39471L4.24129 6.12208L1.18951 4.36013L1.74631 3.39573L4.79809 5.15767L5.39421 5.65082C5.4082 5.63632 5.42245 5.62207 5.43695 5.60808L4.9438 5.01196L3.18186 1.96018L4.14626 1.40338L5.90821 4.45516L6.18084 5.18822C6.19973 5.18322 6.21875 5.17854 6.23789 5.17419L6.10726 4.40182V0.87793L7.22086 0.87793V4.40182L7.08623 5.19786C7.10355 5.20284 7.12076 5.20809 7.13784 5.2136L7.41991 4.45516L9.18186 1.40338L10.1463 1.96018L8.38432 5.01196L7.84974 5.65816L7.84706 5.66037C7.85834 5.67223 7.86944 5.68426 7.88037 5.69644L7.88383 5.69225L8.53003 5.15767L11.5818 3.39573L12.1386 4.36013L9.08683 6.12208L8.30078 6.41442L8.26439 6.42057C8.26882 6.43845 8.27296 6.45644 8.27682 6.47454L8.31326 6.46099L9.14017 6.32113H12.6641V7.43473L9.14017 7.43473L8.31325 7.29487L8.25557 7.27342C8.25035 7.29275 8.2448 7.31194 8.23893 7.33098L8.30078 7.34144L9.08683 7.63378L12.1386 9.39573L11.5818 10.3601L8.53003 8.59819L7.88385 8.06362L7.83833 8.00861C7.82406 8.0234 7.80953 8.03793 7.79474 8.0522L7.84975 8.09772L8.38432 8.7439L10.1463 11.7957L9.18186 12.3525L7.41991 9.3007L7.12758 8.51466L7.11712 8.4528C7.09807 8.45867 7.07888 8.46422 7.05955 8.46944L7.08101 8.52714L7.22086 9.35404V12.8779H6.10726V9.35404L6.24712 8.52712L6.26067 8.49068C6.24257 8.48683 6.22458 8.48269 6.2067 8.47826L6.20055 8.51464L5.90821 9.3007L4.14626 12.3525L3.18186 11.7957L4.9438 8.7439L5.47837 8.09771L5.48257 8.09424C5.47039 8.08331 5.45836 8.0722 5.4465 8.06093L5.44428 8.06362L4.79809 8.59819L1.74631 10.3601L1.18951 9.39573L4.24129 7.63378L4.99973 7.35171C4.99422 7.33462 4.98897 7.31742 4.98399 7.3001L4.18796 7.43473L0.664062 7.43473L0.664063 6.32113L4.18796 6.32113Z"
                                fill="#FFBD00"
                                stroke="#DB9A00"
                                stroke-width="0.15"
                                stroke-linejoin="round"
                                />
                            </svg>
                            </div>
                            <div class="neustar-gold-mid">
                            <div class="neustar-gold2">
                                <svg
                                class="neumad-brand-logomark2"
                                width="13"
                                height="13"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M5.12805 7.98142L5.90791 7.9077C5.90716 7.88808 5.90676 7.8685 5.90669 7.84896L5.12805 7.77535L1.72423 6.8633L2.01245 5.78764L5.41627 6.69969L6.11971 7.02175C6.12948 7.00412 6.13956 6.98667 6.14994 6.9694L5.51931 6.52123L3.02754 4.02946L3.81497 3.24202L6.30674 5.73379L6.75981 6.37131C6.77677 6.3616 6.79393 6.35216 6.81129 6.343L6.48521 5.63076L5.57316 2.22694L6.64881 1.93872L7.56086 5.34254L7.63685 6.1463C7.65486 6.14662 7.67284 6.14724 7.69078 6.14814L7.76693 5.34254L8.67898 1.93872L9.75464 2.22694L8.84259 5.63076L8.49348 6.3933L8.49146 6.39613C8.50542 6.40467 8.51926 6.41341 8.53297 6.42235L8.53523 6.4174L9.02105 5.73379L11.5128 3.24203L12.3003 4.02946L9.80849 6.52123L9.12488 7.00705L9.09133 7.02241C9.10023 7.03854 9.10889 7.05484 9.11729 7.07133L9.14899 7.0488L9.91152 6.69969L13.3153 5.78764L13.6036 6.8633L10.1997 7.77535L9.36481 7.85428L9.30353 7.84848C9.3035 7.8685 9.30311 7.88848 9.30236 7.90839L9.36481 7.90249L10.1997 7.98142L13.6036 8.89347L13.3153 9.96913L9.91152 9.05708L9.149 8.70797L9.0908 8.66661C9.08084 8.68459 9.07057 8.70239 9.05997 8.72L9.12489 8.74973L9.80849 9.23554L12.3003 11.7273L11.5128 12.5147L9.02105 10.023L8.53524 9.33937L8.50912 9.28233C8.49224 9.29293 8.47514 9.30326 8.45782 9.3133L8.49348 9.36348L8.84259 10.126L9.75464 13.5298L8.67899 13.818L7.76694 10.4142L7.68801 9.57929L7.69166 9.54059C7.67318 9.54155 7.65473 9.54221 7.63632 9.54256L7.63979 9.57929L7.56086 10.4142L6.64881 13.818L5.57316 13.5298L6.48521 10.126L6.83431 9.36348L6.83747 9.35904C6.82287 9.35163 6.80839 9.34402 6.79401 9.3362L6.79256 9.33937L6.30674 10.023L3.81497 12.5147L3.02754 11.7273L5.51931 9.23554L6.1789 8.76678C6.16916 8.7517 6.15963 8.73644 6.15034 8.721L5.41627 9.05707L2.01245 9.96912L1.72423 8.89347L5.12805 7.98142Z"
                                    fill="#FFBD00"
                                    stroke="#DB9A00"
                                    stroke-width="0.15"
                                    stroke-linejoin="round"
                                />
                                </svg>
                            </div>
                            </div>
                            <div class="neustar-gold">
                            <svg
                                class="neumad-brand-logomark3"
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M4.18796 6.32113L4.96032 6.45176C4.96468 6.43262 4.96935 6.4136 4.97435 6.39471L4.24129 6.12208L1.18951 4.36013L1.74631 3.39573L4.79809 5.15767L5.39421 5.65082C5.4082 5.63632 5.42245 5.62207 5.43695 5.60808L4.9438 5.01196L3.18186 1.96018L4.14626 1.40338L5.90821 4.45516L6.18084 5.18822C6.19973 5.18322 6.21875 5.17854 6.23789 5.17419L6.10726 4.40182V0.87793L7.22086 0.87793V4.40182L7.08623 5.19786C7.10355 5.20284 7.12076 5.20809 7.13784 5.2136L7.41991 4.45516L9.18186 1.40338L10.1463 1.96018L8.38432 5.01196L7.84974 5.65816L7.84706 5.66037C7.85834 5.67223 7.86944 5.68426 7.88037 5.69644L7.88383 5.69225L8.53003 5.15767L11.5818 3.39573L12.1386 4.36013L9.08683 6.12208L8.30078 6.41442L8.26439 6.42057C8.26882 6.43845 8.27296 6.45644 8.27682 6.47454L8.31326 6.46099L9.14017 6.32113H12.6641V7.43473L9.14017 7.43473L8.31325 7.29487L8.25557 7.27342C8.25035 7.29275 8.2448 7.31194 8.23893 7.33098L8.30078 7.34144L9.08683 7.63378L12.1386 9.39573L11.5818 10.3601L8.53003 8.59819L7.88385 8.06362L7.83833 8.00861C7.82406 8.0234 7.80953 8.03793 7.79474 8.0522L7.84975 8.09772L8.38432 8.7439L10.1463 11.7957L9.18186 12.3525L7.41991 9.3007L7.12758 8.51466L7.11712 8.4528C7.09807 8.45867 7.07888 8.46422 7.05955 8.46944L7.08101 8.52714L7.22086 9.35404V12.8779H6.10726V9.35404L6.24712 8.52712L6.26067 8.49068C6.24257 8.48683 6.22458 8.48269 6.2067 8.47826L6.20055 8.51464L5.90821 9.3007L4.14626 12.3525L3.18186 11.7957L4.9438 8.7439L5.47837 8.09771L5.48257 8.09424C5.47039 8.08331 5.45836 8.0722 5.4465 8.06093L5.44428 8.06362L4.79809 8.59819L1.74631 10.3601L1.18951 9.39573L4.24129 7.63378L4.99973 7.35171C4.99422 7.33462 4.98897 7.31742 4.98399 7.3001L4.18796 7.43473L0.664062 7.43473L0.664063 6.32113L4.18796 6.32113Z"
                                fill="#FFBD00"
                                stroke="#DB9A00"
                                stroke-width="0.15"
                                stroke-linejoin="round"
                                />
                            </svg>
                            </div>
                        </div>
                    </div>
                </div>
                -->
                <!----------- NEUSTAR ------------>

                <!----------- RATINGS ------------>
                ${tagRating}
                <!--
                <div class="tag-rating">
                    <div class="label2">
                        <div class="score2">
                            <div class="_3-33">3.33</div>
                        </div>
                        <svg
                            class="glyph-rating-star"
                            width="14"
                            height="13"
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <mask id="path-1-inside-1_215_36556" fill="white">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.92278 4.82746L6.97324 0.87793L5.02371 4.82746L0.664062 5.46468L3.81865 8.53724L3.07417 12.8779L6.97324 10.8275L10.8723 12.8779L10.1278 8.53724L13.2824 5.46468L8.92278 4.82746Z"
                            />
                            </mask>
                            <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.92278 4.82746L6.97324 0.87793L5.02371 4.82746L0.664062 5.46468L3.81865 8.53724L3.07417 12.8779L6.97324 10.8275L10.8723 12.8779L10.1278 8.53724L13.2824 5.46468L8.92278 4.82746Z"
                            fill="#F3B440"
                            />
                            <path
                            d="M6.97324 0.87793L8.3183 0.213991L6.97324 -2.51094L5.62818 0.213991L6.97324 0.87793ZM8.92278 4.82746L7.57772 5.4914L7.92639 6.19776L8.70584 6.31169L8.92278 4.82746ZM5.02371 4.82746L5.24065 6.31169L6.0201 6.19776L6.36877 5.4914L5.02371 4.82746ZM0.664062 5.46468L0.447121 3.98045L-2.55857 4.41978L-0.382534 6.53922L0.664062 5.46468ZM3.81865 8.53724L5.29707 8.7908L5.43044 8.01319L4.86525 7.4627L3.81865 8.53724ZM3.07417 12.8779L1.59576 12.6244L1.0819 15.6204L3.77234 14.2055L3.07417 12.8779ZM6.97324 10.8275L7.67142 9.49984L6.97324 9.13268L6.27507 9.49984L6.97324 10.8275ZM10.8723 12.8779L10.1741 14.2055L12.8646 15.6204L12.3507 12.6244L10.8723 12.8779ZM10.1278 8.53724L9.08124 7.4627L8.51605 8.01319L8.64942 8.7908L10.1278 8.53724ZM13.2824 5.46468L14.329 6.53922L16.5051 4.41978L13.4994 3.98045L13.2824 5.46468ZM5.62818 1.54187L7.57772 5.4914L10.2678 4.16352L8.3183 0.213991L5.62818 1.54187ZM6.36877 5.4914L8.3183 1.54187L5.62818 0.213991L3.67865 4.16352L6.36877 5.4914ZM0.881004 6.94891L5.24065 6.31169L4.80676 3.34323L0.447121 3.98045L0.881004 6.94891ZM4.86525 7.4627L1.71066 4.39014L-0.382534 6.53922L2.77206 9.61178L4.86525 7.4627ZM4.55258 13.1315L5.29707 8.7908L2.34024 8.28367L1.59576 12.6244L4.55258 13.1315ZM6.27507 9.49984L2.37599 11.5503L3.77234 14.2055L7.67142 12.1551L6.27507 9.49984ZM11.5705 11.5503L7.67142 9.49984L6.27507 12.1551L10.1741 14.2055L11.5705 11.5503ZM8.64942 8.7908L9.3939 13.1315L12.3507 12.6244L11.6062 8.28367L8.64942 8.7908ZM12.2358 4.39014L9.08124 7.4627L11.1744 9.61178L14.329 6.53922L12.2358 4.39014ZM8.70584 6.31169L13.0655 6.94891L13.4994 3.98045L9.13972 3.34323L8.70584 6.31169Z"
                            fill="#F3B440"
                            mask="url(#path-1-inside-1_215_36556)"
                            />
                        </svg>
                        <div class="number-parentheses">
                            <div class="div">(</div>
                            <div class="_111">111</div>
                            <div class="div">)</div>
                        </div>
                    </div>
                </div>
                -->
                <!----------- RATINGS ------------>
                
            </div>
            <!----------- LEFT ----------->
            <!----------------------------->
            

            <!----------- RIGHT ----------->
            <!----------------------------->
            <div class="container-right">
                <!----------- GENRE ------------>
                ${tagGenre}
                <!--
                    <div class="label3">
                        <div class="label-item">
                        <div class="coffee-shop">Coffee Shop</div>
                        </div>
                    </div>
                -->
                <!----------- GENRE ------------>
            </div>
            <!----------- RIGHT ----------->
            <!----------------------------->



        </div>
        <!------------ TAG ------------>
        <!----------------------------->
        <!----------------------------->



        <!----------- TITLE ------------>
        ${cardTitle}
        <!--
        <div class="label4">
            <div class="title">
                <div class="text">
                    <div class="text-03-bold">text03-Bold</div>
                    <div class="location">in Cerritos</div>
                </div>
            </div>
        </div>
        -->
        <!----------- TITLE ------------>


        <!---------- METATAG ----------->
        <div class="metatag">
            ${metaTag}
            <!--
            <div class="metatag2">
                <div class="label5">
                    <div class="text-03">
                        Text03
                    </div>
                    <div class="number-parentheses">
                        <div class="div2">
                            (
                        </div>
                        <div class="_1112">
                            111
                        </div>
                        <div class="div2">
                            )
                        </div>
                    </div>
                </div>
            </div>
            <div class="spacer">
                <div class="div3">
                    ,
                </div>
            </div>
            <div class="metatag-item">
                <div class="metatag-label">
                    <div class="text-03">
                        Text03
                    </div>
                    <div class="number-parentheses">
                        <div class="div2">
                            (
                        </div>
                        <div class="_1112">
                            111
                        </div>
                        <div class="div2">
                            )
                        </div>
                    </div>
                </div>
            </div>
            <div class="spacer">
                <div class="div3">
                    ,
                </div>
            </div>
            <div class="metatag-item">
                <div class="metatag-label">
                    <div class="text-03">
                        Text03
                    </div>
                    <div class="number-parentheses">
                        <div class="div2">
                            (
                        </div>
                        <div class="_1112">
                            111
                        </div>
                        <div class="div2">
                            )
                        </div>
                    </div>
                </div>
            </div>
            -->
        </div>
        <!---------- METATAG ----------->


        <!------------ ATTRIBUTE ITEM ------------->
        <div class="attribute">
            ${attributeTag}
            <!--
                <div class="attribute-item">
                    <div class="attribute-label">
                        <div class="text-03">Text03</div>
                        <div class="number-parentheses">
                        <div class="div2">(</div>
                        <div class="_1112">111</div>
                        <div class="div2">)</div>
                        </div>
                    </div>
                </div>
                <div class="spacer2">
                    <div class="remote-work">
                        /
                    </div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-label">
                        <div class="text-03">
                            Text03
                        </div>
                        <div class="number-parentheses">
                            <div class="div2">
                                (
                            </div>
                            <div class="_1112">
                                111
                            </div>
                            <div class="div2">
                                )
                            </div>
                        </div>
                    </div>
                </div>
                <div class="spacer2">
                    <div class="remote-work">
                        /
                    </div>
                </div>
                <div class="attribute-item">
                    <div class="attribute-label">
                        <div class="text-03">
                            Text03
                        </div>
                        <div class="number-parentheses">
                            <div class="div2">
                                (
                            </div>
                            <div class="_1112">
                                111
                            </div>
                            <div class="div2">
                                )
                            </div>
                        </div>
                    </div>
                </div>
            -->
        </div>
    </div>
`;
  },
};

export default createStoreCard;




//////////// THUMBNAIL ////////////
// function generateThumbnailHTML(storeData, limit) {
//     // if (!Array.isArray(storeData)) {
//     //     console.error('Invalid storeData: expected an array');
//     //     return '';
//     // }

//     let mediaGalleryHTML = '';
//     storeData.slice(0, limit).forEach((storeData, index) => {
//       const opacityClass = index >= 4 ? 'low-opacity' : '';
//       mediaGalleryHTML += `

//             <div class="media-img-m ${opacityClass}">
//                 <div class="media-img">
//                     <img src="${storeData.url}" class="media-img-1-x-1-x-m" alt="" />
//                 </div>
//             </div>
            
//       `;
//     });
//     return mediaGalleryHTML;
// }
function generateThumbnailHTML(galleryHTML, limit) {
    // Parse the galleryHTML string to get the URLs
    const parser = new DOMParser();
    const doc = parser.parseFromString(galleryHTML, 'text/html');
    const imgElements = Array.from(doc.getElementsByTagName('img'));
    const urls = imgElements.map(img => img.src);

    // Generate the HTML
    let mediaGalleryHTML = '';
    urls.slice(0, limit).forEach((url, index) => {
        const opacityClass = index >= 4 ? 'low-opacity' : '';
        mediaGalleryHTML += `
            <div class="media-img-m ${opacityClass}">
                <div class="media-img">
                    <img src="${url}" class="media-img-1-x-1-x-m" alt="" />
                </div>
            </div>
        `;
    });
    return mediaGalleryHTML;
}
//////////// THUMBNAIL ////////////



   // Function to generate the Neustar icons
   const generateNeustarIcons = (neustar) => {
    let iconsHTML = '';
    for (let i = 1; i <= 3; i++) {
      if (i <= neustar) {
        iconsHTML += '<i class="icon-neustar-active12"></i>';
      } else {
        iconsHTML += '<i class="icon-neustar-inactive12"></i>';
      }
    }
    return iconsHTML;
  };


// ATTRIBUTES
function generateAttributesArray(limitedBest02) {
    let attributesArray = "";
    limitedBest02.forEach((best) => {
      attributesArray += `
        <div class="item">
            <div class="text">
              
              <span class="bold text03">${best}</span>
              <i class="glyph glyph-check-15"></i>
            </div>
        </div>`;
    });
    return attributesArray;
  }
  


  