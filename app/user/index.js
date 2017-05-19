/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native';
import LoginPage from './login/LoginPage'
class User extends React.Component{

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