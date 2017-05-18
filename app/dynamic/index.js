/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import {CLHeader} from 'colinkit'

const {width, height}=Dimensions.get('window');

class Dynamic extends React.Component{
    constructor(props) {
        super(props);
    }

    _produceItem(source, title) {
        return (<TouchableOpacity
            onPress={()=>this._goDetial(title)}>
            <View style={styles.item}>
                <Image style={styles.itemIcon}
                       source={source}/>
                <Text style={styles.itemTitle}>{title}</Text>
            </View>
        </TouchableOpacity>)
    }

    _goDetial(title) {

        switch (title) {
            case "盛世动态":
                ToastAndroid.show(title, 2000);
                this.props.navigator.push({
                    component: DynamicDetialPage
                });
                break;
            default:
                break;
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <CLHeader title="汇中盛世"/>
                <View style={styles.content}>
                    <View style={styles.firstContainer}>
                        {this._produceItem(require('./img/ic_hzsh_shengshi_dynamic.png'), '盛世动态')}
                        <View style={styles.cutLineVertical}/>
                        {this._produceItem(require('./img/ic_hzsh_product_presentation.png'), '产品介绍')}
                    </View>
                    <View style={styles.lineContainer}>
                        <View style={styles.cutLineHorizontal}/>
                        <View style={styles.cutLineHorizontal}/>
                    </View>
                    <View style={styles.firstContainer}>
                        {this._produceItem(require('./img/ic_hzsh_charity.png'), '慈善公益')}
                        <View style={styles.cutLineVertical}/>
                        {this._produceItem(require('./img/ic_hzsh_ompliance_consulting.png'), '合规资讯')}
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        alignSelf:'center',
        marginTop:100,
        height: 200,
        width: 200,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    firstContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        width: 200
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        height: 30
    },
    item: {
        width: 90,
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemIcon: {
        width: 60,
        height: 60,
    },
    itemTitle: {
        color: 'gray',
        fontSize: 18,
    },
    cutLineVertical: {
        backgroundColor: '#BFBFBF',
        width: StyleSheet.hairlineWidth,
        height: 65
    },
    cutLineHorizontal: {
        marginVertical: 20,
        backgroundColor: '#BFBFBF',
        width: 65,
        height: StyleSheet.hairlineWidth
    }
});

export default Dynamic;