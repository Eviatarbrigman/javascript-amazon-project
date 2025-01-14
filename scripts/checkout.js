import { renderOrderSummery } from './checkout/orderSummery.js';
import { renderPaymentSummery } from './checkout/paymentSummery.js';
import { getCartQuantity } from '../data/cart.js';
import '../data/cart-class.js';

renderOrderSummery();
renderPaymentSummery();
renderCheckOut();

export function renderCheckOut() {
  const cartQuantity = getCartQuantity();
  document.querySelector('.js-item-count').innerHTML = `${cartQuantity} items`;
}
