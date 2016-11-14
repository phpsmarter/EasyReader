//@flow

import {applyMiddleware, createStore,compose} from 'redux';
import thunk from 'redux-thunk';
import { Platform } from 'react-native';
import Immutable from 'immutable';
import {reducers} from './ducks';
const createLogger = require('redux-logger');

import { composeWithDevTools } from 'remote-redux-devtools';
const logger = createLogger();
const store = createStore(reducers,
  Immutable.fromJS({}),
  composeWithDevTools(applyMiddleware(
      thunk,
      logger
    ))
);

// 
if (module.hot) {
  // Enable hot module replacement for reducers
  module.hot.accept(() => {
    const nextRootReducer = require('./ducks').reducers;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;


