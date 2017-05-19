/**
 * Created by Colin on 2017/5/19.
 */
import * as types from './actionType';

const initState = {
    account:'初始化的account'
};

export default function LoginReducer(state = initState,action) {
    switch (action.type){
        case types.ACCOUNTCHANGE:
            return Object.assign(
                {},state,{
                    account:action.account
                }
            )
        break;
        case types.CLEARACCOUNT:
            return Object.assign(
                {},state,{
                    account:action.account
                }
            )
        default:
            return state;
    }
}