/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native';
import LoginPage from './login/LoginPage'
import LogedPage from './loged/LogedPage'

class User extends React.Component{

    componetWillMount(){
        // AsyncStorage.getItem('kstore@data').then(items=> {
        //     if (items) {
        //         const user = JSON.parse(items);
        //         this._handleAccountChange(user.account);
        //         this._handlePWDChange(user.pwd);
        //         const {rememberPWD} = this.props.login;
        //         rememberPWD(user.isRemember);
        //     }
        //     if (__DEV__) {
        //         console.log('LoginPage componentWillMount', items)
        //     }
        // })
    }

    render(){
       
        return(
            <View style = {styles.container}>
                <LoginPage/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
});
export default User;