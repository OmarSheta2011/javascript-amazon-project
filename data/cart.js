export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

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
