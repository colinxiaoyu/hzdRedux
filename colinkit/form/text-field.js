/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View, Text, PixelRatio, TouchableOpacity, Image, Platform, StyleSheet} from 'react-native';
const noop = () => {};


class TextFiled extends React.Component{

  static defaultProps = {
    showArrow: false
  };
  constructor(props){
    super(props);
    this._handlePress = this._handlePress.bind(this)
  }


  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={[styles.text, this.props.textStyle]} allowFontScaling={false}>
          {this.props.label}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={()=>this._handlePress()}>
          <Text style={[styles.input, this.props.textColor]} numberOfLines={1} allowFontScaling={false}>
            {this.props.text}
          </Text>
          {
            this.props.showArrow
              ? <Image source={require('./img/right.png')} style={styles.right} />
              : null
          }
        </TouchableOpacity>
      </View>
    );
  }


  _handlePress() {
    this.props.onPress();
  }
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eee'
  },
  btn: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: '#333'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    alignItems: 'center'
  },
  right: {
    height: 20,
    width: 15
  }
});

export default TextFiled;
