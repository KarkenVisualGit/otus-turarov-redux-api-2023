import { ActionTypesCart, CartItem } from "./types";

export const addToCart = (item: CartItem) => ({
  type: ActionTypesCart.ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (id: string) => ({
  type: ActionTypesCart.REMOVE_FROM_CART,
  payload: id,
});

export const selectProduct = (id: string) => ({
  type: ActionTypesCart.SELECT_PRODUCT,
  payload: id,
});

export const updateQuantity = (id: string, quantity: number) => ({
  type: ActionTypesCart.UPDATE_QUANTITY,
  payload: { id, quantity },
});
