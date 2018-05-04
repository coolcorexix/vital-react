import React, {Component} from 'react';
import {StyleSheet, View, Button, Picker, Text, TouchableOpacity} from 'react-native';
import UserInfoDisplay from './UserInfoDisplay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../Redux/Actions/LogInAction';
import firebase from '../Firebase/config/firebase'




class SideBar extends Component{
  constructor(){
    super();
  }
  signOut = () => {
    this.props.logOutUser();
    firebase.auth().signOut();
  }
  render(){
    return(
      <View style={{flex: 1, justifyContent:'space-between'}}>
        <View style={{backgroundColor:'red'}}>
          <UserInfoDisplay phone={this.props.usrPhone} name={this.props.usrName} ava={this.props.avaURL}/>
        </View>
        <TouchableOpacity onPress={this.signOut}>
          <View style={{margin:5, borderRadius:2, borderWidth: StyleSheet.hairlineWidth, borderColor:'#e74c3c', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontFamily:'helveticaneuelightitalic', color:'#e74c3c', fontSize: 20}}> Đăng xuất </Text>
            <Icon style={{marginTop:2}} name='sign-out' color='#e74c3c' size={15}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }}
  function mapStateToProps(state){
    return {
      usr: state.userReducer,
      usrName: state.userReducer.info.name,
      avaURL: state.userReducer.info.avaURL,
      usrPhone: state.userReducer.info.phone
    }
  }
  function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
