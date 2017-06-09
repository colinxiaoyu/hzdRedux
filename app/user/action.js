/**
 * Created by Colin on 2017/6/9.
 */
import * as type from './actionType'

export function changePage(page) {
    return {
        type:type.CHANGEPAGE,
        currentPage:page
    }
}