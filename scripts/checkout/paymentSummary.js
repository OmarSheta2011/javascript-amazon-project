import {
  cart,
  updateCartQuantityElement,
  calculateTotalProducts,
  calculateshipping,
  calculateTax,
} from "../../data/cart.js";
import formatCurrency from "../utils/money.js";
// -------------------------------------

export default function renderPaymentSummary() {

  const cartQuantity = updateCartQuantityElement();
  const totalProducts = calculateTotalProducts();
  const shipping = calculateshipping();
  const totalBefoteTax = shipping + totalProducts;
  const tax = calculateTax(0.1);
  const orderTotal = tax + totalBefoteTax;

  let html = ` <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
          <div>Items (<span class="js-cart-quantity">${cartQuantity}</span>):</div>
          <div class="payment-summary-money js-total-products">$${formatCurrency(totalProducts)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(shipping)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBefoteTax)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`;

  document.querySelector(".payment-summary").innerHTML = html;
}
