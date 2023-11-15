import { Store } from "./store";
import { Action } from "./types";

export const loggerMiddleware =
  (store: Store) => (next: (action: Action) => void) => (action: Action) => {
  	console.log("dispatching", action);
  	const result = next(action);
  	console.log("next state", store.getState());
  	return result;
  };

export const confirmationMiddleware =
  (store: Store) => (next: (action: Action) => void) => (action: Action) => {
  	if (action.type === "REMOVE_FROM_CART") {
  		const confirmRemoval = window.confirm(
  			"Вы уверены, что хотите удалить этот товар из корзины?"
  		);
  		if (!confirmRemoval) return;
  	}

  	if (action.type === "UPDATE_QUANTITY") {
  		const confirmUpdate = window.confirm(
  			"Вы уверены, что хотите изменить количество этого товара?"
  		);
  		if (!confirmUpdate) return;
  	}

  	return next(action);
  };
