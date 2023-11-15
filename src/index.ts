import { Store, AppState } from './store';
import { cartReducer, combineReducers } from './reducers';
import { addToCart, removeFromCart, updateQuantity } from './actions'
import "./style/style.css";

const initialState: AppState = {
  cart: {
    items: []
  }
};
const rootReducer = combineReducers({ cart: cartReducer });
const store = new Store(rootReducer, initialState);


function renderCart() {
  const cartElement = document.getElementById('cart');
  if (!cartElement) return;
  cartElement.innerHTML = '';

  store.getState().cart.items.forEach(product => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `
          <span>${product.name}</span>
          <button class="remove-from-cart" data-id="${product.id}">Удалить</button>
          <input type="number" value="${product.quantity}" data-id="${product.id}" class="product-quantity">
      `;
    cartElement.appendChild(productElement);
  });

  attachCartEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      if (target.parentElement) {
        const productId = target.parentElement.dataset.id;
        if (productId) {
          store.dispatch(addToCart({ id: productId, name: `Товар ${productId}`, quantity: 1 }));
        } else {
          console.error("Product ID is undefined");
        }
      }
    });
  });
}

function attachCartEventListeners() {
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      const productId = target.dataset.id;
      if (productId) {
        store.dispatch(removeFromCart(productId));
      } else {

        console.error("Product ID is undefined");
      }
    });
  });

  document.querySelectorAll('.product-quantity').forEach(input => {
    input.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      const productId = target.dataset.id;
      const quantity = parseInt(target.value, 10);
      if (productId && quantity > 0) {
        store.dispatch(updateQuantity(productId, quantity));
      } else {
        console.error("Product ID is undefined");
        target.value = '1';
      }
    });
  });
}

store.subscribe(renderCart);


attachEventListeners();
renderCart();
