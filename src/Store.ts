import { Action, CartState } from './types';

export interface AppState {
    cart: CartState;
  }

type State = AppState;
type Listener = () => void;
type Middleware = (store: Store) => (next: Dispatch) => (action: Action) => void;
type Dispatch = (action: Action) => void;
type Reducer = (state: State, action: Action) => State;

export class Store {
    private state: State;
    private listeners: Listener[] = [];
    private reducer: Reducer;
    private middlewares: Middleware[];

    constructor(reducer: Reducer, initialState: State = { cart: { items: [] } }, middlewares: Middleware[] = []) {
        this.reducer = reducer;
        this.state = initialState;
        this.middlewares = middlewares;
    }

    getState(): State {
        return this.state;
    }

    dispatch(action: Action): void {
        const chain = this.middlewares.map(middleware => middleware(this));
        let dispatch: Dispatch = this.rawDispatch.bind(this);
        chain.reverse().forEach(middleware => {
            dispatch = middleware(dispatch);
        });


        dispatch(action);
    }

    private rawDispatch(action: Action): void {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener());
    }

    subscribe(listener: Listener): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}
