/**
 * Created by Colin on 2017/6/9.
 */
import * as type from './actionType'

const initState = {
    currentState: 'Login'
};

export default function UserReducer(state = initState, action) {
    switch (action.type) {
        case type.CHANGEPAGE:
            return Object.assign(
                {}, state, {
                    currentState: action.currentState
                });
            break;
        default:
            return state;
            break;
    }
}