/**
 * Form
 */
import React from 'react';

import {View} from 'react-native';

import BasicField from './basic-field';
import DateInput from './date-input';
import TextField from './text-field';
import TextInput from './text-input';
import AccountInput from './account-input';
import PWDInput from './pwd-input';

/**
 * Usage:
 */
class Form extends React.Component{


  render() {
    return (
      <View style={this.props.style}>
        {this.props.children}
      </View>
    )
  }
}

//基础field
Form.BasicField = BasicField;
//输入框
Form.CLTextInput = TextInput;
//日期控件
Form.CLDateInput = DateInput;
//只读组件
Form.CLTextField = TextField;

Form.CLAccountInput = AccountInput;
Form.CLPWDInput=PWDInput;
export default Form;