export type State = { counter: number; };
export type Action = { type: string; payload?: number;};
export type Listener = () => void;

export type Reducer = (state: State, action: Action) => State;

export function createStore(reducer: Reducer, initialState: State) {
    let currentReducer = reducer;
    let currentState = initialState;
    let listener: Listener = () => {};

    return {
        getState(): State {
            return currentState;
        },
        dispatch(action: Action): Action {
            currentState = currentReducer(currentState, action);
            listener();
            return action;
        },
        subscribe(newListener: Listener): void {
            listener = newListener;
        }
    };
}