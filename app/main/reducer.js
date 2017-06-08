/**
 * Created by Colin on 2017/6/8.
 */
import * as type from './actionType'

const initState = {
    color: 0.01
};

export default function mainReducer(state = initState, action) {
    switch (action.type) {
        case type.CHANGETITLECOLOR:
            return Object.assign(
                {}, state, {
                    color: action.color
                }
            );
            break;
        default:
            return state;
            break;
    }
}