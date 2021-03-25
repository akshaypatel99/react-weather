import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import weatherReducer from './reducers/weatherReducer';

const reducer = weatherReducer;

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
