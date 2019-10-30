import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import rooms from '../_reducers/room';
import customers from '../_reducers/customer';
import users from '../_reducers/setting';

//global state
const rootReducer = combineReducers({
  rooms,
  customers,
  users,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
