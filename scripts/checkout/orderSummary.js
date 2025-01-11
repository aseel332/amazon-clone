import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { removeFromCart } from "../../data/cart.js";
//import { updateCartQuantity } from "./amazon.js";
import { calculateCartQuantity } from "../../data/cart.js";//Named Export 
import { saveToStorage } from "../../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //default export 
import { deliveryOptions, getDateString, getDeliveryOption } from "../../data/deliveryOptions.js";
import { updateDeliveryOption } from "../../data/cart.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js";




export function renderOrderSummary() {






  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct= getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const deliveryDate = calculateDeliveryDate(deliveryOption);

    const dateString = getDateString(deliveryDate);
    
    
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-upadate-link js-update-link-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                      Update
                    </span>
                    <input class = 'quantity-input js-quantity-input-${matchingProduct.id}'>
                    <span class = "save-quantity-link link-primary js-save-quantity-link js-save-quantity-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">Save</span>

                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
    `;


  });

  function deliveryOptionsHTML(matchingProduct, cartItem){

  let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const deliveryDate = calculateDeliveryDate(deliveryOption);

      const dateString = getDateString(deliveryDate);

  const priceString = deliveryOption.priceCents === 0
  ?'FREE'
  :`${formatCurrency(deliveryOption.priceCents)} -`;


  const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


  html +=    `           <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                    <input type="radio" ${isChecked? 'checked': ''}
                    
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>
                `
    })

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click',() =>{
      const productId = link.dataset.productId
      //console.log(productId);
      removeFromCart(productId);
      updateCartQuantity();

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      renderPaymentSummary();

    })
  })

  function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

    document.querySelector(".js-cart-items-quantity").innerHTML = `${cartQuantity} items`;
    
  }

  updateCartQuantity();

  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    const productId = link.dataset.productId;
    document.querySelector(`.js-update-quantity-link-${productId}`).addEventListener('click', () => {
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');

    })
  })


  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    const productId = link.dataset.productId;



    document.querySelector(`.js-save-quantity-link-${productId}`).addEventListener('click', () => {

    const quantity = document.querySelector(`.js-quantity-input-${productId}`).value;

    cart.forEach((cartItem) =>{
      if(cartItem.productId === productId){
        cartItem.quantity = Number(quantity);
      }
    });

    updateCartQuantity();

    saveToStorage();

    renderPaymentSummary();

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = quantity;

    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
    })
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();//function can re run itself that is called recursion
      renderPaymentSummary(); 
    })
  });
}

 