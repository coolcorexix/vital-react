import React, {Component} from 'react';
import {StyleSheet, View, Button, Picker, Text, TouchableOpacity, TextInput, Slider} from 'react-native';
import UserInfoDisplay from './UserInfoDisplay';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../Redux/Actions/LogInAction';
import * as accidentActions from '../Redux/Actions/AccidentPickerActions';
import firebase from '../Firebase/config/firebase';





class SideBar extends Component{
  constructor(){
    super();
    this.state={
      sliderValue: 20,
      submitValue: ''
    }
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
        <Text style={{marginLeft: 5, fontFamily:'helveticaneuelightitalic', fontSize:20}}>Bán kính loan báo:</Text>
        <Slider step={1} thumbTintColor='#f1c40f' style={{elevation:5}} maximumValue={80}
        value={this.state.sliderValue}
        onValueChange={value=>{this.setState({
          sliderValue: value
        });
        this.props.chooseRadius(value);
      }} style={{width:'90%'}}/>
        <Text
          style={{fontFamily:'helveticaneue', fontSize: 25, textAlign:'center'}}>
          {this.state.sliderValue} km
          </Text>
        <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'gray'}}/>
        <TextInput value={
          this.state.submitValue
        } placeholder='Hãy giúp chúng tôi cải thiện chất lượng bằng cách phản hồi..'
        onChangeText={text=>this.setState({
          submitValue: text
        })}
         multiline={true} style={{
          width:'90%',
          height:'30%'
        }}/>
        <Button style={{margin: 5}} onPress={()=>{
          firebase.database().ref('Feedback').push(this.state.submitValue);
          this.setState({
            submitValue: ''
          });
          alert('Cảm ơn');
        }} title='Gửi đi'/>
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
    var accidentAct = bindActionCreators(accidentActions, dispatch);
    var loginAct = bindActionCreators(Actions, dispatch)
    return Object.assign({}, accidentAct, loginAct);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
