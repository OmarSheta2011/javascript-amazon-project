export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchingId;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingId = cartItem;
    }
  });
  if (matchingId) {
    matchingId.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
  updateCartQuantityElement();
  saveToLocalStorage();
}

export function updateCartQuantityElement() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  let cartQuantityElement;
  {
    cartQuantityElement = document.querySelector(".js-cart-quantity");
    cartQuantityElement.innerHTML = cartQuantity;
  }
}

export function updateQuantity(productId, newQuantity) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingProduct = cartItem;
    }
  });
  matchingProduct.quantity = newQuantity;
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToLocalStorage();
}
