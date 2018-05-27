import React, {Component} from 'react';
import {TextInput,Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';
import ToastExample from '../NativeModule/ToastExample';

export default class OnOffButton extends Component{
  constructor(){
    super();
    this.state={
      selected: 1
    }
  }
  render(){

    return (
        <View style={{flexDirection:'row', justifyContent:'center', marginLeft:'5%', borderRadius: 2, borderWidth: StyleSheet.hairlineWidth, borderColor: '#e74c3c'}}>
          <TouchableOpacity activeOpacity={1} onPress={()=>
            {
              ToastExample.show('Chọn địa điểm từ bản đồ', ToastExample.SHORT);
              this.setState({
                selected: 0
              })
            }

          }>
            <View style={{width:35, borderWidth:1, borderColor:'#e74c3c',height:35, justifyContent: 'center', backgroundColor: (this.state.selected==0)?"#e74c3c":'white',alignItems:'center'}}>
              <Icon color={(this.state.selected==0)?"white":'#e74c3c'} size={20} name='map-marker'/>
            </View>
          </TouchableOpacity>
          <View style={{borderRightWidth: StyleSheet.hairlineWidth, borderColor: '#e74c3c'}}/>
          <TouchableOpacity onPress={()=>{
            this.setState({
              selected: 1
            });
            ToastExample.show('Nhập địa điểm vào ô văn bản', ToastExample.SHORT);
          }} activeOpacity={1}>
            <View style={{width:35,height:35, borderWidth:1, borderColor:'#e74c3c', backgroundColor: (this.state.selected==1)?"#e74c3c":'white', justifyContent: 'center',alignItems:'center'}}>
              <Icon color={(this.state.selected==1)?"white":'#e74c3c'} size={20} name='font'/>
            </View>
          </TouchableOpacity>
        </View>
    )
  }
}
