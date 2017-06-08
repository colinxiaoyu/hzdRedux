/**
 * Created by Colin on 2017/5/22.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native'
import {CLModalLoading} from 'colinkit';
import Home from '../home'
class Global extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Home/>
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