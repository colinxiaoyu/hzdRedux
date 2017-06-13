/**
 * Created by Colin on 2017/6/9.
 */
import * as type from './actionType'

export function changeLoginState(loginState) {
    return {
        type:type.CHANGEPAGE,
        currentState:loginState
    }
}