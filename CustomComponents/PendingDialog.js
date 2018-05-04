import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  Animated, Image, Easing
} from 'react-native';

export default class PendingDialog extends Component{
  constructor(){
    super();
    this.fade1Value = new Animated.Value(1);
    this.radiate1Value = new Animated.Value(0);
    this.radiate2Value = new Animated.Value(0);
    this.radiate3Value = new Animated.Value(0);
    this.wait1Value = new Animated.Value(0);
    this.wait2Value = new Animated.Value(0);
  }
  componentDidMount(){
     this.radiate1();
     this.wait1().start(()=>this.radiate2());
     this.wait2().start(()=>this.radiate3());

  }
  wait1(){
    return Animated.timing(
      this.wait1Value,{
        toValue: 1,
        duration: 3000,
        easing:Easing.linears
      })
  }
  wait2(){
    return Animated.timing(
      this.wait2Value,{
        toValue: 1,
        duration: 6000,
        easing:Easing.linears
      }
    )
  }
  radiate1(){
    this.radiate1Value.setValue(0);
    Animated.timing(
      this.radiate1Value,{
        duration:10000,
        toValue: 1,
        easing: Easing.linears
      }).start(()=>this.radiate1());
  }
  radiate2(){
    this.radiate2Value.setValue(0);
    Animated.timing(
      this.radiate2Value,{
        duration:10000,
        toValue: 1,
        easing: Easing.linears
      }).start(()=>this.radiate2());
  }
  radiate3(){
    this.radiate3Value.setValue(0);
    Animated.timing(
      this.radiate3Value,{
        duration:10000,
        toValue: 1,
        easing: Easing.linears
      }).start(()=>this.radiate3());
  }


  render(){
    const fade1 = this.radiate1Value.interpolate({
      inputRange:[-0.1,1.1],
      outputRange:[0.9,0.3]
    });
    const fade2 = this.radiate2Value.interpolate({
      inputRange:[-0.1,1.1],
      outputRange:[0.9,0.3]
    });
    const fade3 = this.radiate3Value.interpolate({
      inputRange:[-0.1,1.1],
      outputRange:[0.9,0.3]
    });
    console.log(this.radiate1Value.__getValue());
    return(
      <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#f1c40f', width:'100%', height:'100%', position: 'absolute'}}>
        <Image style={{width: '100%', height: '40%', resizeMode:'contain'}} source={{uri: 'https://media.giphy.com/media/zglFPxjeRbdm0/giphy.gif'}} />
        <Text style={{color:'white'}}>Đang chờ phản hồi từ các cứu hộ lân cận..</Text>
      </View>
    )
  }
}
// <Animated.Image style={{position: 'absolute', resizeMode:'contain', opacity: fade1, flex: 1, transform:[{scale: this.radiate1Value}]
// }} source={require('../image-res/round.png')}/>
// <Animated.Image style={{position: 'absolute',resizeMode:'contain', opacity: fade2, flex: 1, transform:
// [{scale: this.radiate2Value}]
// }} source={require('../image-res/round.png')}/>
// <Animated.Image style={{position: 'absolute',resizeMode:'contain', opacity: fade3, flex: 1, transform:
// [{scale: this.radiate3Value}]
// }} source={require('../image-res/round.png')}/>
// <Text style={{fontFamily:'akrobat_black', fontSize: 30}}>Đang chờ phản hồi từ các cứu hộ viên lân cận</Text>
