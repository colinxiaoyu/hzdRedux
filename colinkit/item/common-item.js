/**
 * Created by Colin on 2017/5/23.
 */
import React from 'react';
import {
    StyleSheet, TouchableOpacity, style, Text,Image,Dimensions,View
} from 'react-native';

const {width, height}=Dimensions.get('window');

class CommonItem extends React.PureComponent {

    static propTypes = {
        // icon:React.PropTypes.any.isRequired,//左边按钮
        // title:React.PropTypes.string.isRequired,//标题
        // onPress:React.PropTypes.func.isRequired,//点击事件
    };

    render() {
        return (
            <TouchableOpacity
                onPress={()=>this.props.onPress()}
                style={styles.itemContainer}>
                <View style={styles.innerContainer}>
                    <Image style={styles.itemImage}
                           resizeMode="stretch"
                           source={this.props.icon}/>

                    <Text style={styles.itemText}>{this.props.title}</Text>
                    <Image style={styles.btnBack}
                           source={require('./img/btn_more.png')}
                           resizeMode="stretch"/>
                </View>
            </TouchableOpacity>)
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        width:width,
        height: 70,
        backgroundColor: 'white'
    },
    innerContainer:{
        flexDirection: 'row',
        marginLeft: 10,
        height: 70,
        borderBottomColor: '#BFBFBF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
    },

    itemImage: {
        height: 36,
        width: 36
    },

    itemText: {
        fontSize: 15,
        flex: 1,
        paddingLeft: 10,
        textAlign: 'left',
    },
    btnBack: {
        marginRight: 20,
        height: 20,
        width: 10
    },
});
export default CommonItem;