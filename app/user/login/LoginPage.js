/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {CLHeader, CLForm, CLFormContainer, CLButton} from 'colinkit';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LoginAction from './action';
import {loginapi} from './webapi'


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this._onClearAccount = this._onClearAccount.bind(this);
        this._handleAccountChange = this._handleAccountChange.bind(this);
        this._handlePWDChange = this._handlePWDChange.bind(this);
        this._onClearPWD = this._onClearPWD.bind(this);
        this._handleEye = this._handleEye.bind(this);
        this._handleLogin = this._handleLogin.bind(this);
        this._rememberTouch = this._rememberTouch.bind(this);
    }

    render() {
        if (__DEV__) {
            console.log('LoginPage Render', this.props)
        }
        const {account,pwd,eyeOpen,remPWD}= this.props.LoginReducer;

        const accountImageVisiable = account != '';
        const pwdImageVisiable = pwd != '';

        return (
            <CLFormContainer>
                <CLHeader title='登录'/>
                <CLForm style={{flex:1}}>
                    <CLForm.CLAccountInput
                        label="手机号:"
                        onClearPress={()=>this._onClearAccount()}
                        value={account}
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
                        value={pwd}
                        placeholder="请输入密码"
                        onChangeText={
                            (text)=>this._handlePWDChange(text)
                        }
                        clearImageVisable={pwdImageVisiable}
                        eyeOpen={!eyeOpen}
                        onEyePress={()=>this._handleEye(eyeOpen)}/>
                </CLForm>
                <View style={styles.rememberContainer}>
                    <TouchableOpacity onPress={()=>this._rememberTouch(remPWD)}>
                        <Image
                            source = {remPWD?require('./img/pass_before.png'):require('./img/pwd_after.png')}
                            style={{width:20,height:20}}
                            resizeMode='stretch'/>
                    </TouchableOpacity>
                    <Text>记住密码</Text>
                </View>
                <View style={styles.wrap}>
                    <CLButton
                        activeOpacity={0.8}
                        onPress={() => this._handleLogin(account,pwd,remPWD)}
                        disabled={!(account && pwd&&account.length==11)}>登录</CLButton>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity
                    >
                        <Text>立即注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>忘记密码</Text>
                    </TouchableOpacity>

                </View>
            </CLFormContainer>
        )
    }

    //监听账号变化
    _handleAccountChange(text) {
        const {accountChange} = this.props.login;
        accountChange(text);
    }

    //清楚账号
    _onClearAccount() {
        const {accountClear} = this.props.login;
        accountClear();
    }

    //监听密码变化
    _handlePWDChange(text) {
        const {pwdChange} = this.props.login;
        pwdChange(text)
    }

    //清除密码
    _onClearPWD() {
        const {pwdClear} = this.props.login;
        pwdClear();
    }

    //密码可见开关
    _handleEye(eyeOpen) {
        const {changeEye} = this.props.login;
        changeEye(eyeOpen)
    }
    //记住密码
    _rememberTouch(remPWD){
        const {rememberPWD} = this.props.login;
        rememberPWD(remPWD);
    }
    //登录
    _handleLogin(account,pwd,remPWD) {
        const {fetchApi} = this.props.global;
        loginapi(fetchApi,account,pwd,remPWD)
    }
}

const styles = StyleSheet.create({
    rememberContainer: {
        height: 20,
        width: 100,
        flexDirection: 'row',
        marginVertical: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        marginHorizontal: 10
    },
    wrap: {
        padding: 20,
        alignSelf: 'stretch'
    },
});

const mapStateToProps = (state)=>
    ({
        LoginReducer: state.LoginReducer
    });

const mapActionCreators = (dispatch)=>({
    login: bindActionCreators(LoginAction, dispatch),
});


export default connect(mapStateToProps, mapActionCreators)(LoginPage);