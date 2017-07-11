/**
 * Created by Colin on 2017/6/13.
 */
import React from 'react';
import {
    View, StyleSheet, Dimensions, TextInput
} from 'react-native';
import {
    CLDialog,CLBottomBtn,CLHeader,CLFormContainer
} from 'colinkit'

import {msg} from 'iflux-native';

import AddImage from './component/addImage';
import ModalSelect from './component/modal-select';

const {width, height}=Dimensions.get('window');

class RealNameApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            realName: '',
            IDNum: '',
            showModal:false
        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <CLHeader
                    title="实名认证申请"
                    renderLeft={()=>{
                        this._renderLeft();
                    }}/>
                <CLFormContainer
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#BFBFBF'
                        underlineColorAndroid="transparent"
                        value={this.state.realName}
                        placeholder={"请输入真实姓名"}
                        onChangeText={(text)=>{
                            this.setState({
                                realName:text
                            })
                        }
                     }/>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#BFBFBF'
                        underlineColorAndroid="transparent"
                        value={this.state.IDNum}
                        placeholder={"请输入身份证号"}
                        keyboardType="numeric"
                        onChangeText={(text)=>{
                            this.setState({
                                IDNum:text
                            })
                        }
                     }/>
                    <AddImage 
                        text="请上传身份证正面图片（人像面）"
                        onPress={()=>this._changeModalVisiable(true)}
                    />
                    <AddImage text="请上传身份证背面图片（国徽面）"
                              onPress={()=>this._changeModalVisiable(true)}/>
                    <AddImage text="请上传个人近照图片"
                              onPress={()=>this._changeModalVisiable(true)}/>
                </CLFormContainer>
                <CLBottomBtn text="下一步"/>

                {this.state.showModal?
                    <ModalSelect
                        onPress1={()=>this._changeUserImage(0)}
                        onPress2={()=>this._changeUserImage(1)}
                        onPress3={()=>this._changeUserImage(2)}
                    />:null
                }
            </View>
        )
    }
    //控制弹出框是否显示
    _changeModalVisiable(visiable){
        this.setState({
            showModal:visiable
        });

    }

    _renderLeft(){
        msg.emit('app:tip', '回退');
        msg.emit('route:backToLast');
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1
    },
    textInput: {
        flex: 1,
        margin: 10,
        height: 60,
        width: width - 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#BFBFBF'
    }
});

export default  RealNameApplication;