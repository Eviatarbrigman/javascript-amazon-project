import {
  cart,
  deleteItemFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProductFromCart } from "../../data/products.js";
import { formatCurency } from "../../scripts/utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummery } from "./paymentSummery.js";
import { renderCheckOut } from "../checkout.js";

export function renderOrderSummery() {
  let cartQuantity = 0;
  let checkOutHTML = "";

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    const productId = cartItem.productId;
    let matchingProduct = getProductFromCart(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deleveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deleveryDate.format("dddd, MMMM D");

    checkOutHTML += `
          <div class="cart-item-container js-cart-item-container-${
            matchingProduct.id
          }">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">$${formatCurency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id=${
                    matchingProduct.id
                  }>
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${
                    matchingProduct.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
            `;
  });

  document.querySelector(".js-cart-item-container").innerHTML = checkOutHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      deleteItemFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();
      renderPaymentSummery();
      renderCheckOut();
    });
  });

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let deliveryOptionHTML = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryOptionHTML += `
    <div class="delivery-option js-delivery-option"
    data-product-id=${matchingProduct.id}
    data-delivery-option-id=${deliveryOption.id}>
      <input
        type="radio"
        ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"
      />
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>
    `;
    });
    return deliveryOptionHTML;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummery();
      renderPaymentSummery();
    });
  });
}
