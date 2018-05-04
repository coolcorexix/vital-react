import React, {Component} from 'react';
import {Text, TouchableHighlight, Button, View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';

class UserInfoDisplay extends Component{

  render(){
    const {name, ava, phone} = this.props;
    return(
        <View style={styles.container}>
          <View style ={[{flex:4}, styles.avatar]}>
            <Image style={{flex: 1, borderRadius: 100, margin: 20, resizeMode: 'contain'}} source={{uri: this.props.ava}}/>
          </View>
          <Text style={{ flex: 1, color: '#34495e', fontWeight: 'bold'}}> {this.props.name} </Text>
          <Text style={{flex:1, color: '#34495e', fontWeight: 'bold'}}> {this.props.phone}</Text>
        </View>

    );
  }
}
UserInfoDisplay.propTypes = {
  phone:PropTypes.string,
  name: PropTypes.string,
  ava: PropTypes.string
}
export default UserInfoDisplay;
const styles = StyleSheet.create({
  container:{
    'backgroundColor': '#ecf0f1',
    height: 150,
    'width': '100%',
    'justifyContent': 'space-around',
    'alignItems': 'center',
  },
  avatar:{
    'width': '100%'
  }
})
