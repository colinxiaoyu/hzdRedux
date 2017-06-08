/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native';
import LoginPage from './../login/LoginPage'
import LogedPage from './loged/LogedPage'

class User extends React.Component{

    componetWillMount(){
        
    }

    render(){
       if(__DEV__){
           console.log('User render',window.token);
       }
        return(
            <View style = {styles.container}>
                {
                    window.token?<LogedPage/>:<LoginPage/>
                }
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