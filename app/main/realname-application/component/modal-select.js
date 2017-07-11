/**
 * Created by Colin on 2017/6/6.
 */
import React from 'react';

import {View, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';


/**
 * Usage
 *
 * <Loading/>
 */
class ModalSelect extends React.Component {


    render() {
        return (
            <View style={styles.overlay}>
                <View style={styles.items}>
                    <TouchableOpacity style={styles.item}
                                      onPress={()=>this.props.onPress1()}>
                        <Text>拍照</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}
                                      onPress={()=>this.props.onPress2()}>
                        <Text>我的相册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}
                                      onPress={()=>this.props.onPress3()}>
                        <Text>取消</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


/**
 * style
 */
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 50, 0, 0.3)'
    },
    items: {
        width: 200,
        height: 200,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30
    }
});


export default ModalSelect;