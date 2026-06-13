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
      deliveryOptionId: "1",
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

  const cartQuantityElement = document
    .querySelectorAll(".js-cart-quantity")
    .forEach((element) => {
      element.innerHTML = cartQuantity;
    });
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
  updateCartQuantityElement();
  saveToLocalStorage();
}

export function updateDeliveryOption(deliveryOptionId, productId) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });
  matchingProduct.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}
