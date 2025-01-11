export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '1'
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
  deliveryOptionId: '2',
}]; //export is used to export the variable outside the file 
}
}



export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}



export function addToCart(productId, itemQuantity){
  

  console.log(itemQuantity);

  itemQuantity = Number(itemQuantity);

  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId == cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += itemQuantity;
  }else{
    cart.push({
      productId: productId,
      quantity: itemQuantity,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();


}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0; 
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId == cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function getItemQuantity(productId){

  let itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

  return itemQuantity;

}

export function updateCartQuantity(){
  
  const cartQuantity = calculateCartQuantity();

  if (cartQuantity === 0){
    document.querySelector('.js-cart-quantity').innerHTML = '';
}
  else{
   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    console.log(xhr.response);

    
  

      fun();
  })
  xhr.open('GET', 'https://supersimplebackend.dev/cart');//Open takes two parapmeters type and URL
  xhr.send();
}

export async function loadCardFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart')

  const cart = await response.text()
  console.log(cart);
}


