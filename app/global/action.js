/**
 * Created by Colin on 2017/5/22.
 */
import * as types from './actionType';

export function showLoading(isShow) {
    return{
        type:types.SHOWLOADING,
        showLoading:isShow
    }
}