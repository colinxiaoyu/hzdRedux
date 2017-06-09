/**
 * Created by Colin on 2017/6/9.
 */
import * as type from './actionType'

const initState = {
    currentPage: 'Login'
};

export default function UserReducer(state = initState, action) {
    switch (action.type) {
        case type.CHANGEPAGE:
            return Object.assign(
                {}, state, {
                    currentPage: action.currentPage
                });
            break;
        default:
            return state;
            break;
    }
}