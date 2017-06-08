/**
 * Created by Colin on 2017/6/9.
 */
import {Config,CLFetch} from 'colinkit';


export function logout(account,pwd) {
    let request = {
        method: 'POST',
    };
    return CLFetch(`${Config.HOST}rest/api/100/user/exitLogon`,request, {showLoading: true});
}