/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View, Text, PixelRatio, TextInput, Platform, StyleSheet} from 'react-native';

const noop = () => {};


/**
 * 输入框公共组件
 */
class Input extends React.Component{

  static defaultProps = {
    onChangeText: noop
  };

  render() {
    return (
      <View
        style={styles.container}>
        {/*label*/}
        <Text style={[styles.text, this.props.textStyle]} allowFontScaling={false}>
          {this.props.label}
        </Text>
        {/*text-input*/}
        <TextInput
          underlineColorAndroid='transparent'
          ref={(input) => this.input = input}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={this.props.value}
          style={[styles.input, this.props.style]}
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder}
          placeholderTextColor='#ddd'
          onFocus={this.props.onFocus}
          onChangeText={(text)=>this.props.onChangeText(text)}
          autoFocus={this.props.autoFocus}
          clearButtonMode='while-editing'
        />
      </View>
    )
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
  text: {
    fontSize: 16,
    color: '#333',
    marginRight: 5
  },
  input: {
    flex: 1,
    height: Platform.OS === 'ios' ? 26 : 52,
    fontSize: 16,
    color: '#333',
    marginRight: 5,
    padding: 0
  }
});


export default Input;
