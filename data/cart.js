export const cart = [];

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
}

export function updateCartQuantityElement(quantity) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  cartQuantityElement.innerHTML = cartQuantity;
}
