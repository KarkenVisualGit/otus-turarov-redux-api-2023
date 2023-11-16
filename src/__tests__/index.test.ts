import { cartReducer } from "../reducers";
import { addToCart , removeFromCart, updateQuantity } from "../actions";
import { Store } from "../store";

import {
	attachEventListeners,
	attachCartEventListeners,
	renderCart,
} from "../index";

describe("DOM Event Listeners", () => {
	let mockStore: any;
	beforeEach(() => {
		document.body.innerHTML = `
      <div id="cart"></div>
      <button class="add-to-cart" data-id="124">Add to Cart</button>
    `;
		mockStore = {
			dispatch: jest.fn(),
		};
	});

	it("should call store.dispatch when remove-from-cart is clicked", () => {
		attachCartEventListeners(mockStore);
		const removeButton = document.querySelector(".remove-from-cart");
		if (removeButton) {
			removeButton.dispatchEvent(new MouseEvent("click"));
			expect(mockStore.dispatch).toHaveBeenCalledWith(removeFromCart("123"));
		}
	});

	it("should call store.dispatch when product quantity is changed", () => {
		attachCartEventListeners(mockStore);
		const input = document.querySelector(
			".product-quantity"
		) as HTMLInputElement;
		if (input) {
			input.value = "3";
			input.dispatchEvent(new Event("change"));
			expect(mockStore.dispatch).toHaveBeenCalledWith(updateQuantity("123", 3));
		}
	});
});

describe("cartReducer", () => {
	it("should handle ADD_TO_CART", () => {
		const initialState = { items: [] };
		const action = addToCart({ id: "123", name: "Product 1", quantity: 1 });
		const expectedState = {
			items: [{ id: "123", name: "Product 1", quantity: 1 }],
		};

		expect(cartReducer(initialState, action)).toEqual(expectedState);
	});
});
