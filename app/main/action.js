/**
 * Created by Colin on 2017/6/8.
 */
import * as type from './actionType';

export function changeTitleColor(color) {
    return {
        type:type.CHANGETITLECOLOR,
        color:color
    }
}