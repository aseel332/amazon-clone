class Cart{
  cartItems;
  #localStorageKey;


  constructor(key){
    
    this.#localStorageKey = key;
    
    
    this.#loadFromStorage();
  
  }

  #loadFromStorage() {//Dont need to use colon and function if we use this 
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
  
  if(!this.cartItems){ //This istead of object neame beacuse it can differ and this accounts for this 
    this.cartItems = [{
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

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId, itemQuantity){
      
    
    console.log(itemQuantity);
  
    itemQuantity = Number(itemQuantity);
  
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId == cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity += itemQuantity;
    }else{
      this.cartItems.push({
        productId: productId,
        quantity: itemQuantity,
        deliveryOptionId: '1',
      });
    }
  
    this.saveToStorage();
  
  
  }

  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  }

  
  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId == cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

  
  calculateCartQuantity(){
    let cartQuantity = 0; 
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }
  
}

  
  const cart = new Cart('cart-oop');//You can put the parameter for the construcors 
  
  const businessCart = new Cart('business-cart');

  //cart.#localStorageKey = 'test';


  console.log(cart);
  console.log(businessCart);
  
  
  
  
  
  
  
  
  
  
  
  
  