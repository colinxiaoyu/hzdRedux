/**
 * Created by Colin on 2017/5/22.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native'
import {CLModalLoading,CLTip} from 'colinkit';
import Root from './root';
import {msg} from 'iflux-native';


//计划这里定义所有的全局状态
class Global extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            //错误tip的显示状态
            isTipVisible: false,
            //tip的text
            isTipText: '',
        }
        this._handleAppTip = this._handleAppTip.bind(this);
        this._handleTipDisappear = this._handleTipDisappear.bind(this);
    }

    componentDidMount(){
        //全局的tip处理
        msg.on('app:tip', this._handleAppTip);
    }

    componentWillUnmount(){
        msg.removeListener('app:tip', this._handleAppTip);
    }

    render() {
        return (
            <View style={styles.container}>
                <Root/>
                <CLModalLoading/>
                {/*全局的tip*/}
                <CLTip
                    modal={false}
                    text={this.state.isTipText}
                    visible={this.state.isTipVisible}
                    onTipDisappear={this._handleTipDisappear}/>
            </View>
        )
    }

    /**
     * 处理appTip
     */
    _handleAppTip(text){
        this.setState({
            isTipVisible: true,
            isTipText: text
        });
    }

    /**
     * 恢复tip的原始状态
     */
    _handleTipDisappear(){
        this.setState({
            isTipVisible: false,
            isTipText: ''
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});



export default Global