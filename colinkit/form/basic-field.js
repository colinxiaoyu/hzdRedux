/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';

import {View, Text, PixelRatio, StyleSheet} from 'react-native';


/**
 * 基础form field
 */
class BasicField extends React.Component{

  static defaultProps = {
    label: '',
    note: ''
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={[styles.text, this.props.textStyle]} allowFontScaling={false}>
            {this.props.label}
          </Text>
          {this.props.children}
        </View>
        {
          this.props.note
          ? <Text style={[styles.text, this.props.noteStyle]} allowFontScaling={false}>{this.props.note}</Text>
          : null
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eee'
  },
  field: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginRight: 5
  }
});


export default BasicField;
