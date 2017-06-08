/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image, AsyncStorage, NativeModules} from 'react-native';
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
        this._handleLoginMD5PWD = this._handleLoginMD5PWD.bind(this);
        this._rememberTouch = this._rememberTouch.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('user').then(items=> {
            if (items) {
                const user = JSON.parse(items);
                this._handleAccountChange(user.account);
                this._handlePWDChange(user.pwd);
                const {rememberPWD} = this.props.login;
                rememberPWD(user.isRemember);
            }
            if (__DEV__) {
                console.log('LoginPage componentWillMount', items)
            }
        }).catch(err2=>{
            if (__DEV__) {
                console.log('LoginPage componentWillMount', err2)
            }
        })
    }

    render() {
        if (__DEV__) {
            console.log('LoginPage Render', this.props)
        }
        const {account, pwd, eyeOpen, PWDRem}= this.props.LoginReducer;

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
                    <TouchableOpacity onPress={()=>this._rememberTouch(account,pwd,PWDRem)}>
                        <Image
                            source={PWDRem?require('./img/pwd_after.png'):require('./img/pass_before.png')}
                            style={{width:20,height:20}}
                            resizeMode='stretch'/>
                    </TouchableOpacity>
                    <Text>记住密码</Text>
                </View>
                <View style={styles.wrap}>
                    <CLButton
                        activeOpacity={0.8}
                        onPress={() => this._handleLoginMD5PWD(account,pwd, PWDRem)}
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

    //监听账号变化，即改变输入框内的值
    _handleAccountChange(text) {
        const {accountChange} = this.props.login;
        accountChange(text);
    }

    //清除账号
    _onClearAccount() {
        const {accountClear} = this.props.login;
        accountClear();
    }

    //监听密码变化，即改变输入框内的值
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

    //记住密码按钮 改变状态
    _rememberTouch(account, pwd, PWDRem) {
        const {rememberPWD} = this.props.login;
        rememberPWD(!PWDRem);
    }


    //登录 1、MD5加密处理，2、调用登录api
    _handleLoginMD5PWD(account, pwd, isRemember) {
        let md5Password = null;
        //这个有点坑，需记住Promise是异步操作，输出log日志才知道，密码为空
        NativeModules.Md5.getMd5(pwd)
            .then((msg)=> {
                md5Password = msg;
                this._handleLogin(account, md5Password, isRemember);
                this._rememberPWD(account, pwd, isRemember);
            }).catch(err2=> {
            if (__DEV__) {
                console.log('loginapi  加密密码出错', err2.json());
            }
        });
    }

    //比较坑的地方，promis中不能用 async 方法 await ，如果要做同步将方法抽出来
    async _handleLogin(account, pwd, isRemember) {
        try {
            const response = await loginapi(account, pwd);//同步等待返回结果
            if (__DEV__) {
                console.log('_handleLoginMD5PWD', response)
            }
            window.token = response.data.token
            AsyncStorage.setItem('kstore@data', JSON.stringify(response));
           
        } catch (err) {

        }

    }

    //储存密码
    _rememberPWD(account, pwd, isRemember) {
        if (isRemember) {
            AsyncStorage.setItem('user', JSON.stringify({account: account, pwd: pwd, isRemember: isRemember}));
        } else {
            AsyncStorage.setItem('user', JSON.stringify({account: '', pwd: '', isRemember: isRemember}));
        }
        if (__DEV__) {
            console.log('_rememberPWD', {account: account, pwd: pwd, isRemember: isRemember})
        }
    };
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