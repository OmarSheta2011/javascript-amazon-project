import {
  cart,
  removeFromCart,
  saveToLocalStorage,
  updateCartQuantityElement,
  updateDeliveryOption,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.21/+esm";
import { deliveryOptions } from "../data/deliveryOptions.js";
// ---------------------------------------------------------------

let html = "";
let matchingProduct;
const date = dayjs();

cart.forEach((cartItem) => {
  let deliveryDate;
  const productId = cartItem.productId;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  deliveryOptions.forEach((option) => {
    if (option.id === cartItem.deliveryOptionId) {
      deliveryDate = option.deliveryDate;
    }
  });

  html += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${date.add(deliveryDate, "day").format("dddd, MMMM DD")}
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

                ${generateOptions(matchingProduct, cartItem)}
              </div>
              </div>
            </div>
          </div>`;
});

function generateOptions(matchingProduct, cartItem) {
  let options = "";
  deliveryOptions.forEach((option) => {
    let shiping;
    let deliveryDate = date.add(option.deliveryDate, "day");
    let deliveryDateFormatted = deliveryDate.format("dddd, MMMM DD");

    if (option.id === "1") {
      shiping = "FREE";
    } else if (option.id === "2") {
      shiping = formatCurrency(option.deliveryPriceCents);
    } else if (option.id === "3") {
      shiping = formatCurrency(option.deliveryPriceCents);
    }

    options += `
                <div class="delivery-option js-delivery-option"
                    data-product-id ="${matchingProduct.id}"
                    data-delivery-option-id="${option.id}">
                  <input type="radio" ${cartItem.deliveryOptionId === option.id ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
>
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDateFormatted}
                    </div>
                    <div class="delivery-option-price">
                      ${shiping} - Shipping
                    </div>
                  </div>
                  </div>
                `;
  });
  return options;
}

let paymentSummary = `<div class="payment-summary">
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row ">
            <div>Items (<span class="js-cart-quantity"></span>):</div>
            <div class="payment-summary-money js-products-price"></div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shiping-price">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`;

document.querySelector(".order-summary").innerHTML += html;

document.querySelector(".checkout-grid").innerHTML += paymentSummary;
updateCartQuantityElement();
calculateTotalPrice();
// -----------------------------------------------------

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
    updateCartQuantityElement();
    calculateTotalPrice();
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
        calculateTotalPrice();
      }
    });
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { deliveryOptionId, productId } = element.dataset;
    updateDeliveryOption(deliveryOptionId, productId);
  });
});

function calculateTotalPrice() {
  let totalpriceCents = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    products.forEach((product) => {
      if (productId === product.id) {
        let matchingProduct = product;
      }
    });

    totalpriceCents += matchingProduct.priceCents * cartItem.quantity;
  });
  updateTotalPrice(totalpriceCents);
  calculateShipping();
}

function updateTotalPrice(totalpriceCents) {
  const totalElement = document.querySelector(".js-products-price");
  totalElement.innerHTML = `$${formatCurrency(totalpriceCents)}`;
}

function calculateShipping() {}
