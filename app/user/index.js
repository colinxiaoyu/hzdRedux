/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {View,StyleSheet} from 'react-native';
import LoginPage from './login/LoginPage'
import LogedPage from './loged/LogedPage'
import * as UserAction from './action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class User extends React.Component{

    constructor(props){
        super(props);
        this._handleContent = this._handleContent.bind(this)
    }

    componetWillMount(){
        
    }

    render(){
       if(__DEV__){
           console.log('User render',this.props);
       }
        const {currentPage} = this.props.UserReducer;
        return(
            <View style = {styles.container}>
                {
                    this._handleContent(currentPage)
                }
            </View>
        )
    }

    _handleContent(currentPage){
        if(window.token&&currentPage=='LogedPage'){
            return (<LogedPage {...this.props}/>)
        }else {
            return(<LoginPage {...this.props}/>)
        }
    }
}
const mapStateToProps= (state)=>({
    UserReducer:state.UserReducer
});

const mapActionCreators = (dispatch)=>({
    user:bindActionCreators(UserAction,dispatch)
});

const styles = StyleSheet.create({
    container:{
        flex:1
    }
});

export default connect(mapStateToProps,mapActionCreators)(User);