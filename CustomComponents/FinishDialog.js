import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  Animated, Image, Easing, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';


class FinishDialog extends Component{
  constructor(){
    super();
    this.springValue = new Animated.Value(0.3);
  }


  render(){
    Animated.spring(
      this.springValue,
      {
        friction: 1.0,
        toValue: 1
      }
    ).start();
    const {onPress} = this.props;
    return(
      <View style={{position:'absolute', elevation: 10, backgroundColor:'#2ecc71', width: '100%', height:'100%', justifyContent:'space-around', alignItems:'center'}}>
        <Animated.View style={{transform:[{scale: this.springValue}]}}>
          <Icon name='check-circle' size={150} color='white'/>
        </Animated.View>
        <Text style={{fontFamily:'helveticaneuelightitalic', color: 'white',fontSize: 20,margin: 10, textAlign:'center'}}>Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi</Text>
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={1}>
          <View style={{justifyContent:'center', borderRadius:2, alignItems:'center', backgroundColor:'white'}}>
            <Text style={{fontFamily:'helveticaneuecondensedbold', color:'#2ecc71', fontSize: 20, margin: 5}}>XONG</Text>
          </View>
        </TouchableOpacity>

      </View>

    )
  }
}
FinishDialog.propTypes = {
  onPress : PropTypes.func.isRequired
}
export default FinishDialog;
