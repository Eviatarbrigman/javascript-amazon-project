import { cart, deleteItemFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurency } from "../scripts/utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartQuantity = 0;

let checkOutHTML = "";

cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
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
                ${deliveryOptionHTML(matchingProduct.id, cartItem)}
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
  });
});
document.querySelector(".js-item-count").innerHTML = `${cartQuantity} items`;
document.querySelector(".js-items-count").innerHTML = `items (${cartQuantity})`;

function deliveryOptionHTML(productId, cartItem) {
  let deliveryOptionHTML = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deleveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deleveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    deliveryOptionHTML += `<div class="delivery-option">
      <input
        type="radio"
        ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${productId}"
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
