/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

class Dynamic extends React.Component{

    render(){
        return(
            <View style = {styles.container}>
                <Text>Dynamic</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
   container:{
       flex:1
   }
});
export default Dynamic;