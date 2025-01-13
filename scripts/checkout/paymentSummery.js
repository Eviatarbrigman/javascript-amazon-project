import { cart } from "../../data/cart.js";
import { getProductFromCart } from "../../data/products.js";
import { formatCurency } from "../../scripts/utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummery() {
  let productPriceCents = 0;
  let itemsQuantity = 0;
  let shippingPriceCents = 0;

  cart.forEach((element) => {
    const product = getProductFromCart(element.productId);
    productPriceCents += product.priceCents * element.quantity;
    itemsQuantity += element.quantity;
    const deliveryOption = getDeliveryOption(element.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforTaxCents * 0.1;
  const totalCents = totalBeforTaxCents + taxCents;
  console.log(formatCurency(totalBeforTaxCents));
  console.log(formatCurency(taxCents));
  console.log(formatCurency(totalCents));

  const paymentSummeryHTML = `

        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row js-items-count">
        <div>items (${itemsQuantity})</div>
        <div class="payment-summary-money">$${formatCurency(
          productPriceCents
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurency(
          shippingPriceCents
        )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurency(
          totalBeforTaxCents
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${formatCurency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
  document.querySelector(".js-payment-summery").innerHTML = paymentSummeryHTML;
}
