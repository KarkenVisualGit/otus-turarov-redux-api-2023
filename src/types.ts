export enum ActionTypesCart {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  SELECT_PRODUCT = "SELECT_PRODUCT",
  UPDATE_QUANTITY = "UPDATE_QUANTITY",
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Action<T = any> {
  type: T;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  payload?: any;
}
