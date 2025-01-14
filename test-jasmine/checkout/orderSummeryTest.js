// import { renderOrderSummery } from '../../scripts/checkout/orderSummery.js';
// import { loadFromStorage } from '../../data/cart.js';

// describe('test suite: renderOrderSummery', () => {
//   it('displays the cart correctly based on localStorage data', () => {
//     // Arrange: Set up DOM and mock localStorage
//     document.body.innerHTML = `
//       <div class="js-test-container">
//         <div class="js-cart-item-container"></div>
//       </div>
//     `;

//     spyOn(localStorage, 'getItem').and.callFake(() => {
//       return JSON.stringify([
//         {
//           productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//           quantity: 2,
//           deliveryOptionId: '2',
//         },
//         {
//           productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//           quantity: 1,
//           deliveryOptionId: '2',
//         },
//       ]);
//     });

//     loadFromStorage();
//     renderOrderSummery();

//     const cartItems = document.querySelectorAll(
//       '.js-cart-item-container .cart-item'
//     );
//     expect(cartItems.length).toBe(2);

//     const firstItem = cartItems[0];
//     expect(firstItem.querySelector('.product-id').textContent).toBe(
//       'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
//     );
//     expect(firstItem.querySelector('.quantity').textContent).toBe('2');

//     const secondItem = cartItems[1];
//     expect(secondItem.querySelector('.product-id').textContent).toBe(
//       '15b6fc6f-327a-4ec4-896f-486349e85a3d'
//     );
//     expect(secondItem.querySelector('.quantity').textContent).toBe('1');
//   });
// });
