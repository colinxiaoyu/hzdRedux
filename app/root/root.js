/**
 * Created by Colin on 2017/6/12.
 */
import React from 'react';
import {
    View, StyleSheet, BackHandler, Platform,InteractionManager,StatusBar
} from 'react-native';
import StaticRenderer from 'StaticRenderer';
import {Navigator} from 'react-native-deprecated-custom-components';

import {msg} from 'iflux-native';

import {CLUnAuth} from 'colinkit';
const {unAuthMap, unAuth} = CLUnAuth;

//上一次点击Android的返回键的时间
let lastBackPressTime = 0;

import Login from  '../login' //登录
import Home from '../home'//主页


/**
 * 计划这里定义所有的路由管理
 * 用unAuth包装的页面，跳转时，不判断是否登录，即token是否过期
 */
const routeMapper = {
    Home: unAuth(Home, 'Home'),
    Login: unAuth(Login, 'Login'),
};
class Root extends React.Component {

    constructor(props) {
        super(props);
        this._handleTokenInvalid = this._handleTokenInvalid.bind(this);
        this._pushRoute = this._pushRoute.bind(this);
        this._popRoute = this._popRoute.bind(this);
        this._replaceToOffset = this._replaceToOffset.bind(this);
        this._popToTop = this._popToTop.bind(this);
        this._popToRoute = this._popToRoute.bind(this);
        this._replaceRoute = this._replaceRoute.bind(this);
        this._cancelLoginNav = this._cancelLoginNav.bind(this);
        this._replaceAtIndex = this._replaceAtIndex.bind(this);
        this._replacePrevious = this._replacePrevious.bind(this);
        this._popToRouteAndRefresh = this._popToRouteAndRefresh.bind(this);
        this._popAndReplaceByName = this._popAndReplaceByName.bind(this);
        this._pushOrReplace = this._pushOrReplace.bind(this);
        this._handleBackAndroid = this._handleBackAndroid.bind(this);
        this._removeBackAndroid = this._removeBackAndroid.bind(this);
        this._addBackAndroid = this._addBackAndroid.bind(this);
        this.backAndroidWork = true;//android返回键处理标志
    }

    componentDidMount() {
        if (__DEV__) {
            window._route = this;
            window._navigator = this._navigator;
        }

        msg
            .on('tokenInvalid', this._handleTokenInvalid)
            .on('route:goToNext', this._pushRoute)
            .on('route:backToLast', this._popRoute)
            .on('route:backToTop', this._popToTop)
            .on('route:popToRoute', this._popToRoute)
            .on('route:cancelLoginNav', this._cancelLoginNav)
            .on('route:replaceRoute', this._replaceRoute)
            .on('route:replaceAtIndex', this._replaceAtIndex)
            .on('route:replacePrevious', this._replacePrevious)
            .on('route:popToRouteAndRefresh', this._popToRouteAndRefresh)
            .on('route:replaceToOffset', this._replaceToOffset)
            .on('route:popAndReplaceByName', this._popAndReplaceByName)
            .on('route:pushOrReplace', this._pushOrReplace)
            .on('removeBackAndroid',this._removeBackAndroid)
            .on('addBackAndroid',this._addBackAndroid);
        
        //监听Android的实体物理键的返回
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this._handleBackAndroid);
        }
    }

    componentWillUnmount() {
        msg
            .removeListener('tokenInvalid', this._handleTokenInvalid)
            .removeListener('route:goToNext', this._pushRoute)
            .removeListener('route:backToLast', this._popRoute)
            .removeListener('route:backToTop', this._popToTop)
            .removeListener('route:cancelLoginNav', this._cancelLoginNav)
            .removeListener('route:popToRoute', this._popToRoute)
            .removeListener('route:replaceAtIndex', this._replaceAtIndex)
            .removeListener('route:replacePrevious', this.replacePrevious)
            .removeListener('route:popToRouteAndRefresh', this._popToRouteAndRefresh)
            .removeListener('route:replaceToOffset', this._replaceToOffset)
            .removeListener('route:replaceRoute', this._replaceRoute)
            .removeListener('route:popAndReplaceByName', this._popAndReplaceByName)
            .removeListener('route:pushOrReplace', this._pushOrReplace)
            .removeListener('removeBackAndroid',this._removeBackAndroid)
            .removeListener('addBackAndroid',this._addBackAndroid);
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this._handleBackAndroid);
        }
    }

    render() {
        return (
            <Navigator
                ref={(navigator) => this._navigator = navigator}
                style={{backgroundColor:'#000'}}
                sceneStyle={{backgroundColor:'#fff'}}
                initialRoute={{sceneName:'Home'}}
                configureScene={(route)=>{
                   if(route.sceneConfig){
                        return route.sceneConfig;
                   }else {
                        return Navigator.SceneConfigs.PushFromRight;
                   }
               }}
                renderScene={(route,navigator)=>{
                   let {sceneName, sceneConfig, ...params} = route;
                   if(__DEV__){
                       console.log('route will render->', sceneName, params)
                   }
                    StatusBar.setBarStyle('default');
                   
                   let Scene = routeMapper[sceneName];//通过sceneName获取对应的Scene
                   
                   if(!unAuthMap[sceneName] && !window.token){
                    // 对于需要登录的页面，如果用户没有登录则展示为登录页面
                        if(__DEV__){
                            console.log('----------> must login');
                        }
                        return (<Login nextSceneName={sceneName} nextSceneParam={params}/>);
                    }else{
                        return (
                          <StaticRenderer
                           shouldUpdate={false}
                           render={() => <Scene {...params}/>}/>);
                  }
               }}
            />
        )
    }

    /**
     * push 路由
     */
    _pushRoute(sceneParam) {
        if (__DEV__) {
            console.log('正在push路由: ', sceneParam);
        }

        //防止重复push相同的路由
        const routes = this._navigator.getCurrentRoutes();
        const lastRoute = routes[routes.length - 1];
        if (lastRoute.sceneName === sceneParam.sceneName) {
            return;
        }

        this._navigator.push(sceneParam);
    }

    /**
     * pop 路由
     */
    _popRoute() {
        if (__DEV__) {
            console.log('正在pop路由');
        }

        this._navigator.pop();
    }


    /**
     * 返回到第一个视图
     */
    _popToTop() {
        if (__DEV__) {
            console.log('route popToTop');
        }

        //如果scene里面有动画,先做完再pop
        InteractionManager.runAfterInteractions(() => {
            this._navigator.popToTop();
        });
    }


    /**
     * 返回到指定视图
     */
    _popToRoute(sceneParam) {
        if (__DEV__) {
            console.log('route popToRoute');
        }

        InteractionManager.runAfterInteractions(() => {
            var routes = this._navigator.getCurrentRoutes();
            for (let i = 0, len = routes.length; i < len; i++) {
                const route = routes[i];
                if (route.sceneName == sceneParam['sceneName']) {
                    this._navigator.popToRoute(route);
                    break;
                }
            }
        });
    }


    /**
     * pop到某一个路由并且进行刷新
     *
     * @param sceneParam
     * @private
     */
    _popToRouteAndRefresh(sceneParam) {
        const routes = this._navigator.getCurrentRoutes();

        for (let i = 0, len = routes.length; i < len; i++) {
            if (sceneParam.sceneName === routes[i].sceneName) {
                //先replace
                this._navigator.replaceAtIndex(sceneParam, i);
                //然后pop掉
                this._navigator.popToRoute(this._navigator.getCurrentRoutes()[i]);
                break;
            }
        }
    }


    /**
     * 替换当前视图
     */
    _replaceRoute(sceneParam) {
        if (__DEV__) {
            console.log('route replaceRoute');
        }

        this._navigator.replace(sceneParam);
    }


    _replaceAtIndex(sceneParam, index) {
        if (__DEV__) {
            console.log('route _replaceAtIndex');
        }

        this._navigator.replaceAtIndex(sceneParam, index);
    }


    /**
     * 替换掉当前路由; 并根据名称删除上一个路由,如果路由名称和给定名称相同则删除
     */
    _popAndReplaceByName(sceneParam, sceneName) {
        if (__DEV__) {
            console.log('route _popLastByName', sceneName, sceneParam);
        }

        var routes = this._navigator.getCurrentRoutes();
        if (routes[routes.length - 1]['sceneName'] == sceneName) {
            this._navigator.replace(sceneParam);
        }
        else {
            this._navigator.push(sceneParam);
        }
    }


    _replacePrevious(sceneParam) {
        if (__DEV__) {
            console.log('route _replacePrevious');
        }

        this._navigator.replacePrevious(sceneParam);
    }


    /**
     * offset为负值,往后back的层级
     * 如果为正数,就是向后
     * @param offset 偏移量
     * @param isRefresh 是否刷新页面
     * @prams params 页面参数
     * @private
     */
    _replaceToOffset(offset, isRefresh) {
        const routes = this._navigator.getCurrentRoutes();

        if (offset <= 0 && Math.abs(offset) < routes.length) {
            const index = routes.length - 1 + offset;
            const route = routes[index];
            const {__navigatorRouteID, ...params} = route;

            if (isRefresh) {
                InteractionManager.runAfterInteractions(() => {
                    this._navigator.replaceAtIndex({sceneName: route.sceneName, ...params}, index);
                });
            }

            if (offset != 0) {
                this._navigator.popToRoute(this._navigator.getCurrentRoutes()[index]);
            }
        }
    }


    /**
     * 取消登录后,路由的跳转
     * @private
     */
    _cancelLoginNav() {
        const routes = this._navigator.getCurrentRoutes();
        let i = 0, len = routes.length;
        for (; i < len; i++) {
            if (routes[i].sceneName === 'Login') {
                let j = i - 1;
                while (!unAuthMap[routes[j].sceneName]) {
                    j--;
                }

                if (Platform.OS === 'android') {
                    this._popRoute();
                }

                this._replaceToOffset(j - routes.length + 1);
                break;
            }
        }

        if (i === len) {
            this._popRoute();
        }
    }


    /**
     * 到登录
     */
    _handleTokenInvalid() {
        msg.emit('app:tip', '您未登录或账号已过期，请重新登录');

        this._pushRoute({
            sceneName: 'Login',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        });
    }


    /**
     * 如果要跳转的路由和当前路由相同,则替换当前路由;否则直接push要跳转的路由
     * @param sceneParam
     * @private
     */
    _pushOrReplace(sceneParam) {
        if (__DEV__) {
            console.log('route _pushOrReplace', sceneParam);
        }

        var routes = this._navigator.getCurrentRoutes();
        if (routes[routes.length - 1]['sceneName'] === sceneParam['sceneName']) {
            this._navigator.replace(sceneParam);
        }
        else {
            this._navigator.push(sceneParam);
        }
    }


    /**
     * 处理android的实体键的返回
     */
    _handleBackAndroid() {
        if (__DEV__) {
            console.log('current sceneName', this._sceneName);
        }

        //android物理回退键是否应该响应

        if(!this.backAndroidWork)return true;
        //修改android路由体验
        if (this._navigator.getCurrentRoutes().length === 1) {
            var currentTime = Date.now();
            if (currentTime - lastBackPressTime > 4000) {
                msg.emit('app:tip', '再次点击，退出应用。');
                lastBackPressTime = currentTime;
                return true;
            } else {
                return false;
            }
        }
        this._popRoute();
        return true;
    }

    /**
     * 取消拦截全局返回键监听
     * @private
     */

    _addBackAndroid(){
        this.backAndroidWork = true;
    }


    /**
     * 拦截全局返回键监听
     * @private
     */
    _removeBackAndroid(){
        this.backAndroidWork = false;
    }
}

export default Root