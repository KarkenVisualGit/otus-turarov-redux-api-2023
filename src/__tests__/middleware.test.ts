// confirmationMiddleware.test.ts
import { confirmationMiddleware, loggerMiddleware } from "../middleware";
import { Store } from "../store";
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

describe("loggerMiddleware", () => {
	it("logs the action and next state", () => {
		const fakeStore = {
			getState: jest.fn(() => ({ some: "state" })),
		};
		const next = jest.fn();
		const action: Action = { type: "TEST_ACTION" };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const logger = loggerMiddleware(fakeStore as any);

		const consoleSpy = jest.spyOn(console, "log");

		logger(next)(action);

		expect(consoleSpy).toHaveBeenCalledWith("dispatching", action);
		expect(next).toHaveBeenCalledWith(action);
		expect(consoleSpy).toHaveBeenCalledWith("next state", fakeStore.getState());

		consoleSpy.mockRestore();
	});
});
