import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

let createStoreWithMiddleware;
let middleware = [thunk];

if (__DEBUG__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    devTools(),
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
}

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
