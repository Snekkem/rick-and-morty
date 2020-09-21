import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./auth-reducer";
import cardReducer from "./card-reducer";
import adminReducer from "./admin-reducer";
import auctionReducer from "./auction-reducer";

const reducers = combineReducers({
    authReducer,
    cardReducer,
    adminReducer,
    auctionReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store