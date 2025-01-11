import { getDateStringOrder } from "./deliveryOptions.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { getProduct } from "./products.js";
import { loadProductsFetch } from "./products.js";
export const orders =  JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}

console.log(orders);


async function displayOrders(){

  await loadProductsFetch();

  let innerHTMl ='';

  orders.forEach((order) => {
    innerHTMl += `
     <div class="order-container js-order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${getDateStringOrder(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

        `
        //console.log(order.products);
      order.products.forEach((product) => {

        const matchingProduct = getProduct(product.productId
        );

       innerHTMl += `

        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${
                matchingProduct.name
              }
            </div>
            <div class="product-delivery-date">
              Arriving on: ${getDateStringOrder(product.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
              Quantity: ${product.qunatity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            
              <button class="track-package-button button-secondary js-track-package-button js-track-package-button-${product.productId}-${order.id}" data-product-id = "${product.productId}" data-order-id = "${order.id}">
                Track package
              </button>
            </a>
          </div>
        </div>`;

      })
    
  })

 

  document.querySelector('.js-orders-grid').innerHTML = innerHTMl;

  document.querySelectorAll('.js-track-package-button').forEach((button) => {
    const productId = button.dataset.productId;
    const orderId = button.dataset.orderId;
  
    console.log(productId);
  
    document.querySelector(`.js-track-package-button-${productId}-${orderId}`).addEventListener('click', () => {
      window.location.href = `tracking.html?productId=${productId}&orderId=${orderId}`;
    });
  
  })
}

displayOrders();



