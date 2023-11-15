import { Action } from './types';

export class Store {
    private state;
    private listeners = [];
    private reducer;
    private middlewares;

    constructor(reducer, initialState = {}, middlewares = []) {
        this.reducer = reducer;
        this.state = initialState;
        this.middlewares = middlewares;
    }

    getState() {
        return this.state;
    }

    dispatch(action: Action) {
        this.middlewares.forEach(middleware => {
            middleware(this)(action);
          });
      
          this.state = this.reducer(this.state, action);
          this.listeners.forEach(listener => listener());
        }

        return dispatch(action);
    }

    subscribe(listener: () => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    loggerMiddleware = store => next => action => {
        console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        return result;
      };
}
