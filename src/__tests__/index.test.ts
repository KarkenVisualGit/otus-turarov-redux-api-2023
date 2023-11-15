// reducers.test.ts
import { cartReducer } from '../reducers';
import { addToCart, removeFromCart, updateQuantity } from '../actions';

describe('cartReducer', () => {
  it('should handle ADD_TO_CART', () => {
    const initialState = { items: [] };
    const action = addToCart({ id: '123', name: 'Product 1', quantity: 1 });
    const expectedState = { items: [{ id: '123', name: 'Product 1', quantity: 1 }] };

    expect(cartReducer(initialState, action)).toEqual(expectedState);
  });

  // Добавьте дополнительные тесты для REMOVE_FROM_CART и UPDATE_QUANTITY
});
