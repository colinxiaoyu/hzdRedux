/**
 * Button组件
 */
'use strict';

import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


/**
 * 抽取公共按钮组件
 *
 * Fixme:
 * 为了去兼容iOS和Android,其实最好的公共组件的方式是,不去判断子元素是神马
 * 我们仅仅提供button wrapper的包装即可
 *
 * 根据Platform判断平台的类型,然后使用不同的按钮组件
 */
class CLButton extends React.Component{

  static defaultProps = {
    style: {},
    textStyle: {},
    activeOpacity: 0,
    disabled: true,
  };
  constructor(props){
    super(props);
    this.state={
      disabled: this.props.disabled
    };
    this._handlePress = this._handlePress.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.disabled != this.props.disabled) {
      this.requestAnimation = requestAnimationFrame(() => {
        this.setState({
          disabled: nextProps.disabled
        });
      });
    }
  }


  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
    this.requestAnimation&&cancelAnimationFrame(this.requestAnimation);
  }


  render() {
    return (
      <TouchableOpacity
        activeOpacity={this.state.disabled ? 1 : this.props.activeOpacity}
        style={[styles.container, this.state.disabled && styles.disabled, this.props.style]}
        onPress={()=>this._handlePress()}>
        <Text
          style={[styles.btn, this.props.disabled && styles.disabledText, this.props.textStyle]}
          allowFontScaling={false}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }

  _handlePress(){
    if (!this.state.disabled) {
      this.setState({
        disabled: true
      });

      //1s后,恢复
      this.timer = setTimeout(() => {
        this.setState({
          disabled: false
        });
      }, 1000);

      this.props.onPress();
    }
  }
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: SCREEN_WIDTH <= 320 ? 40 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e63a59'
  },
  btn: {
    fontSize: SCREEN_WIDTH <= 320 ? 16 : 18,
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#ddd'
  },
  disabledText: {
    color: '#999'
  }
});

export default CLButton;