/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react'
import {AsyncStorage} from 'react-native'
import {Provider} from 'react-redux';
import Global from './global'
import store from './store/store';


export default class App extends React.Component {

    componentDidMount(){
        this._getToken();
    }

    render() {
        return (
            <Provider store={store}>
                <Global/>
            </Provider>)
    }

     _getToken(){
        AsyncStorage.getItem('kstore@data').then(data=>{
            let kstoreData = JSON.parse(data);
            window.token = kstoreData.data.token; 
            if(__DEV__){
                console.log('App _getToken',window.token);
            }
        }).catch(err=>{
            if(__DEV__){
                console.log('App _getToken',err);
            }
        });
    }
}