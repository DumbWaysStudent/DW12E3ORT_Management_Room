import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import rooms from '../_reducers/room';

//global state
const rootReducer = combineReducers({
  rooms,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
