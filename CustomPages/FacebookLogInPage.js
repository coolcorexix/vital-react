import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  Animated, Image, Easing
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { handleFbLogin } from '../FacebookLogIn/lib/auth';
import * as Actions from '../Redux/Actions/LogInAction';
import firebase from '../Firebase/config/firebase';

import CustomButton from '../CustomComponents/CustomButton'

class FacebookLogInPage extends Component<{}> {
  constructor(){
    super();
    this.translateValue = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3);
    this.spinValue=new Animated.Value(0);
  }
  componentDidMount(){
    this.spring().start();

  }
  translate(){
    this.translateValue.setValue(0);
    return Animated.timing(
      this.translateValue,
      {
        toValue:1,
        duration: 8000,
        easing:Easing.linears,
      }
    ).start(()=>{this.translate()})
  }
  spring(){
    this.springValue.setValue(0.3);
    return Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    )
  }
  spin(){
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linears
      }
    ).start(() => this.spin())
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    const deviceHeight = Dimensions.get('window').height;
    const translate = this.translateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, deviceHeight*2]
    })
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const {navigate} = this.props.navigation;
    return (

      <View style={styles.container}>

      <Animated.Image style={{width:200,
                            height:200,
                            resizeMode:'contain',
                            transform:[
                              {rotate: spin},
                              {scale: this.springValue}
                            ]}}

                            source={{uri: 'https://i.imgur.com/JKUZStg.png'}}>
      </Animated.Image>
      <View style={{flexDirection:'row', marginBottom:15}}>
        <Text style={{fontFamily: 'akrobat_black', fontSize: 30, color:'#d35400'}}>Vital</Text>
        <Text style={{fontFamily: 'akrobat_black', fontSize: 30, color:'#e67e22'}}> React</Text>
      </View>
      <CustomButton
        onPress={()=>{
          handleFbLogin().then((result)=>{
            if (result.payload != null)
            {
              this.props.retrieveUser(result.payload)
              firebase.database().ref(`OnlineUsers/${result.payload.info.id}`).set(
                  {
                    status: 'online'
                  }
                ).then(()=>{
                  navigate('Profile');
                });

            }
            else alert('failed');
          }).catch((err)=>alert(err))}}
        fontFamily="helveticaneuelightitalic"
        text = "Kết nối bằng Facebook"
        colorUnpress = "#3b5998"
        colorPress = "#223458"
        iconUri = "https://i.imgur.com/vVzNoGG.png"
      />
      <CustomButton onPress={()=>{
        navigate('PhoneLogIn');
      }}
      text = 'Đăng nhập bằng số điện thoại'
      fontFamily="helveticaneuelightitalic"
      colorUnpress='#1abc9c'
      colorPress='#16a085'
      onPress={()=>{
        navigate('PhoneLogIn');
      }}
      iconUri='https://i.imgur.com/NjutTTu.png' />



      </View>
    );
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Actions, dispatch);
}
export default connect(()=>{return {}}, mapDispatchToProps)(FacebookLogInPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  }
});
