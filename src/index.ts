import { Store, AppState } from "./store";
import { cartReducer, combineReducers } from "./reducers";
import { addToCart, removeFromCart, updateQuantity } from "./actions";
import { confirmationMiddleware, loggerMiddleware } from "./middleware";
import "./style/style.css";
/* eslint-disable @typescript-eslint/no-shadow */
const initialState: AppState = {
	cart: {
		items: [{ id: "123", name: "Product 1", quantity: 2 }],
	},
};
const rootReducer = combineReducers({ cart: cartReducer });
const store = new Store(rootReducer, initialState, [
	confirmationMiddleware,
	loggerMiddleware,
]);

export function attachCartEventListeners(store: Store) {
	document.querySelectorAll(".remove-from-cart").forEach((button) => {
		button.addEventListener("click", (event) => {
			const target = event.target as HTMLButtonElement;
			const productId = target.dataset.id;
			if (productId) {
				store.dispatch(removeFromCart(productId));
			} else {
				console.error("Product ID is undefined");
			}
		});
	});

	document.querySelectorAll(".product-quantity").forEach((element) => {
		const input = element as HTMLInputElement;
		let prevValue = input.value;

		input.addEventListener("focus", () => {
			prevValue = input.value;
		});
		input.addEventListener("change", (event) => {
			const target = event.target as HTMLInputElement;
			const productId = target.dataset.id;
			const newQuantity = parseInt(target.value, 10);

			if (!productId || newQuantity <= 0) {
				target.value = prevValue;
				return;
			}

			store.dispatch(updateQuantity(productId, newQuantity));
		});
	});
}

export function renderCart(store: Store) {
	const cartElement = document.getElementById("cart");
	if (!cartElement) return;
	cartElement.innerHTML = "";

	store.getState().cart.items.forEach((product) => {
		const productElement = document.createElement("div");
		productElement.innerHTML = `
          <span>${product.name}</span>
          <button class="remove-from-cart" data-id="${product.id}">Удалить</button>
          <input type="number" value="${product.quantity}" 
            data-id="${product.id}" class="product-quantity">
      `;
		cartElement.appendChild(productElement);
	});

	attachCartEventListeners(store);
}

export function attachEventListeners(store: Store) {
	document.querySelectorAll(".add-to-cart").forEach((button) => {
		button.addEventListener("click", (event) => {
			const target = event.target as HTMLButtonElement;
			if (target.parentElement) {
				const productId = target.parentElement.dataset.id;
				if (productId) {
					store.dispatch(
						addToCart({
							id: productId,
							name: `Товар ${productId}`,
							quantity: 1,
						})
					);
				} else {
					console.error("Product ID is undefined");
				}
			}
		});
	});
}

store.subscribe(() => {
	renderCart(store);
});

attachEventListeners(store);
renderCart(store);
