import {
  cart,
  removeFromCart,
  saveToLocalStorage,
  updateCartQuantityElement,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.21/+esm";
// -----------------------------------------------------------------

let html = "";
let matchingProduct;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  html += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link"
                  data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <input type="text" class="quantity-input" />
                  <span class="link-primary save-quantity">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});

document.querySelector(".order-summary").innerHTML += html;
updateCartQuantityElement();
// -----------------------------------------------------

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    console.log(productId);
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
    updateCartQuantityElement();
  });
});

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    const saveElement = container.querySelector(".save-quantity");
    const quantityInput = container.querySelector(".quantity-input");
    const quantityLabel = container.querySelector(".quantity-label");
    quantityInput.value = quantityLabel.innerHTML;
    container.classList.add("is-editing-quantity");
    saveElement.addEventListener("click", () => {
      if (Number(quantityInput.value) < 0) {
        alert("Not a valid Quantity");
      } else {
        let newQuantity = Number(quantityInput.value);
        updateQuantity(productId, newQuantity);
        quantityLabel.innerHTML = newQuantity;
        updateCartQuantityElement();
        container.classList.remove("is-editing-quantity");
      }
    });
  });
});
