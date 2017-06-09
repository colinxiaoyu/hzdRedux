/**
 * Created by Colin on 2017/5/22.
 */
import {Config,CLFetch} from 'colinkit';
import {NativeModules} from 'react-native';

export function loginapi(account,pwd) {
    let form = new FormData();
    form.append('mobile', account);
    form.append('password', pwd);
    let request = {
        method: 'POST',
        body: form,
    };
    return CLFetch(`${Config.HOST}/api/100/user/logon`,request, {showLoading: true});
}

