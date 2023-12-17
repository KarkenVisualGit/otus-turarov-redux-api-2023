import { Store } from "./Store";
import { Action } from "./types";

export const loggerMiddleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store: Store) => (next: (action: Action) => void) => (action: Action) => {
    // eslint-disable-next-line no-console
    console.log("dispatching", action);
    const result = next(action);
    // eslint-disable-next-line no-console
    console.log("next state", store.getState());
    return result;
  };

export const confirmationMiddleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store: Store) => (next: (action: Action) => void) => (action: Action) => {
    if (action.type === "REMOVE_FROM_CART") {
      // eslint-disable-next-line no-alert
      const confirmRemoval = window.confirm(
        "Вы уверены, что хотите удалить этот товар из корзины?"
      );
      if (!confirmRemoval) return undefined;
    }

    return next(action);
  };
