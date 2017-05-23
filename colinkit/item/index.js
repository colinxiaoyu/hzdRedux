/**
 * Created by Colin on 2017/5/23.
 */
import React from 'react';

import {View} from 'react-native';

import CommonItem from './common-item';
import VariableItem from './variable-item';


/**
 * Usage:
 */
class Item extends React.Component{


    render() {
        return (
            <View style={this.props.style}>
                {this.props.children}
            </View>
        )
    }
}

//普通item
Item.CLCommonItem = CommonItem;
//实名认证item
Item.CLVariableItem = VariableItem;

export default Item;