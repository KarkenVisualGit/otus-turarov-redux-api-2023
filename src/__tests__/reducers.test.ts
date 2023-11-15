import { cartReducer } from '../reducers';
import * as ActionTypes from '../types';

describe('cartReducer', () => {
    it('handles ADD_TO_CART action', () => {
        const initialState = { items: [] };
        const action = {
            type: ActionTypes.CartActionTypes
                .ADD_TO_CART, payload: { id: '1', name: 'Product 1' }
        };
        const expectedState = { items: [{ id: '1', name: 'Product 1', quantity: 1 }] };

        expect(cartReducer(initialState, action)).toEqual(expectedState);
    });

    it('handles REMOVE_FROM_CART action', () => {
        const initialState = { items: [{ id: '1', name: 'Product 1', quantity: 2 }] };
        const action = { type: ActionTypes.CartActionTypes.REMOVE_FROM_CART, payload: '1' };
        const expectedState = { items: [] };

        expect(cartReducer(initialState, action)).toEqual(expectedState);
    });

    it('handles UPDATE_QUANTITY action', () => {
        const initialState = { items: [{ id: '1', name: 'Product 1', quantity: 2 }] };
        const action = {
            type: ActionTypes.CartActionTypes
                .UPDATE_QUANTITY, payload: { id: '1', quantity: 5 }
        };
        const expectedState = { items: [{ id: '1', name: 'Product 1', quantity: 5 }] };

        expect(cartReducer(initialState, action)).toEqual(expectedState);
    });


    it('handles SELECT_PRODUCT action', () => {
        const initialState = { items: [{ id: '1', name: 'Product 1', quantity: 2 }] };
        const action = { type: ActionTypes.CartActionTypes.SELECT_PRODUCT, payload: '1' };
        const expectedState = {
            items: [{ id: '1', name: 'Product 1', quantity: 2, isSelected: true }]
        };

        expect(cartReducer(initialState, action)).toEqual(expectedState);
    });


});
