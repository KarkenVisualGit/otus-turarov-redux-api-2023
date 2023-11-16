import { cartReducer, combineReducers } from "../reducers";
import * as ActionTypes from "../types";

describe("cartReducer", () => {
	it("handles ADD_TO_CART action", () => {
		const initialState = { items: [] };
		const action = {
			type: ActionTypes.CartActionTypes.ADD_TO_CART,
			payload: { id: "1", name: "Product 1" },
		};
		const expectedState = {
			items: [{ id: "1", name: "Product 1", quantity: 1 }],
		};

		expect(cartReducer(initialState, action)).toEqual(expectedState);
	});

	it("handles REMOVE_FROM_CART action", () => {
		const initialState = {
			items: [{ id: "1", name: "Product 1", quantity: 2 }],
		};
		const action = {
			type: ActionTypes.CartActionTypes.REMOVE_FROM_CART,
			payload: "1",
		};
		const expectedState = { items: [] };

		expect(cartReducer(initialState, action)).toEqual(expectedState);
	});

	it("handles UPDATE_QUANTITY action", () => {
		const initialState = {
			items: [{ id: "1", name: "Product 1", quantity: 2 }],
		};
		const action = {
			type: ActionTypes.CartActionTypes.UPDATE_QUANTITY,
			payload: { id: "1", quantity: 5 },
		};
		const expectedState = {
			items: [{ id: "1", name: "Product 1", quantity: 5 }],
		};

		expect(cartReducer(initialState, action)).toEqual(expectedState);
	});

	it("handles SELECT_PRODUCT action", () => {
		const initialState = {
			items: [{ id: "1", name: "Product 1", quantity: 2 }],
		};
		const action = {
			type: ActionTypes.CartActionTypes.SELECT_PRODUCT,
			payload: "1",
		};
		const expectedState = {
			items: [{ id: "1", name: "Product 1", quantity: 2, isSelected: true }],
		};

		expect(cartReducer(initialState, action)).toEqual(expectedState);
	});
});

describe("combineReducers", () => {
	it("combines multiple reducers", () => {
		const rootReducer = combineReducers({ cart: cartReducer });
		const initialState = undefined;
		const action = {
			type: ActionTypes.CartActionTypes.ADD_TO_CART,
			payload: { id: "1", name: "Product 1" },
		};
		const expectedState = {
			cart: { items: [{ id: "1", name: "Product 1", quantity: 1 }] },
		};

		expect(rootReducer(initialState, action)).toEqual(expectedState);
	});

	it("should increase the quantity of an existing product in the cart", () => {
		const initialState = {
			items: [{ id: "123", name: "Product 1", quantity: 2 }],
		};
		const action = {
			type: ActionTypes.CartActionTypes.ADD_TO_CART,
			payload: { id: "123", name: "Product 1", quantity: 1 },
		};

		const updatedState = cartReducer(initialState, action);
		const updatedProduct = updatedState.items.find((item) => item.id === "123");

		expect(updatedState.items).toHaveLength(1);
		expect(updatedProduct?.quantity).toBe(3);
	});
});
