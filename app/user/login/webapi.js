/**
 * Created by Colin on 2017/5/22.
 */
import Config from '../../global/config';

export function loginapi(fetch,account,pwd,remPWD) {
    let form = new FormData();
    form.append('user', account);
    form.append('password', pwd);

    let request = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: form
    };
    const res =fetch(`${Config.HOST}/api/100/user/logon`, request, {showLoading: true});
    if(__DEV__){
        console.log('LoginPage fetchApi:' ,res);
    }
    return res;
}