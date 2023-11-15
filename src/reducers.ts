import { CartActionTypes, CartState, Action } from './types';

interface AppState {
    cart: CartState;
}

type Reducer<S, A> = (state: S | undefined, action: A) => S;

interface ReducersMapObject {
    cart: Reducer<CartState, Action>;
}

export const cartReducer = (state: CartState = { items: [] }, action: Action) => {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            const existingProduct = state.find(product => product.id === action.payload.id);
            if (existingProduct) {
                return state.map(product =>
                    product.id === action.payload.id ? { ...product, quantity: product.quantity + 1 } : product
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];

        case CartActionTypes.REMOVE_FROM_CART:
            return state.filter(product => product.id !== action.payload);

        case CartActionTypes.UPDATE_QUANTITY:
            return state.map(product =>
                product.id === action.payload.productId ? { ...product, quantity: action.payload.quantity } : product
            );
        case CartActionTypes.SELECT_PRODUCT:
            return state.map(product =>
                product.id === action.payload ? { ...product, isSelected: true } : { ...product, isSelected: false }
            );

        default:
            return state;
    }
};

export const combineReducers = (reducers: ReducersMapObject) => {
    return (state: AppState | undefined = {}, action: Action): AppState => {
        return Object.keys(reducers).reduce((nextState: AppState, key: string) => {
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            return nextState;
        }, {} as AppState);
    };
};

