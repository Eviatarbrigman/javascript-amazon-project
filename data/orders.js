export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.push(order);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
