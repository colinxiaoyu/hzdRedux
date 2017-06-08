/**
 * Created by Colin on 2017/6/8.
 **/
import React from 'react';

import {View, Dimensions, StyleSheet} from 'react-native';
const {width: SCREEN_WIDTH} = Dimensions.get('window');



class ChildComponent extends React.PureComponent{

  static defaultProps ={
    selected: false,
  }


  shouldComponentUpdate(nextProps){
    //如果组件已经存在，则不再渲染
    return this.refs.child == null;
  }


  render() {
    return (this.props.selected ? React.cloneElement(this.props.children, {
      ref: 'child'
    }) : null);
  }
}

export default class ViewContainer extends React.Component{

    static defaultProps =  {
      selected: false
    }

  render() {
    //返回延迟加载的组件,当selected为true时,才去真正的render组件
    return (
      <View style={[styles.content, this.props.selected && styles.selected]}>
        <ChildComponent selected={this.props.selected}>
          {this.props.children}
        </ChildComponent>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -SCREEN_WIDTH,
    width: SCREEN_WIDTH
  },
  selected: {
    left: 0
  }
});

