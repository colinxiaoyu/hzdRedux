/**
 * Created by Colin on 2017/5/22.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native'
import Home from '../home'
import {CLModalLoading} from 'colinkit';

class Global extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Home/>
                <CLModalLoading/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});



export default Global