/**
 * Created by Colin on 2017/4/20.
 */
import React from 'react';
import {View, TouchableOpacity, Text, Dimensions, StyleSheet} from 'react-native';

const {width, height}=Dimensions.get('window');

export default class BottomBtn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={{position:'relative', bottom:0}}>
                <View style={styles.container}>
                    {this.props.text !== '下一步' ? <View>
                        <Text>{this.props.count}</Text>
                    </View> : null}
                    <Text style={styles.textNext}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A4AFF'
    },
    textNext: {
        fontSize: 20,
        color: 'white',
        textAlign:'center'
    }
});