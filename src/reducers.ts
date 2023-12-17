import { CartState, Action } from "./types";
import * as ActionTypes from "./types";

interface AppState {
  cart: CartState;
}
type AppStateKeys = keyof AppState;

type Reducer<S, A> = (state: S | undefined, action: A) => S;

const actionType = ActionTypes.ActionTypesCart;

interface ReducersMapObject {
  [key: string]: Reducer<CartState, Action>;
  cart: Reducer<CartState, Action>;
}

export const cartReducer = (
  /* eslint-disable default-param-last */
  state: CartState = { items: [] },
  action: Action
) => {
  switch (action.type) {
    case actionType.ADD_TO_CART: {
      const existingProductIndex = state.items.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        return {
          ...state,
          items: state.items.map((product, index) =>
            index === existingProductIndex
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload),
      };

    case actionType.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };

    case actionType.SELECT_PRODUCT:
      return {
        ...state,
        items: state.items.map((product) =>
          product.id === action.payload
            ? { ...product, isSelected: true }
            : { ...product, isSelected: false }
        ),
      };

    default:
      return state;
  }
};

export const combineReducers =
  (reducers: ReducersMapObject) =>
  (
    state: AppState | undefined = { cart: { items: [] } },
    action: Action
  ): AppState =>
    Object.keys(reducers).reduce((nextState: AppState, key: string) => {
      const reducerKey = key as AppStateKeys;

      const reducer = reducers[reducerKey];
      const previousStateForKey = state[reducerKey];
      const nextStateForKey = reducer(previousStateForKey, action);

      return { ...nextState, [reducerKey]: nextStateForKey };
    }, {} as AppState);
