/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react'
import {Provider} from 'react-redux';
import Global from './global'
import store from './store/store';

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Global/>
            </Provider>)
    }
}