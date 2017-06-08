/**
 * TabBar.Item组件,
 * 尽量和TabBarIOS的Item的api相同
 *
 * @type {ReactNative|exports|module.exports}
 */
import React from 'react';

import {View, TouchableOpacity, Text, Platform, Image, StyleSheet} from 'react-native';
import Badge from './badge.android';

//点击后，渲染颜色
const renderColor = '#4B0091';

export default class TabBarItem extends React.PureComponent{

    static defaultProps ={
      selected: false,
    }


  render(){
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={()=>this.props.onPress()}>
        {this._getImage()}
        <Text
          allowFontScaling={false}
          style={[styles.title, this.props.selected && {
					  color: renderColor
				  }]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }


  /**
   * 获取图片
   */
  _getImage(){
    if (!this.props.selectedIcon && !this.props.icon) {
      return null;
    }

    return (
      <View>
        <Image source={this.props.icon} style={[styles.img, this.props.selected ? {tintColor: renderColor} : null]}/>
        {this.props.badge ? <Badge badge={this.props.badge}/> : null}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: 25,
    height: 25,
    marginTop: 2,
    marginBottom: 2
  },
  title: {
    paddingTop: 2,
    color: 'gray',
    fontSize: 10
  }
});

