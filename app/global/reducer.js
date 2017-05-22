/**
 * Created by Colin on 2017/5/22.
 */
import * as types from './actionType';

const initState = {
    showLoading:false,
};

export  default function GlobalReducer(state = initState,action) {
    switch (action.type){
        case types.SHOWLOADING:
            return Object.assign(
                {},state,{
                    showLoading:action.showLoading
                }
            );
        default:
            return state;
    }
}