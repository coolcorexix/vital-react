import React, {Component} from 'react';
import {Text, Image, TextInput, Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import CustomMapView from '../CustomComponents/CustomMapView';
import CustomButton from '../CustomComponents/CustomButton';
import UserInfoDisplay from '../CustomComponents/UserInfoDisplay';
import {DrawerNavigator} from 'react-navigation';
import firebase from '../Firebase/config/firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import FinishDialog from '../CustomComponents/FinishDialog';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import OnOffButton from '../CustomComponents/OnOffButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RNGooglePlaces from 'react-native-google-places';


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'space-between',
  } ,
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  darkFade:{
    elevation: 12,
    backgroundColor:'#00000090',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:'100%'
  },
  acceptDialog:{
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    height:'30%',
    width:'50%'
  }
});



export default class HistoryPage extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }




  render(){
    //        <UserInfoDisplay style={{height:'50%'}} name={this.props.usrName} ava={this.props.avaURL}/>
    return(
      <View style={{alignItems:'center', flex: 1, justifyContent:'center'}}>
          <OnOffButton ref={ref=>this.onOff= ref}/>
          <Button title='Press' onPress={()=>alert(this.onOff.state.selected)}/>
      </View>
    )
  }
}
