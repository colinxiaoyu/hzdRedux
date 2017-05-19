/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,ToastAndroid} from 'react-native';
import {CLHeader,CLForm,CLFormContainer} from 'colinkit';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginAction from './action';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this._onClearAccount = this._onClearAccount.bind(this);
        this._handleAccountChange = this._handleAccountChange.bind(this);
        this._handlePWDChange = this._handlePWDChange.bind(this);
        this._onClearPWD = this._onClearPWD.bind(this);
        this._handleEye = this._handleEye.bind(this);

    }

    render(){
        if(__DEV__){
            console.log('LoginPage Render',this.props.LoginReducer)
        }
        const account = this.props.LoginReducer.account;
        const pwd = this.props.LoginReducer.pwd;
        const eyeOpen = this.props.LoginReducer.eyeOpen;

        const accountImageVisiable =account != '';
        const pwdImageVisiable =pwd != '';

        return(
            <CLFormContainer>
                <CLHeader title = '登录'/>
                <CLForm style = {{flex:1}}>
                    <CLForm.CLAccountInput
                        label="手机号:"
                        onClearPress={()=>this._onClearAccount()}
                        value = {account}
                        placeholder="请输入手机号"
                        keyboardType="numeric"
                        maxLength={11}
                        onChangeText={
                            (text)=>this._handleAccountChange(text)
                        }
                        clearImageVisable={accountImageVisiable}/>
                    <CLForm.CLPWDInput
                        label="密   码:"
                        onClearPress={()=>this._onClearPWD()}
                        value = {pwd}
                        placeholder="请输入密码"
                        onChangeText={
                            (text)=>this._handlePWDChange(text)
                        }
                        clearImageVisable={pwdImageVisiable}
                        eyeOpen = {!eyeOpen}
                        onEyePress ={()=>this._handleEye(eyeOpen)}/>
                </CLForm>
            </CLFormContainer>
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

    _handlePWDChange(text){
        const {pwdChange} = this.props.login;
        pwdChange(text)
    }
    _onClearPWD(){
        const {pwdClear} = this.props.login;
        pwdClear();
    }

    _handleEye(eyeOpen){
        const {changeEye} = this.props.login;
        changeEye(eyeOpen)
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