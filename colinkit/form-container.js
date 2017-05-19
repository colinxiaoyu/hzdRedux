/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';

import {ScrollView, View, StyleSheet} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import TextInputState from 'TextInputState';


class QMFormContainer extends React.Component{


  render() {
    return (
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={[styles.content, this.props.contentContainerStyle]}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'>
        <View
          style={styles.content}
          onStartShouldSetResponderCapture={(e) => {
            const focusField = TextInputState.currentlyFocusedField();

            if (focusField != null && e.nativeEvent.target != focusField){
              dismissKeyboard();
            }
          }}>
          {this.props.children}
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  content: {
    //flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#eee'
  }
});


export default QMFormContainer;