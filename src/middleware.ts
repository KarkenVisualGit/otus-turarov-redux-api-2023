import { Store } from './store';
import { Action } from './types';

export const loggerMiddleware = (store: Store) => (next: (action: Action) => void) => (action: Action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

export const confirmationMiddleware = (store: Store) => (next: (action: Action) => void) => (action: Action) => {

};
