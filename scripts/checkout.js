import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCardFetch } from "../data/cart.js";
// import '../data/cart-class.js';
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage() { //async makes a function returns a promise 
//   try{
//     //throw 'error1';
//   console.log("load Page");

//   await loadProductsFetch(); //await waits for the line of code to fininsh 

//   await loadCardFetch();

//   } catch (error) {
//     console.log("Unexpected Error. Please Try Again Later")
//   }
  

//   renderOrderSummary();
//   renderPaymentSummary();

//   return 'value2';//This acts like a parameter to the resolve function
// }

await Promise.all([
  loadProductsFetch(),
  loadCardFetch(),

])

renderOrderSummary();
renderPaymentSummary();
}

loadPage();

// Promise.all([
//   loadProductsFetch(),

//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })

// ]).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// new Promise((resolve) =>{
  
//   loadProducts(() => {
    
//     resolve('value1'); //resolve to wait till the code is finished
//   });
  
// }).then((value) => {
//   console.log(value);
//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   });

// }).then(() =>{ //.then() to add the next step
//     renderOrderSummary();
//     renderPaymentSummary();
// });


// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   })
// });


//MVC
//Model - View - Controller
//Model to generate the view model is cart and products
//View is adding html to the vage to display something
//Add modifications to the model - event listners 