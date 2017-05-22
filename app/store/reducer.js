/**
 * Created by Colin on 2017/5/19.
 */
import { combineReducers } from 'redux';
import LoginReducer from '../user/login/reducer';
import GlobalReducer from '../global/reducer'

export default rootReducer = combineReducers({
    GlobalReducer,
    LoginReducer
})