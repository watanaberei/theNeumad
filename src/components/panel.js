import { format, parseISO } from "date-fns";
import * as element from "./elements";
import * as suggestion from "../components/suggestion";





export const panel = {
  render: (store) => {
    
    return `


    <div class="content">
      <div class="header">
        <div class="container">
          <div class="title">
            <div class="logo">
              <div class="ellipse-244"></div>
              <img
                class="ca-cerritos-southwest-cerritos-smoking-tiger-bread-factory-logo-white"
                src="ca-cerritos-southwest-cerritos-smoking-tiger-bread-factory-logo-white0.png"
              />
            </div>
            <div class="text">
              <span class="text03 bold">Golden State Coffee</span>
            </div>
          </div>
        </div>
        <div class="icon">
          <svg
            class="glyph-route-open-tab"
            width="9"
            height="17"
            viewBox="0 0 9 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 4.60156H8.29883M8.29883 4.60156V12.4004M8.29883 4.60156L0.5 12.4004"
              stroke="black"
              stroke-width="1.5"
            />
          </svg>
        </div>
      </div>
      ${element.lineH.render(21)}
      <div class="body">
        <div class="item">
          <div class="container">
            <div class="text">
              <div class="title">
                <span class="text03 bold indicator">
                  Open
                </span>
              </div>
              <div class="subtitle">
                <span class="text03">8AM</span>
                <span class="text03">to</span>
                <span class="text03">10PM</span>
              </div>
            </div>
          </div>
          <i class="icon">
            <svg
              class="glyph-route-go"
              width="9"
              height="17"
              viewBox="0 0 9 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.29907 13.8325L8.82998 14.3623L9.35915 13.832L8.8294 13.3022L8.29907 13.8325ZM0.5 13.8412L-0.25 13.8412C-0.25 14.0403 -0.170867 14.2312 -0.030034 14.3719C0.1108 14.5125 0.30178 14.5915 0.500838 14.5912L0.5 13.8412ZM5.66946 17.5297L8.82998 14.3623L7.76816 13.3028L4.60764 16.4703L5.66946 17.5297ZM4.60822 11.2023L7.76874 14.3629L8.8294 13.3022L5.66888 10.1417L4.60822 11.2023ZM8.29823 13.0825L0.499162 13.0912L0.500838 14.5912L8.29991 14.5825L8.29823 13.0825ZM1.25 13.8412L1.25 6.56066L-0.25 6.56066L-0.25 13.8412L1.25 13.8412Z"
                fill="black"
              />
            </svg>
          </i>
        </div>
        <div class="item">
          <div class="container">
            <div class="text">
              <div class="title">
               
                  <span class="text03 bold">4.34</span>
             
                <div class="indicator">
                  <svg
                    class="glyph"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.50079 0C6.85472 0 7.17796 0.200921 7.33462 0.518292L8.60329 3.08848L11.4405 3.50318C11.7907 3.55436 12.0814 3.79985 12.1906 4.13648C12.2997 4.4731 12.2083 4.8425 11.9548 5.08941L9.90259 7.0883L10.3869 9.91224C10.4468 10.2611 10.3033 10.6137 10.017 10.8218C9.73057 11.0298 9.35091 11.0572 9.03762 10.8924L6.50079 9.55835L3.96395 10.8924C3.65066 11.0572 3.271 11.0298 2.98462 10.8218C2.69823 10.6137 2.5548 10.2611 2.61464 9.91224L3.09898 7.0883L1.04673 5.08941C0.793223 4.8425 0.70184 4.4731 0.810987 4.13648C0.813465 4.12884 0.816036 4.12124 0.818699 4.1137L0.765847 4.06222L0.843466 4.05088C0.971102 3.75866 1.24131 3.54991 1.56105 3.50318L4.39828 3.08848L5.66695 0.518292C5.80057 0.247598 6.05538 0.06162 6.34705 0.0127697L6.35325 0.00019455L6.35855 0.0109177C6.40517 0.00370987 6.45269 0 6.50079 0Z"
                      fill="#101011"
                    />
                  </svg>
                </div>
              </div>
              <div class="subtitle">
                <span class="text03">329 reviews</span>
              </div>
            </div>
          </div>
          <div class="icon">
            <svg
              class="glyph-route-go2"
              width="9"
              height="17"
              viewBox="0 0 9 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.29907 13.8325L8.82998 14.3623L9.35915 13.832L8.8294 13.3022L8.29907 13.8325ZM0.5 13.8412L-0.25 13.8412C-0.25 14.0403 -0.170867 14.2312 -0.030034 14.3719C0.1108 14.5125 0.30178 14.5915 0.500838 14.5912L0.5 13.8412ZM5.66946 17.5297L8.82998 14.3623L7.76816 13.3028L4.60764 16.4703L5.66946 17.5297ZM4.60822 11.2023L7.76874 14.3629L8.8294 13.3022L5.66888 10.1417L4.60822 11.2023ZM8.29823 13.0825L0.499162 13.0912L0.500838 14.5912L8.29991 14.5825L8.29823 13.0825ZM1.25 13.8412L1.25 6.56066L-0.25 6.56066L-0.25 13.8412L1.25 13.8412Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div class="item">
          <div class="container">
            <div class="text">
              <div class="title">
             
                  <span class="text03 bold">(333) 333-3333</span>
           
              </div>
            </div>
          </div>
          <svg
            class="icon"
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.0918 1.59155C3.0918 0.71256 3.80436 0 4.68335 0H6.21846C6.88495 0 7.45878 0.470431 7.58949 1.12397L7.94898 2.92144C8.02399 3.29647 7.97121 3.68581 7.79908 4.02733L7.61586 4.39085L7.65322 4.45623C8.11104 5.25742 8.7621 5.93064 9.54642 6.4149L10.1899 6.0022L10.2011 5.99505L10.2012 5.99515C10.4041 5.87001 10.6295 5.79081 10.8617 5.7603C11.2835 5.7049 11.6533 5.86508 11.8286 5.94096C11.8344 5.9435 11.8401 5.94595 11.8455 5.94829L12.1229 6.06795C12.2053 6.10351 12.2896 6.13517 12.3933 6.17408C12.4353 6.18987 12.4806 6.20685 12.5301 6.22576C12.6848 6.28481 12.8737 6.36007 13.0527 6.45698C13.3957 6.6427 13.909 7.02655 13.909 7.74374V9.22401C13.909 10.0828 13.2128 10.7789 12.354 10.7789C11.2112 10.7789 9.89746 10.7769 8.66759 10.2151C6.55363 9.24949 4.86572 7.54417 3.92183 5.42041L3.88835 5.34508C3.36316 4.16341 3.0918 2.88468 3.0918 1.59155ZM9.24342 7.1082L8.86028 7.75295C7.81734 7.1332 6.95277 6.25378 6.35086 5.20044L6.12002 4.79647C5.99116 4.57098 5.98397 4.29589 6.10086 4.06397L6.4596 3.35222C6.48086 3.31003 6.48738 3.26194 6.47811 3.21562L6.13499 1.5H4.68335C4.63278 1.5 4.5918 1.54099 4.5918 1.59155C4.5918 2.6748 4.81912 3.74599 5.25907 4.73587L5.29255 4.8112C6.08777 6.60046 7.50983 8.03719 9.29083 8.85073C10.1796 9.25669 11.1677 9.27894 12.354 9.27894C12.3844 9.27894 12.409 9.25435 12.409 9.22401V7.81842C12.3926 7.80725 12.3698 7.79297 12.3385 7.77604C12.2519 7.72917 12.1414 7.68292 11.9953 7.62717C11.9649 7.61556 11.9315 7.60303 11.8961 7.58978C11.7817 7.54684 11.6472 7.49637 11.5287 7.44524L11.2513 7.32558C11.1584 7.2855 11.1057 7.2653 11.0648 7.25429C11.0558 7.25186 11.0492 7.25043 11.0447 7.24959C11.0263 7.25338 11.0084 7.26018 10.9919 7.26984L10.2596 7.73952L10.2484 7.74668L10.2483 7.74658C10.0153 7.89031 9.75695 7.93477 9.54681 7.93391C9.33543 7.93305 9.08703 7.88613 8.8636 7.75491L9.24342 7.1082Z"
              fill="#101011"
            />
          </svg>
        </div>
        <div class="item">
          <div class="container">
            <div class="text">
              <div class="title">
                
                  <span class="text03 bold">
                    19232 Plymouth st.
                    <br />
                    Cerritos CA
                  </span>
                
              </div>
            </div>
          </div>
          <svg
            class="icon"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.65049 6.65049C6.68432 6.61666 6.7302 6.59766 6.77805 6.59766H10.9648C11.0127 6.59766 11.0585 6.61666 11.0924 6.65049C11.1262 6.68432 11.1452 6.7302 11.1452 6.77805V7.24324C11.1452 7.65746 11.481 7.99324 11.8952 7.99324C12.3094 7.99324 12.6452 7.65746 12.6452 7.24324V6.77805C12.6452 6.33238 12.4682 5.90497 12.153 5.58983C11.8379 5.2747 11.4105 5.09766 10.9648 5.09766H6.77805C6.33238 5.09766 5.90497 5.2747 5.58983 5.58983C5.2747 5.90497 5.09766 6.33238 5.09766 6.77805V10.9648C5.09766 11.4105 5.2747 11.8379 5.58983 12.153C5.90497 12.4682 6.33238 12.6452 6.77805 12.6452H7.24324C7.65746 12.6452 7.99324 12.3094 7.99324 11.8952C7.99324 11.481 7.65746 11.1452 7.24324 11.1452H6.77805C6.7302 11.1452 6.68432 11.1262 6.65049 11.0924C6.61666 11.0585 6.59766 11.0127 6.59766 10.9648V6.77805C6.59766 6.7302 6.61666 6.68432 6.65049 6.65049ZM9.85285 10.0352C9.85285 9.93557 9.93362 9.8548 10.0332 9.8548H14.22C14.3196 9.8548 14.4004 9.93557 14.4004 10.0352V14.222C14.4004 14.3216 14.3196 14.4023 14.22 14.4023H10.0332C9.93362 14.4023 9.85285 14.3216 9.85285 14.222V10.0352ZM10.0332 8.3548C9.10519 8.3548 8.35285 9.10714 8.35285 10.0352V14.222C8.35285 15.15 9.10519 15.9023 10.0332 15.9023H14.22C15.1481 15.9023 15.9004 15.15 15.9004 14.222V10.0352C15.9004 9.10714 15.1481 8.3548 14.22 8.3548H10.0332Z"
              fill="#101011"
            />
          </svg>
        </div>
      </div>
      ${element.lineH.render(21)}
      <div class="cta">
        <div class="item">
          <div class="info">
            <span class="send-to-your-phone text03 bold">Send to your phone</span>
          </div>
        </div>
      </div>
      ${element.lineH.render(21)}
      <div class="panel-footer footer">
        <div class="item">
          <div class="title">
            <div class="text03 medium">Google</div>
          </div>
          <div class="button partners-google-logo-30">
            <!--<img class="image-690" src="partners-google-logo-30" />-->
          </div>
        </div>
        <div class="item">
          <div class="title">
            <div class="text03 medium">Yelp</div>
          </div>
          <div class="button partners-yelp-logo-30">
            <!--<img class="image-691" src="partners-yelp-logo-30" />-->
          </div>
        </div>
        <div class="item">
          <div class="title">
            <div class="infatuated">Infatuated</div>
          </div>
          <div class="button partners-infatuated-logo-30">
            <!--<img class="image-693" src="partners-infatuated-logo-30" />-->
          </div>
        </div>
      </div>
    </div>






  <div class="suggestion">
     ${element.lineH.render(21)}
    ${suggestion.suggestions.render(store)}

  </div>`;

    }

}
