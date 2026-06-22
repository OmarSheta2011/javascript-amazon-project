import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateDeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.21/+esm";
import {
  calculateDeliveryDate,
  deliveryOptions,
} from "../../data/deliveryOptions.js";
import renderPaymentSummary from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";
// ---------------------------------------------------------------

export default function renderOrderSummary() {
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
        deliveryDate = calculateDeliveryDate(option);
      }
    });

    html += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
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
      let shipping;
      let deliveryDate = calculateDeliveryDate(option);

      if (option.id === "1") {
        shipping = "FREE";
      } else {
        shipping = `$${formatCurrency(option.deliveryPriceCents)}`;
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
                      ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${shipping} - Shipping
                    </div>
                  </div>
                  </div>
                `;
    });
    return options;
  }

  document.querySelector(".order-summary").innerHTML = html;

  // -----------------------------------------------------

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
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
      quantityInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          if (Number(quantityInput.value) < 0) {
            alert("Not a valid Quantity");
          } else if (Number(quantityInput.value) === 0) {
            removeFromCart(productId);
            renderOrderSummary();
            renderPaymentSummary();
          } else {
            let newQuantity = Number(quantityInput.value);
            updateQuantity(productId, newQuantity);
            renderOrderSummary();
            renderPaymentSummary();
          }
        }
      });
      saveElement.addEventListener("click", () => {
        if (Number(quantityInput.value) < 0) {
          alert("Not a valid Quantity");
        } else if (Number(quantityInput.value) === 0) {
          removeFromCart(productId);
          renderOrderSummary();
          renderPaymentSummary();
        } else {
          let newQuantity = Number(quantityInput.value);
          updateQuantity(productId, newQuantity);
          renderOrderSummary();
          renderPaymentSummary();
        }
      });
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { deliveryOptionId, productId } = element.dataset;
      updateDeliveryOption(deliveryOptionId, productId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();
