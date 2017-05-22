/**
 * Created by Colin on 2017/5/22.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as GlobalAction from './action';
import {CLModalLoading} from 'colinkit';
import Home from '../home'
class Global extends React.Component {

    render() {
        const showLoading = this.props.GlobalReducer.showLoading;
        return (
            <View style={styles.container}>
                <Home  {...this.props}/>
                {showLoading?<CLModalLoading/>:null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapActionCreators = (dispatch) => ({
    global: bindActionCreators(GlobalAction, dispatch),
});

const mapStateToProps = (state)=>
    ({
        GlobalReducer: state.GlobalReducer
    });

export default connect(mapStateToProps, mapActionCreators)(Global)