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
        type:types.CLEARACCOUNT,
        account:''
    }
}

export function pwdChange(pwd) {
    return{
        type:types.PWDCHANGE,
        pwd:pwd
    }
}
export function pwdClear() {
    return{
        type:types.CLEARPWD,
        pwd:''
    }
}

export function changeEye(eye) {
    return{
        type:types.EYEOPEN,
        eyeOpen:!eye
    }
}

export function rememberPWD(isRem) {
    return{
        type:types.PWDREMEMBER,
        PWDRem:isRem
    }
}

export function login(res) {
    return{
        type:types.LOGIN,
        res:res
    }
}

