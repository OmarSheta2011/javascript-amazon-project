import { cart } from "../../data/cart-class.js";

export default function renderCheckoutHeader() {
  const cartQuantity = cart.updateCartQuantity();

  const checkoutHeaderHTML = `<div class="header-content">
        <div class="checkout-header-left-section">
          <a href="index.html">
            <img class="amazon-logo" src="images/amazon-logo.png" />
            <img
              class="amazon-mobile-logo"
              src="images/amazon-mobile-logo.png"
            />
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link" href="index.html"
            ><span class="js-cart-quantity">${cartQuantity}</span> <span>items</span></a
          >)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>`;
  document.querySelector(".checkout-header").innerHTML = checkoutHeaderHTML;
}
