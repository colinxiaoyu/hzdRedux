/**
 * TabBar组件,尽量兼容TabBarIOS
 *
 * TabBar并不是Android的原生的体验,是iOS的舶来品
 * 但是现在的App很多都去融合这两者,给用户提供统一的体验
 * 因此,我们就要去build android版本的TabBar
 *
 * 为什么不用Android的TabHost去写,
 * 1.TabHost已经过期,不再提倡使用
 * 2.原生的api不够声明式,转化起来比较麻烦
 * 3.ReactNative的view层js搞定,太简单了.
 * @type {ReactNative|exports|module.exports}
 */
import React from 'react';

import {View, Dimensions, PixelRatio, StyleSheet} from 'react-native';
import ViewContainer from './view-container.android';

const { height: HEIGHT } = Dimensions.get('window');

export default class TabBar extends  React.PureComponent{

  /**
   * 渲染tabbar
   * @returns {XML}
   */
  render() {
    return (
      <View style={styles.container}>
        {/*内容区域*/}
        <View style={styles.container}>
          {this._renderContent()}
        </View>

        {/*底部tabbar*/}
        <View style={styles.tabBar}>
            {/*渲染的组件对应的TabBar.Item*/}
          {this.props.children}
        </View>
      </View>
    );
  }


  /**
   * 渲染内容区域
   * this.props.children 的值有三种可能：
   * 如果当前组件没有子节点，它就是 undefined ;
   * 如果有一个子节点，数据类型是 object ；
   * 如果有多个子节点，数据类型就是 array 。
   * 所以，处理 this.props.children 的时候要小心
   * @returns {Array}
   * @private
   */
  _renderContent() {
    //遍历TabBar.Item的children,如果ViewContainer中的selected为ture时，渲染该children
    //返回延迟加载的组件,当selected为true时,才去真正的render组件
    return React.Children.map(this.props.children, (child, index) => (
        <ViewContainer key={index} selected={child.props.selected}>
          {child.props.children}
        </ViewContainer>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    height: HEIGHT / 13,
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#bbb'
  }
});


import TabBarItem from './item';
TabBar.Item = TabBarItem;


