/**
 * 模态loading组件
 * 用于ajax的loading效果
 */
import React from 'react';
import {msg} from 'iflux-native';
import {View, Platform, StyleSheet, ActivityIndicator} from 'react-native';

class CLModalLoading extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false
        }
    }

    componentDidMount(){
        msg
            .on('ModalLoading:hide', this._handleDisplay.bind(this, false))
            .on('ModalLoading:show', this._handleDisplay.bind(this, true));
    }

    componentWillUnmount(){
        msg
            .removeListener('ModalLoading:hide')
            .removeListener('ModalLoading:show');
    }

    render() {
        if (!this.state.display) {
            return null;
        }

        return (
            <View style={styles.overlay}>
                <ActivityIndicator color="#CCCCCC" size="large" style={styles.progress}/>
            </View>
        );
    }

    _handleDisplay(display){
        this.setState({
            display: display
        });
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    progress: {
        width: 30,
        height: 30
    }
});


export default CLModalLoading;