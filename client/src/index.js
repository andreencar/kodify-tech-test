import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import './index.css';

import ChatReducer from './reducers/ChatReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(ChatReducer, applyMiddleware(thunk));

ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();
