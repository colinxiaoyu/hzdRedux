/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'


import Main from '../main'
import Dynamic from '../dynamic'
import User from '../user'

const tabTitles = ['首页', '汇中盛世', '我的'];
const tabIcons = [
    require('./img/ic_tabbar_home_normal.png'),
    require('./img/ic_tabbar_borrowmoney_normal.png'),
    require('./img/ic_tabbar_mine_normal.png')
];
const tabSelectedIcon = [
    require('./img/ic_tabbar_home_select.png'),
    require('./img/ic_tabbar_borrowmoney_select.png'),
    require('./img/ic_tabbar_mine_select.png')
];

import {CLTabBar} from 'colinkit'

class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() =>
                    <CLTabBar
                        tabNames={tabTitles}
                        tabIconNames={tabIcons}
                        selectedTabIconNames={tabSelectedIcon}
                    />
                }
                tabBarPosition='bottom'
                locked
                scrollWithoutAnimation
            >
                <Main tabLabel="main" />
                <Dynamic tabLabel="huizhong"/>
                <User tabLabel="user"/>
            </ScrollableTabView>
        )
    }
}

export default Home