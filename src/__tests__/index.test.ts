import { cartReducer } from "../reducers";
import { addToCart, removeFromCart, updateQuantity } from "../actions";
import { Store } from "../store";

import {
	attachEventListeners,
	attachCartEventListeners,
	renderCart,
} from "../index";

jest.mock("../store");

describe("DOM Event Listeners", () => {
	let mockStore: jest.Mocked<Store>;
	beforeEach(() => {
		document.body.innerHTML = `
      <div id="product-list">
        <div class="product" data-id="1">
          <span>Товар 1</span>
          <button class="add-to-cart">Добавить в корзину</button>
        </div>
      </div>
      <<div id="cart"></div>
      <button class="remove-from-cart" data-id="123">Remove from Cart</button>
      <input type="number" class="product-quantity" data-id="123" value="2">
    `;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mockStore = new Store(jest.fn(), { cart: { items: [] } }, []) as any;
		mockStore.dispatch.mockImplementation(() => {});
		mockStore.getState.mockReturnValue({ cart: { items: [] } });
	});

	it("should call store.dispatch when add-to-cart button is clicked", () => {
		attachEventListeners(mockStore);
		const addButton = document.querySelector(".add-to-cart");
		expect(addButton).not.toBeNull();
		addButton?.dispatchEvent(new MouseEvent("click"));
		expect(mockStore.dispatch).toHaveBeenCalledWith(
			addToCart({
				id: "1",
				name: "Товар 1",
				quantity: 1,
			})
		);
	});

	it("should call store.dispatch when remove-from-cart is clicked", () => {
		attachCartEventListeners(mockStore);
		const removeButton = document.querySelector(".remove-from-cart");
		expect(removeButton).not.toBeNull();
		removeButton?.dispatchEvent(new MouseEvent("click"));
		expect(mockStore.dispatch).toHaveBeenCalledWith(removeFromCart("123"));
	});

	it("should call store.dispatch when product quantity is changed", () => {
		attachCartEventListeners(mockStore);
		const input = document.querySelector(
			".product-quantity"
		) as HTMLInputElement;
		input.value = "3";
		input.dispatchEvent(new Event("change"));
		expect(mockStore.dispatch).toHaveBeenCalledWith(updateQuantity("123", 3));
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

describe("renderCart", () => {
	let mockStore: jest.Mocked<Store>;

	beforeEach(() => {
		document.body.innerHTML = "<div id=\"cart\"></div>";
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mockStore = new Store(jest.fn(), { cart: { items: [] } }, []) as any;
		mockStore.getState = jest.fn().mockReturnValue({
			cart: {
				items: [
					{ id: "123", name: "Product 1", quantity: 2 },
					{ id: "124", name: "Product 2", quantity: 3 },
				],
			},
		});
	});

	it("should render cart items correctly", () => {
		renderCart(mockStore);
		const cartElement = document.getElementById("cart");
		if (!cartElement) return;
		const cartItems = cartElement.querySelectorAll("div");
		const firstItem = cartItems[0].innerHTML;
		const secondItem = cartItems[1].innerHTML;

		expect(cartItems).toHaveLength(2);
		expect(firstItem).toContain("Product 1");
		expect(firstItem).toContain("value=\"2\"");
		expect(secondItem).toContain("Product 2");
		expect(secondItem).toContain("value=\"3\"");
	});
});
