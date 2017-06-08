/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {CLTabBar as TabBar} from 'colinkit'

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

const homeIcon =  require('./img/ic_tabbar_home_normal.png');
const borrowmoney  = require('./img/ic_tabbar_borrowmoney_normal.png');
const mineIcon =  require('./img/ic_tabbar_mine_normal.png');

import {CLTabBar} from 'colinkit'

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: window.selectedTab || 'Main'
        };
    }


    render() {
        return (
           <TabBar>
               <TabBar.Item
                   selected={this.state.selectedTab === 'Main'}
                   icon={homeIcon}
                   title='首页'
                   onPress={() => this._menuChange('Main')}
                >
                <Main/>
               </TabBar.Item>

               <TabBar.Item
                   selected={this.state.selectedTab === 'Dynamic'}
                   icon={borrowmoney}
                   title='汇中盛世'
                   badge={5}
                   onPress={() => this._menuChange('Dynamic')}
               >
                   <Dynamic/>
               </TabBar.Item>

               <TabBar.Item
                   selected={this.state.selectedTab === 'User'}
                   icon={mineIcon}
                   title='我的'
                   onPress={() => this._menuChange('User')}
               >
                   <User/>
               </TabBar.Item>
           </TabBar>
        )
    }

    //设计很巧妙，利用selectedTab，来改变TabBar.Item中selected的状态
    _menuChange(menu) {
        window.selectedTab = menu;
        //如果window.token存在,则跳转到
        this.setState({
            selectedTab: menu
        });
    }
}

export default Home