import { Store } from './store';
import { addToCart, removeFromCart, updateQuantity } from './actions'

const store = new Store();


function renderCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    store.getState().cart.forEach(product => {
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
            const productId = event.target.parentElement.dataset.id;
            store.dispatch(addToCart({ id: productId, name: `Товар ${productId}`, quantity: 1 }));
        });
    });
}

function attachCartEventListeners() {
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            store.dispatch(removeFromCart(productId));
        });
    });

    document.querySelectorAll('.product-quantity').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.dataset.id;
            const quantity = parseInt(event.target.value, 10);
            store.dispatch(updateQuantity(productId, quantity));
        });
    });
}

store.subscribe(renderCart);


attachEventListeners();
renderCart();
