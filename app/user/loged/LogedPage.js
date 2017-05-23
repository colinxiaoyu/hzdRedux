/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {CLItem} from 'colinkit';
import {ToastAndroid} from 'react-native'

class LogedPage extends React.Component {
    render() {
        return (
            <CLItem style={{flex:1}}>
                <CLItem.CLCommonItem
                    icon={require('./img/ic_fragment_mine_realname.png')}
                    title='我的进度'
                    onPress={()=>{
                        ToastAndroid.show('我的进度',2000);
                    }}/>
            </CLItem>)
    }
}

export default LogedPage;