/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native';
import LoginPage from './login/LoginPage'
import LogedPage from './loged/LogedPage'

class User extends React.Component{

    render(){
        if(__DEV__){
            console.log('User render', this.props)
        }
        return(
            <View style = {styles.container}>
                <LogedPage  {...this.props}/>
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