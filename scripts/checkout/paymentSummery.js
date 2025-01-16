import { cart } from '../../data/cart.js';
import { getProductFromCart } from '../../data/products.js';
import { formatCurency } from '../../scripts/utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/orders.js';

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

        <button class="place-order-button button-primary
        js-place-order-button">
        Place your order
        </button>
    `;
  document.querySelector('.js-payment-summery').innerHTML = paymentSummeryHTML;
  document
    .querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      try {
        const response = fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('Error placing order', error);
      }
      window.location.href = 'orders.html';
    });
}
