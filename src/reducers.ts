import { CartActionTypes, CartState, Action, CartItem } from './types';

interface AppState {
    cart: CartState;
}
type AppStateKeys = keyof AppState;

type Reducer<S, A> = (state: S | undefined, action: A) => S;

interface ReducersMapObject {
    [key: string]: Reducer<CartState, Action>;
    cart: Reducer<CartState, Action>;
}

export const cartReducer = (state: CartState = { items: [] }, action: Action) => {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            const existingProductIndex = state.items.findIndex(product => product.id === action.payload.id);
            if (existingProductIndex !== -1) {
                return {
                    ...state,
                    items: state.items.map((product, index) =>
                        index === existingProductIndex
                            ? { ...product, quantity: product.quantity + 1 }
                            : product
                    )
                };
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };

        case CartActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(product => product.id !== action.payload)
            };

        case CartActionTypes.UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map(product =>
                    product.id === action.payload.id
                        ? { ...product, quantity: action.payload.quantity } : product
                )
            };

        case CartActionTypes.SELECT_PRODUCT:
            return {
                ...state,
                items: state.items.map(product =>
                    product.id === action.payload
                        ? { ...product, isSelected: true }
                        : { ...product, isSelected: false }
                )
            };

        default:
            return state;
    }
};

export const combineReducers = (reducers: ReducersMapObject) => {
    return (state: AppState | undefined = { cart: { items: [] } }, action: Action): AppState => {
        return Object.keys(reducers).reduce((nextState: AppState, key: string) => {
            if (key in state) {
                const reducerKey = key as AppStateKeys;
                const reducer = reducers[reducerKey];
                const previousStateForKey = state[reducerKey];
                const nextStateForKey = reducer(previousStateForKey, action);
                nextState[reducerKey] = nextStateForKey;
            }
            return nextState;
        }, {} as AppState);
    };
};

