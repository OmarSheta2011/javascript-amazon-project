import { deliveryOptions } from "./deliveryOptions.js";
import { getProduct, products } from "./products.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  #loadLocalStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) ||
      [
        // {
        //   id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        //   quantity: 1,
        //   deliveryOptionId:'2',
        // },
        // {
        //   id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        //   quantity: 2,
        //   deliveryOptionId:'1',
        // },
      ];
  }

  addToCart(productId, quantity) {
    let matchingId;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingId = cartItem;
      }
    });
    if (matchingId) {
      matchingId.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }
    this.updateCartQuantity();
    this.saveToLocalStorage();
  }

  updateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelectorAll(".js-cart-quantity").forEach((element) => {
      element.innerHTML = cartQuantity;
    });
    return cartQuantity;
  }

  calculateshipping() {
    let shipping = 0;
    this.cartItems.forEach((cartItem) => {
      deliveryOptions.forEach((option) => {
        if (cartItem.deliveryOptionId === option.id) {
          shipping += option.deliveryPriceCents;
        }
      });
    });
    return shipping;
  }

  updateQuantity(productId, newQuantity) {
    let matchingProduct;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingProduct = cartItem;
      }
    });
    matchingProduct.quantity = newQuantity;
    this.saveToLocalStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.updateCartQuantity();
    this.saveToLocalStorage();
  }

  calculateTax(taxInDecimal) {
    return taxInDecimal * (this.calculateshipping() + this.calculateTotalProducts());
  }

  updateDeliveryOption(deliveryOptionId, productId) {
    let matchingProduct;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingProduct = cartItem;
      }
    });
    matchingProduct.deliveryOptionId = deliveryOptionId;
    this.saveToLocalStorage();
  }

  calculateTotalProducts() {
    let totalCents = 0;
    this.cartItems.forEach((cartItem) => {
      let matchingProduct = getProduct(cartItem.productId);
      totalCents += matchingProduct.priceCents * cartItem.quantity;
    });
    return totalCents;
  }
}

export const cart = new Cart("cart");
