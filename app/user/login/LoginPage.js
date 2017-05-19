/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,ToastAndroid} from 'react-native';
import {CLHeader,CLForm} from 'colinkit';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginAction from './action';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this._onClearAccount = this._onClearAccount.bind(this);
        this._handleAccountChange = this._handleAccountChange.bind(this);
    }

    render(){
        if(__DEV__){
            console.log('LoginPage render',this.props)
        }
        const {account} = this.props.LoginReducer;

        return(
            <View style = {{flex:1}}>
                <CLHeader title = '登录'/>
                <CLForm style = {{flex:1}}>
                    <CLForm.CLAccountInput
                        label="手机号"
                        clearImageVisable={true}
                        onClearPress={()=>this._onClearAccount()}
                        value = {account}
                        onChangeText={
                            (text)=>this._handleAccountChange(text)
                        }/>
                    <CLForm.CLTextInput
                        label="密码"/>
                </CLForm>
            </View>
        )
    }

    _handleAccountChange(text){
        const {accountChange} = this.props.login;
        accountChange(text);
    }

    _onClearAccount(){
        const {accountClear} = this.props.login;
        accountClear();
    }
}

const mapStateToProps = (state)=>
    ({
        LoginReducer: state.LoginReducer
    });

const mapActionCreators = (dispatch)=>({
    login: bindActionCreators(LoginAction, dispatch),
});



export default connect(mapStateToProps, mapActionCreators)(LoginPage);