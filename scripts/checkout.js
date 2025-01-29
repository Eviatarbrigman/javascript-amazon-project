import { renderOrderSummery } from './checkout/orderSummery.js';
import { renderPaymentSummery } from './checkout/paymentSummery.js';
import { getCartQuantity } from '../data/cart.js';
import '../data/cart-class.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {
  try {
    await loadProductsFetch();
    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  } catch (error) {
    console.log('Error loading page', error);
  }

  renderOrderSummery();
  renderPaymentSummery();
  renderCheckOut();
}
loadPage();

export function renderCheckOut() {
  const cartQuantity = getCartQuantity();
  document.querySelector('.js-item-count').innerHTML = `${cartQuantity} items`;
}
