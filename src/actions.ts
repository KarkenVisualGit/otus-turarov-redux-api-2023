import { CartActionTypes, CartItem } from "./types";

export const addToCart = (item: CartItem) => ({
	type: CartActionTypes.ADD_TO_CART,
	payload: item,
});

export const removeFromCart = (id: string) => ({
	type: CartActionTypes.REMOVE_FROM_CART,
	payload: id,
});

export const selectProduct = (id: string) => ({
	type: CartActionTypes.SELECT_PRODUCT,
	payload: id,
});

export const updateQuantity = (id: string, quantity: number) => ({
	type: CartActionTypes.UPDATE_QUANTITY,
	payload: { id, quantity },
});
