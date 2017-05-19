/**
 * Created by Colin on 2017/5/19.
 */
import * as types from './actionType';

export function accountChange(account) {
    return{
        type:types.ACCOUNTCHANGE,
        account:account
    }
}

export function accountClear() {
    return{
        type:types.ACCOUNTCHANGE,
        account:''
    }
}