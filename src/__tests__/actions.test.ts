// actions.test.ts
import {
	addToCart,
	removeFromCart,
	selectProduct,
	updateQuantity,
} from "../actions";
import { CartActionTypes } from "../types";

describe("Cart actions", () => {
	it("creates an action to add a product to the cart", () => {
		const item = { id: "1", name: "Product 1", quantity: 1 };
		const expectedAction = {
			type: CartActionTypes.ADD_TO_CART,
			payload: item,
		};

		expect(addToCart(item)).toEqual(expectedAction);
	});

	it("creates an action to remove a product from the cart", () => {
		const productId = "1";
		const expectedAction = {
			type: CartActionTypes.REMOVE_FROM_CART,
			payload: productId,
		};

		expect(removeFromCart(productId)).toEqual(expectedAction);
	});

	it("creates an action to select a product", () => {
		const productId = "1";
		const expectedAction = {
			type: CartActionTypes.SELECT_PRODUCT,
			payload: productId,
		};

		expect(selectProduct(productId)).toEqual(expectedAction);
	});

	it("creates an action to update the quantity of a product", () => {
		const productId = "1";
		const quantity = 3;
		const expectedAction = {
			type: CartActionTypes.UPDATE_QUANTITY,
			payload: { id: productId, quantity },
		};

		expect(updateQuantity(productId, quantity)).toEqual(expectedAction);
	});
});
