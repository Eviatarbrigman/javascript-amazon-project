import { loadProductsFetch, productsList } from '../data/products.js';

class Order {
  constructor(id, customerId, productIds, totalPrice) {
    this.id = id;
    this.customerId = customerId;
    this.productIds = productIds;
    this.totalPrice = totalPrice;
  }

  static fromJson(json) {
    return new Order(
      json.id,
      json.customerId,
      json.productIds,
      json.totalPrice
    );
  }

  toJson() {
    return {
      id: this.id,
      customerId: this.customerId,
      productIds: this.productIds,
      totalPrice: this.totalPrice,
    };
  }
}

export function loadOrdersFetch() {
  return fetch('http://localhost:8081/api/orders')
    .then((response) => response.json())
    .then((data) => {
      return data.map(
        (orderDetails) =>
          new Order(
            orderDetails.id,
            orderDetails.customerId,
            orderDetails.productIds || [], // Ensure productIds is always an array
            orderDetails.totalPrice
          )
      );
    })
    .catch((error) => {
      console.error('Failed to load orders', error);
      return [];
    });
}

export function addOrder(order) {
  // orders.push(order);
  console.log(order);

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function loadOrders() {
  loadOrdersFetch().then((orders) => {
    let ordersHTML = orders
      .map((order) => {
        console.log(order); // Debugging: Ensure order structure is correct
        console.log(order.productIds); // Debugging: Ensure productIds exists

        return `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>Wed Jan 29 2025 </div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(order.totalPrice / 100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${
              Array.isArray(order.productIds)
                ? order.productIds
                    .map((productId) => {
                      const currentProduct = productsList.find(
                        (product) => product.id === productId
                      );

                      // Check if product exists before accessing properties
                      if (!currentProduct) {
                        return `<div class="product-details">Product not found</div>`;
                      }

                      return `
                      <div class="product-image-container">
                        <img src="${currentProduct.image}" />
                      </div>

                      <div class="product-details">
                        <div class="product-name">${currentProduct.name}</div>
                        <div class="product-delivery-date">Arriving on: ${order.deliveryDate}</div>
                        <div class="product-quantity">Quantity: 1 </div>
                        <button class="buy-again-button button-primary">
                          <img class="buy-again-icon" src="images/icons/buy-again.png" />
                          <span class="buy-again-message">Buy it again</span>
                        </button>
                      </div>

                      <div class="product-actions">
                        <a href="tracking.html">
                          <button class="track-package-button button-secondary">
                            Track package
                          </button>
                        </a>
                      </div>
                      `;
                    })
                    .join('')
                : '<div>No products available.</div>'
            }
          </div>
        </div>
        `;
      })
      .join('');

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadOrders();
});
