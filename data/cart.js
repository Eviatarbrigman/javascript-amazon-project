export const cart = [];

export function addToCart(productId) {
    let matchingItems;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItems = cartItem;
      }
    });
  
    if (matchingItems) {
      matchingItems.quantity += 1;
    } else {
      cart.push({ productId: productId, quantity: 1 });
    }
  }
