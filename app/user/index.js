/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {
    ToastAndroid, StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, AsyncStorage
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import {logout} from './webapi'
import {CLItem, CLFormContainer} from 'colinkit';

import LoginPage from '../login'

import * as UserAction from './action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {msg} from 'iflux-native';


const titleBackgroud = require('./img/title_backgroud.png');
const titleAvaster = require('./img/ic_mine_user_title.png');
const titleEmail = require('./img/ic_mine_email.png');
const {width, height}=Dimensions.get('window');

class User extends React.Component {

    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
    }

    componetWillMount() {

    }

    render() {
        if (__DEV__) {
            console.log('User render', this.props);
        }
        return (
            this._renderContent()
        )
    }

    _renderContent() {
        return (window.token ?
            <CLFormContainer>
                <Image
                    style={styles.titleImage}
                    source={titleBackgroud}
                    resizeMode="stretch">
                    <View>
                        <Image
                            style={styles.titleAvaster}
                            resizeMode="stretch"
                            source={titleAvaster}/>
                        <Text style={styles.titleContainer}>{'手机号'}</Text>
                    </View>
                    <TouchableOpacity style={styles.emailContainer}>
                        <Image source={titleEmail}
                               style={styles.titleEmail}
                               resizeMode="stretch"/>
                    </TouchableOpacity>
                </Image>
                <CLItem style={{flex:1}}>
                    <CLItem.CLCommonItem
                        icon={require('./img/ic_myprogress.png')}
                        title='我的进度'
                        onPress={()=>{
                            msg.emit('app:tip', '我的进度');
                    }}/>
                    <CLItem.CLVariableItem
                        icon={require('./img/ic_mine_realname.png')}
                        title='实名认证'
                        promptText="未认证"
                        onPress={()=>{
                        msg.emit('app:tip', '实名认证');
                    }}/>
                    <CLItem.CLCommonItem
                        icon={require('./img/ic_mine_update.png')}
                        title='修改密码'
                        onPress={()=>{
                             msg.emit('app:tip', '修改密码');
                    }}/>
                    <CLItem.CLCommonItem
                        icon={require('./img/ic_about_us.png')}
                        title='关于我们'
                        onPress={()=>{
                            msg.emit('app:tip', '关于我们');
                    }}/>
                </CLItem>
                <TouchableOpacity style={styles.logoutContainer}
                                  onPress={()=>this._logout()}>
                    <Text style={styles.logoutText}>安全退出</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>版本号：V2.02</Text>
            </CLFormContainer>
            :
            <Image
                style={styles.titleImage}
                source={titleBackgroud}
                resizeMode="stretch">
                <TouchableOpacity
                    onPress={()=>{this._goLoginPage();}}>
                    <Image
                        style={styles.titleAvaster}
                        resizeMode="stretch"
                        source={titleAvaster}/>
                    <Text style={styles.titleContainer}>{'登录/注册'}</Text>
                </TouchableOpacity>
            </Image>)
    }

    _goLoginPage() {
        window.selectedTab = 'User';
        msg.emit('route:goToNext',
            {
                sceneName: 'Login',
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                nextSceneName: 'Home'
            })
    }

    async _logout() {
        let res = null;
        await logout().then(response=> {
            res = response;
            if (__DEV__) {
                console.log('_logout', res)
            }
        }).catch(err=> {

        });

        AsyncStorage.removeItem('kstore@data');
        window.token = '';

        AsyncStorage.getItem('kstore@data').then(data=> {
            if (__DEV__) {
                console.log('_logout验证', data);
            }
        }).catch(err=> {
            if (__DEV__) {
                console.log('_logout验证', err);
            }
        });
        this._renderParent();
    }

    //重新渲染父组件
    _renderParent() {
        const {changeLoginState} = this.props.user;
        changeLoginState('LoginPage')
    }
}
const mapStateToProps = (state)=>({
    UserReducer: state.UserReducer
});

const mapActionCreators = (dispatch)=>({
    user: bindActionCreators(UserAction, dispatch)
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleImage: {
        height: 200,
        width: width
    },
    titleAvaster: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginTop: 50
    },
    titleContainer: {
        fontSize: 18,
        height: 40,
        width: width,
        lineHeight: 15,
        textAlign: 'center',
        marginTop: 10
    },
    emailContainer: {
        position: 'absolute',
        top: 30,
        right: 30
    },
    titleEmail: {
        height: 15,
        width: 25,
    },

    itemText: {
        fontSize: 15,
        flex: 1,
        paddingLeft: 10,
        textAlign: 'left',
    },
    btnBack: {
        marginRight: 20,
        height: 20,
        width: 10
    },
    logoutContainer: {
        height: 60,
        width: width,
        backgroundColor: 'white',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoutText: {
        fontSize: 14,
        textAlign: 'center',
    },
    versionText: {
        fontSize: 10,
        textAlign: 'center',
        height: 60,
        width: width,
        lineHeight: 35
    }
});

export default connect(mapStateToProps, mapActionCreators)(User);