import { Store } from "./Store";
import { Action } from "./types";

export const loggerMiddleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store: Store) => (next: (action: Action) => void) => (action: Action) => {
    const result = next(action);
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
