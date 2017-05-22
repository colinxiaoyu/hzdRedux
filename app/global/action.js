/**
 * Created by Colin on 2017/5/22.
 */
import * as types from './actionType';
import config from './config';
const {HTTP_TIME_OUT} = config;

export function showLoading(isShow) {
    return{
        type:types.SHOWLOADING,
        showLoading:isShow
    }
}

export function fetchApi(url, req, config) {
    //默认参数
    let request = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': window.token || ''
        }
    };

    //配置参数
    const cnf = Object.assign({}, {
        showLoading: false,
        showLoginView: true
    }, config);

    //对header做单独合并
    if (req && req.headers) {
        const mergeHeader = Object.assign({}, request.headers, req.headers);
        request.headers = mergeHeader;
        delete req.headers;
    }

    //merge
    const merge = Object.assign({}, request, req);
    
    //去掉url中可能存在的//
    url = url.replace(/([^:])\/\//, '$1/');

    if (__DEV__) {
        console.log('请求->', url, '\n', JSON.stringify(merge, null, 2));
    }

    return (dispatch)=> new Promise((resolve, reject) => {
        let isServerOk = true;
        let httpStatus = 200;

        //超时优化
        let httpTimeout = setTimeout(() => {
            const err = {
                code: 'S-000002',
                message: '网络超时'
            };
            if (cnf.showLoading) {
                dispatch(showLoading(cnf.showLoading))
            }
            // msg.emit('app:tip', err.code + '-' + err.message);
            reject(err);
        }, 1000 * HTTP_TIME_OUT);


        //如果配置showLoading为true,显示modalloading
        if (cnf.showLoading) {
            dispatch(showLoading(cnf.showLoading))
        }
        
        fetch(url, merge)
            .then(res => {
                //清除网络超时
                clearTimeout(httpTimeout);

                //当前的http的状态
                httpStatus = res.status;
                //判断server是不是异常状态404，500等
                isServerOk = !!(res.status >= 200 && res.status < 300);

                //promise
                return res.json();
            })
            .then((res) => {
                //hide
                if (cnf.showLoading) {
                    dispatch(showLoading(false))
                }

                if (isServerOk) {
                    if (__DEV__) {
                        console.info('响应->', httpStatus, url, '\n', res);
                    }

                    //数据正确返回
                    resolve(res);
                } else {
                    if (__DEV__) {
                        console.info('响应->', url, httpStatus, '\n', res);
                    }

                    // if (httpStatus == 401) {
                    //     if(cnf.showLoginView){
                    //         msg.emit('tokenInvalid');
                    //     }
                    //     //token过期或者校验错误,将token清除
                    //     AsyncStorage.setItem('kstore@data', '{"token":""}');
                    //     window.token = '';
                    // } else {
                    //     if (res.code === 'K-000001') {
                    //         // 系统异常隐藏
                    //         msg.emit('app:tip', '您的网络不给力:(');
                    //     } else {
                    //         msg.emit('app:tip', res.message);
                    //     }
                    // }
                    reject(res);
                }
            })
            .catch((err) => {
                //清除网络超时
                clearTimeout(httpTimeout);

                if (cnf.showLoading) {
                    dispatch(showLoading(cnf.showLoading))
                }

                // msg.emit('app:tip', '您的网络不给力:(');
                //TODO: 血的教训
                //是应用层使用的时候一定用then，不要直接用done
                //done会导致整个进程crash掉。
                //统一所有错误的数据格式
                //reject(err);
                reject({
                    code: 'K-000001',
                    message: '网络错误'
                });
            })
            .done();
    });
}