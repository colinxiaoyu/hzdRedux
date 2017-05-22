/**
 * Created by Colin on 2017/5/22.
 */
import * as types from './actionType';

const initState = {
    showLoading:false,
    res:''
};

export  default function GlobalReducer(state = initState,action) {
    switch (action.type){
        case types.SHOWLOADING:
            return Object.assign(
                {},state,{
                    showLoading:action.showLoading
                }
            );
        case types.RES:
            return Object.assign(
                {},state,{
                    res:action.res
                }
            );
        default:
            return state;
    }
}