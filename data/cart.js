import { deliveryOptions } from "./deliveryOptions.js";
import { getProduct, products } from "./products.js";

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

  document.querySelectorAll(".js-cart-quantity").forEach((element) => {
    element.innerHTML = cartQuantity;
  });
  return cartQuantity;
}

export function calculateshipping() {
  let shipping = 0;
  cart.forEach((cartItem) => {
    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        shipping += option.deliveryPriceCents;
      }
    });
  });
  return shipping;
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

export const calculateTax = (taxInDecimal) =>
  taxInDecimal * (calculateshipping() + calculateTotalProducts());

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

export function calculateTotalProducts() {
  let totalCents = 0;
  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem.productId)
    totalCents += matchingProduct.priceCents * cartItem.quantity;
  });
  return totalCents;
}
