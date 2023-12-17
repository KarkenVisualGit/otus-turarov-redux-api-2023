// confirmationMiddleware.test.ts
import { confirmationMiddleware, loggerMiddleware } from "../middleware";
import { Store } from "../Store";
import { Action } from "../types";

describe("confirmationMiddleware", () => {
  it("confirms action before dispatching", () => {
    const store = { getState: jest.fn() } as unknown as Store;
    const next = jest.fn();
    const action: Action = { type: "REMOVE_FROM_CART" };

    window.confirm = jest.fn(() => true);

    const middleware = confirmationMiddleware(store)(next);
    middleware(action);

    expect(window.confirm).toHaveBeenCalledWith(
      "Вы уверены, что хотите удалить этот товар из корзины?"
    );
    expect(next).toHaveBeenCalledWith(action);

    (window.confirm as jest.Mock).mockRestore();
  });
});
