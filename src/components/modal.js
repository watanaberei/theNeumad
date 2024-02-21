import { format, parseISO } from "date-fns";
import * as element from "../components/elements";

export const modals = {
  init: function() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log("DOMContentLoaded - Modals are being initialized");

      const bindModal = (targetModel) => {
        let modal = document.getElementById(targetModel);
        console.log(`Attempting to bind model: ${targetModel}`);

        if (modal) {
          console.log(`Modal found: ${targetModel}`);
          document.getElementById(`${targetModel}-close`).onclick = function() {
            modal.style.display = "none";
            console.log(`Closing modal: ${targetModel}`);
          };

          modal.style.display = "block";
          window.onclick = function(event) {
            if (event.target === modal) {
              modal.style.display = "none";
              console.log(`Clicked outside to close modal: ${targetModel}`);
            }
          };
        } else {
          console.log(`Modal not found: ${targetModel}`);
        }
      };

      const myBtn = document.getElementById("myBtn");
      const myBtn1 = document.getElementById("myBtn1");

      if (myBtn) {
        console.log("Button myBtn found, attaching click event");
        myBtn.onclick = function() {
          console.log("myBtn clicked");
          bindModal("myModal");
        };
      } else {
        console.log("Button myBtn not found");
      }

      if (myBtn1) {
        console.log("Button myBtn1 found, attaching click event");
        myBtn1.onclick = function() {
          console.log("myBtn1 clicked");
          bindModal("myModal1");
        };
      } else {
        console.log("Button myBtn1 not found");
      }
    });
  }
};





















// export const modals = {
//   init: function() {
//     document.addEventListener('DOMContentLoaded', () => {
//       const bindModel = (targetModel) => {
//         let modal = document.getElementById(targetModel);

//         if (modal) {
//           modal.style.display = "block";

//           document.getElementById(targetModel + "-close").onclick = function() {
//             modal.style.display = "none";
//           };

//           window.onclick = function(event) {
//             if (event.target === modal) {
//               modal.style.display = "none";
//             }
//           };
//         }
//       };

//       const myBtn = document.getElementById("myBtn");
//       const myBtn1 = document.getElementById("myBtn1");

//       if (myBtn) {
//         myBtn.onclick = function() {
//           bindModel("myModal");
//         };
//       }

//       if (myBtn1) {
//         myBtn1.onclick = function() {
//           bindModel("myModal1");
//         };
//       }
//     });
//   }
// };












  // // Ensure the DOM is fully loaded before attaching event listeners
  // const modal = {
  //   init: function() {
  //     document.addEventListener('DOMContentLoaded', (event) => {
  //       const bindModel = (targetModel) => {
  //         var modal = document.getElementById(targetModel);
  
  //         if (modal) {
  //           modal.style.display = "block";
  
  //           document.getElementById(targetModel + "-close").onclick = function () {
  //             modal.style.display = "none";
  //           };
  
  //           window.onclick = function (event) {
  //             if (event.target == modal) {
  //               modal.style.display = "none";
  //             }
  //           };
  //         }
  //       };
  
  //       const myBtn = document.getElementById("myBtn");
  //       const myBtn1 = document.getElementById("myBtn1");
  
  //       if (myBtn) {
  //         myBtn.onclick = function () {
  //           bindModel("myModal");
  //         };
  //       }
  
  //       if (myBtn1) {
  //         myBtn1.onclick = function () {
  //           bindModel("myModal1");
  //         };
  //       }
  //     });
  //   }
  // };
  
  // // Export the modal object
  // export { modal };





// Assuming `format` and `parseISO` from `date-fns` are available globally,
// perhaps through a script inclusion in your HTML.

// If `createSanitizingProxy` is defined in another script, ensure that script
// is included before this one in your HTML.

// modals object definition remains mostly the same, but don't use export.
// const modals = {
//   render: () => {
//     return `
//     <button id="myBtn">Open Modal</button>
//             `;
//   },
// };

// // The rest of the script remains largely unchanged.
// function bindModel(targetModel) {
//     var modal = document.getElementById(targetModel);
  
//     modal.style.display = "block";
  
//     document.getElementById(targetModel + "-close").onclick = function () {
//       modal.style.display = "none";
//     };
  
//     window.onclick = function (event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//       }
//     };
//   }
  
// document.getElementById("myBtn").onclick = function () {
//   bindModel("myModal");
// };

// document.getElementById("myBtn1").onclick = function () {
//   bindModel("myModal1");
// };

// // If this script needs to be used in a context where its functionality is required elsewhere,
// // consider attaching necessary functions or objects to the `window` object for global accessibility.
