import { Store } from "../Store";
import { cartReducer, combineReducers } from "../reducers";
import { addToCart, removeFromCart, updateQuantity } from "../actions";

describe("Store", () => {
  let store: Store;
  beforeEach(() => {
    const initialState = {
      cart: {
        items: [{ id: "123", name: "Product 1", quantity: 2 }],
      },
    };
    store = new Store(combineReducers({ cart: cartReducer }), initialState, []);
  });

  it("should handle adding to cart", () => {
    store.dispatch(addToCart({ id: "124", name: "Product 2", quantity: 1 }));
    expect(store.getState().cart.items).toHaveLength(2);
  });

  it("should handle removing from cart", () => {
    store.dispatch(removeFromCart("123"));
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("should handle updating quantity", () => {
    store.dispatch(updateQuantity("123", 5));
    expect(store.getState().cart.items[0].quantity).toBe(5);
  });
});
