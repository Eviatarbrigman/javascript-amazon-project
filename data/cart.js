export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
    cart.push({ productId: productId, quantity: 1, deliveryOptionId: "1" });
  }
  saveToStorage();
}

export function deleteItemFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
  console.log(cart);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItems;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItems = cartItem;
    }
  });

  matchingItems.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
