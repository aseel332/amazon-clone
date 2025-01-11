import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
//import { getDateStringOrder } from "../data/deliveryOptions";

async function displayItem(){
  const url = new URL(window.location.href);
      const orderId = url.searchParams.get('orderId');
      const productId = url.searchParams.get('productId');
      await loadProductsFetch();
      const matchingProduct = getProduct(productId);

      console.log(orderId);

      let matchingItem;

      orders.forEach((order) => {

        console.log(order.id);
        
        if(orderId === order.id){
          matchingItem = order;
        }
      })
      
      console.log(matchingItem);

      let matchingDelivery;

      matchingItem.products.forEach((item) =>{
        if(item.productId === productId){
          matchingDelivery = item;
        }
      })

      console.log(matchingDelivery);

      const innerHtml = `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on 
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingDelivery.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
      `;

  document.querySelector('.js-main').innerHTML = innerHtml;
}

displayItem();