/**
 * Created by Colin on 2017/5/22.
 */
import Config from '../../global/config';
import {NativeModules} from 'react-native'

export function loginapi(fetch,account,pwd) {

    let md5Password = null;
    NativeModules.Md5.getMd5(pwd)
        .then((msg)=>{
            md5Password = msg;
            let form = new FormData();
            form.append('mobile', account);
            form.append('password', md5Password);

            let request = {
                method: 'POST',
                body: form
            };
            return fetch(`${Config.HOST}/api/100/user/logon`, request, {showLoading: true});
        }).catch((err)=>{
        //handle err
    });


}

