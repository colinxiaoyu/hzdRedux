/**
 * Created by Colin on 2017/5/19.
 */
import * as types from './actionType';

const initState = {
    account: '',
    pwd: '',
    eyeOpen: false,
    PWDRem: false,
    res: ''
};

export default function LoginReducer(state = initState, action) {
    switch (action.type) {
        case types.ACCOUNTCHANGE:
            return Object.assign(
                {}, state, {
                    account: action.account
                }
            );
            break;
        case types.CLEARACCOUNT:
            return Object.assign(
                {}, state, {
                    account: action.account
                }
            );
            break;
        case types.PWDCHANGE:
            return Object.assign(
                {}, state, {
                    pwd: action.pwd
                }
            );
            break;
        case types.CLEARPWD:
            return Object.assign(
                {}, state, {
                    pwd: action.pwd
                }
            );
            break;
        case types.EYEOPEN:
            return Object.assign(
                {}, state, {
                    eyeOpen: action.eyeOpen
                }
            );
            break;
        case types.PWDREMEMBER:
            return Object.assign(
                {}, state, {
                    PWDRem: action.PWDRem
                }
            );
            break;
        case types.LOGIN:
            return Object.assign(
                {}, state, {
                    res: action.res
                }
            );
            break;
        default:
            return state;
            break;
    }
}