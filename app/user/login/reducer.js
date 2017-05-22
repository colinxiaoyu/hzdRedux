/**
 * Created by Colin on 2017/5/19.
 */
import * as types from './actionType';

const initState = {
    account:'',
    pwd:'',
    eyeOpen:false,
    PWDRem:false,
};

export default function LoginReducer(state = initState,action) {
    switch (action.type){
        case types.ACCOUNTCHANGE:
            return Object.assign(
                {},state,{
                    account:action.account
                }
            );
        break;
        case types.CLEARACCOUNT:
            return Object.assign(
                {},state,{
                    account:action.account
                }
            );
        case types.PWDCHANGE:
            return Object.assign(
                {},state,{
                    pwd:action.pwd
                }
            );
        case types.CLEARPWD:
            return Object.assign(
                {},state,{
                    pwd:action.pwd
                }
            );
        case types.EYEOPEN:
            return Object.assign(
                {},state,{
                    eyeOpen:action.eyeOpen
                }
            );
        case types.PWDREMEMBER:
            return Object.assign(
                {},state,{
                    PWDRem:action.PWDRem
                }
            );
        default:
            return state;
    }
}