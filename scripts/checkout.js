import { renderOrderSummery } from './checkout/orderSummery.js';
import { renderPaymentSummery } from './checkout/paymentSummery.js';
import { getCartQuantity } from '../data/cart.js';
import '../data/cart-class.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummery();
  renderPaymentSummery();
  renderCheckOut();
});

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });
// })
//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummery();
//     renderPaymentSummery();
//     renderCheckOut();
//   });

export function renderCheckOut() {
  const cartQuantity = getCartQuantity();
  document.querySelector('.js-item-count').innerHTML = `${cartQuantity} items`;
}
