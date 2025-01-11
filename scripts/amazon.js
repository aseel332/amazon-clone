import {cart, addToCart} from '../data/cart.js' //import {variable name} from 'related path' grouping two imports 
// together seperating using , 



//{cart as Mycart} is used to import the variable as any other name 

//In the script element add attribut type with value module 
//export the variable from the variable file 
//import it in the module file. 

import { products, loadProducts } from '../data/products.js';

//import { addToCart } from '../data/cart.js';

import { formatCurrency } from './utils/money.js';
import { calculateCartQuantity, updateCartQuantity, getItemQuantity } from '../data/cart.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(){



let productsHTML = '';

products.forEach((product) => {
  productsHTML += ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" 
            src = "${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          

          <div class="product-quantity-container">
            <select class = "js-quantity-selector js-quantity-selector-${product.id}" data-product-id = "${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="js-add-to-cart add-to-cart-button button-primary"
          data-product-id = "${product.id}"> 
            Add to Cart
          </button>
        </div>
`; //using Data attribut 
//It has to start with data- 

});


document.querySelector('.js-products-grid').innerHTML = productsHTML;



let timeoutId;

function addedTimer(productId){
  clearTimeout(timeoutId);

  document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-opa')

  timeoutId = setTimeout(()=>{
    document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-opa')
  }, 2000);

}

document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
  button.addEventListener('click', () => {
   // console.log(button.dataset.productId)//.dataset is used to get all the data attributes attach to the element 
    //The name of the product changes from kebab case to came case 
    const productId = button.dataset.productId;

    const itemQuantity = getItemQuantity(productId)
    
    addToCart(productId, itemQuantity);


    addedTimer(productId);

    updateCartQuantity();
  });

 

});


updateCartQuantity();

}