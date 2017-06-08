/**
 * Created by Colin on 2017/5/19.
 */
import { combineReducers } from 'redux';
import LoginReducer from '../user/login/reducer';
import MainReducer from '../main/reducer'

export default rootReducer = combineReducers({
    LoginReducer,
    MainReducer,
})