/**
 * Created by Colin on 2017/5/19.
 */
import { combineReducers } from 'redux';
import LoginReducer from '../login/reducer';
import MainReducer from '../main/reducer';
import UserReducer from '../user/reducer';

export default rootReducer = combineReducers({
    LoginReducer,
    MainReducer,
    UserReducer,
})