type State = { counter: number; };
type Action = { type: string; };

type Reducer = (state: State, action: Action) => State;

function createStore(reducer: Reducer, initialState: State) {
    var currentReducer = reducer;
    var currentState = initialState;
}