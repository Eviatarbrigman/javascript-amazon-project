function Cart(loacalStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(loacalStorageKey));
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '2',
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2',
          },
        ];
      }
    },
    saveToStorage() {
      localStorage.setItem(loacalStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItems;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItems = cartItem;
        }
      });

      if (matchingItems) {
        matchingItems.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1',
        });
      }
      this.saveToStorage();
    },
    deleteItemFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();
      console.log(this.cartItems);
    },
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItems;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItems = cartItem;
        }
      });

      matchingItems.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },

    getCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },
  };
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

console.log(cart);
console.log(businessCart);
