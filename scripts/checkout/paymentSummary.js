import {
  cart
} from "../../data/cart-class.js";
import formatCurrency from "../utils/money.js";
// -------------------------------------

export default function renderPaymentSummary() {

  const cartQuantity = cart.updateCartQuantity();
  const totalProducts = cart.calculateTotalProducts();
  const shipping = cart.calculateshipping();
  const totalBefoteTax = shipping + totalProducts;
  const tax = cart.calculateTax(0.1);
  const orderTotal = tax + totalBefoteTax;

  const html = ` <div class="payment-summary-title">Order Summary</div>

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
