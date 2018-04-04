import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  promiseMidlleware from 'redux-promise'
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app';
import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(promiseMidlleware),
  // other store enhancers if any
));


//const createStoreWithMiddleware = applyMiddleware(promiseMidlleware)(createStore);

ReactDOM.render(
 // <Provider store={createStoreWithMiddleware(reducers)}>
 <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container-fluid'));
