/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {CLItem, CLFormContainer} from 'colinkit';
import {
    ToastAndroid, StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, AsyncStorage
} from 'react-native';
import {logout} from './webapi'

const titleBackgroud = require('./img/title_backgroud.png');
const titleAvaster = require('./img/ic_mine_user_title.png');
const titleEmail = require('./img/ic_mine_email.png');
const {width, height}=Dimensions.get('window');

class LogedPage extends React.Component {
    constructor(props) {
        super(props);
        this._logout = this._logout.bind(this);
    }

    render() {
        if(__DEV__){
            console.log('LogedPage render', this.props)
        }
        return (
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
                            ToastAndroid.show('我的进度',2000);
                    }}/>
                    <CLItem.CLVariableItem
                        icon={require('./img/ic_mine_realname.png')}
                        title='实名认证'
                        promptText="未认证"
                        onPress={()=>{
                            ToastAndroid.show('实名认证',2000);
                    }}/>
                    <CLItem.CLCommonItem
                        icon={require('./img/ic_mine_update.png')}
                        title='修改密码'
                        onPress={()=>{
                            ToastAndroid.show('修改密码',2000);
                    }}/>
                    <CLItem.CLCommonItem
                        icon={require('./img/ic_about_us.png')}
                        title='关于我们'
                        onPress={()=>{
                            ToastAndroid.show('关于我们',2000);
                    }}/>
                </CLItem>
                <TouchableOpacity style={styles.logoutContainer}
                                  onPress={()=>this._logout()}>
                    <Text style={styles.logoutText}>安全退出</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>版本号：V2.02</Text>
            </CLFormContainer>
        )
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

        AsyncStorage.getItem('kstore@data').then(data=>{
            if(__DEV__){
                console.log('_logout验证',data);
            }
        }).catch(err=>{
            if(__DEV__){
                console.log('_logout验证',err);
            }
        });
        this._renderParent();
    }
    //重新渲染父组件
    _renderParent(){
        const {changePage} = this.props.user;
        changePage('LoginPage')
    }
}

export default LogedPage;

const styles = StyleSheet.create({
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