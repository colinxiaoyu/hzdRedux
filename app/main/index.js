/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    ScrollView,
    ToastAndroid,
    TouchableOpacity
} from 'react-native'
import {CLHeader} from 'colinkit';
import * as MainAction from './action'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


const {width, height}= Dimensions.get('window');

class Main extends React.Component{
    constructor(props) {
        super(props);
        this._handleScroll = this._handleScroll.bind(this);

    }

    render() {
        const {color} = this.props.MainReducer;
        if(__DEV__){
            console.log('main render',`rgba(0,85,255,${color})`)
        }
        return (
            <View style={{flex:1}}>
                <CLHeader
                    title="汇众贷"
                    style={{backgroundColor:`rgba(0,85,255,${color})`}}>
                </CLHeader>
                <ScrollView style={styles.container}
                            showsVerticalScrollIndicator={false}
                            onScroll={this._handleScroll}>
                    <Image
                        resizeMode="stretch"
                        source={require('./img/banner.png')}
                        style={styles.headerImage}/>
                    <View style={styles.accessContainer}>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={this._applyTouch}>
                            <Image
                                resizeMode="stretch"
                                style={styles.accessImage}
                                source={require('./img/ic_fragment_home_online_apply.png')}/>
                            <Text style={{fontSize:15}}>线上进件</Text>
                        </TouchableOpacity>
                        <View style={styles.liner}/>
                        <TouchableOpacity
                            style={styles.iconContainer}>
                            <Image
                                resizeMode="stretch"
                                style={styles.accessImage}
                                source={require('./img/ic_fragment_home_online_assist.png')}/>
                            <Text style={{fontSize:15}}>外访在线协助</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.loanText}>借款方案</Text>
                        <Image
                            resizeMode="stretch"
                            style={styles.loanImage}
                            source={require('./img/home_introduce1.png')}/>
                    </View>
                    {this._DetialData('工薪类',
                        '专门为拥有稳定工作及收入的授薪人群推出的信贷方案。',
                        '额度：最高20万元',
                        '材料：个人身份证明、征信报告、经营证明、收入证明等。',)}
                    {this._DetialData('工薪类',
                        '专门为拥有稳定工作及收入的授薪人群推出的信贷方案。',
                        '额度：最高20万元',
                        '材料：个人身份证明、征信报告、经营证明、收入证明等。',)}
                    {this._DetialData('工薪类',
                        '专门为拥有稳定工作及收入的授薪人群推出的信贷方案。',
                        '额度：最高20万元',
                        '材料：个人身份证明、征信报告、经营证明、收入证明等。',)}

                </ScrollView>
            </View>
        )
    }

    _DetialData(catagory, detial, quota, materia) {
        return (
            <View style={styles.detialContainer}>
                <Text style={styles.catagory}>{catagory}</Text>
                <View style={styles.cutLine}/>
                <Text style={styles.detial}>{detial}</Text>
                <Text style={styles.quota}>{quota}</Text>
                <Text style={styles.materia}>{materia}</Text>
            </View>
        )
    }


    _applyTouch = ()=> {
        // this.props.navigator.push({
        //     component: RealNameApplicationPage
        // });
    };

    _handleScroll(e){
        //View滑动的拉动距离
        const offsetY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y;
        this._changeTopBarStyle(offsetY);

    }

    _changeTopBarStyle(offsetY){
        //在banner区域内,背景色渐变,超过banner的距离后,变为固定值
        const {changeTitleColor} = this.props.main;
        if (offsetY >= 10) {
            let floatNum = 1 + (offsetY) / 14;
            floatNum = floatNum > 9 ? 9 : floatNum;
            changeTitleColor(floatNum / 13);
        } else if (offsetY <= 5) {
            changeTitleColor(0.1);
        }
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BFBFBF'
    },
    headerImage: {
        width: width,
        height: 200
    },
    accessContainer: {
        width: width,
        height: 80,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8
    },
    iconContainer: {
        width: width / 2 - 20 * 2,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    accessImage: {
        width: 30,
        height: 30
    },
    liner: {
        width: 1,
        height: 80,
        backgroundColor: '#BFBFBF'
    },

    loanText: {
        fontSize: 15,
        height: 50,
        width: width,
        paddingLeft: 10,
        backgroundColor: 'white',
        textAlign: 'left',
        lineHeight: 35
    },
    loanImage: {
        width: width,
        height: 200
    },
    detialContainer: {
        backgroundColor: 'white',
        marginBottom: 5,
    },
    catagory: {
        fontSize: 20,
        height: 50,
        width: width,
        paddingLeft: 10,
        textAlign: 'left',
        lineHeight: 35,
        fontWeight: 'bold'
    },
    cutLine: {
        marginLeft: 10,
        backgroundColor: '#BFBFBF',
        width: width,
        height: StyleSheet.hairlineWidth,
    },
    detial: {
        fontSize: 15,
        height: 50,
        width: width,
        paddingLeft: 10,
        textAlign: 'left',
        lineHeight: 35
    },
    quota: {
        fontSize: 15,
        height: 50,
        width: width,
        paddingLeft: 10,
        textAlign: 'left',
        lineHeight: 35
    },
    materia: {
        fontSize: 15,
        height: 50,
        width: width,
        paddingLeft: 10,
        textAlign: 'left',
        lineHeight: 35
    }
});

const mapStateToProps = (state)=>
    ({
        MainReducer: state.MainReducer
    });

const mapActionCreators = (dispatch)=>({
    main: bindActionCreators(MainAction, dispatch),
});

export default connect(mapStateToProps,mapActionCreators)(Main);