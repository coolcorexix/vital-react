import React, {Component} from 'react';
import {Text, Image, TextInput, Button, StyleSheet, View, TouchableHighlight } from 'react-native';
import CustomButton from '../CustomComponents/CustomButton';
import * as Actions from '../Redux/Actions/LogInAction';
import firebase from '../Firebase/config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';



const styles = StyleSheet.create({
  textInput:{
    margin: 10,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginLeft: 15,
    marginRight: 15
  },
  text:{
        margin: 10,
        flex:1,
        fontFamily: 'helveticaneuelightitalic',
        color:'white'
  },
  container:{
    backgroundColor:'#34495e',
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  } ,
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
  },
});
class ProfilePage extends Component{
  constructor(props){
    super(props);
    const {usrName, usrPhone} = this.props;
    this.state={
      facebookRegister: false,
      phoneRegister: false,
      haveName: false,
      havePhone: false
    };

  }
  componentWillMount(){
    if (this.props.usrName!=undefined)
      this.setState({
        haveName: true
      });
    if (this.props.usrPhone!=undefined)
      this.setState({
        havePhone: true
      })

  }
componentDidMount(){
  this.txtinpName.value = this.props.usrName;
  this.txtinpPhone.value = this.props.usrPhone;
}
  static navigationOptions = {
    header: null
  };


  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <Icon name='user-circle' style={{marginBottom: 20}} size={100} color='white'/>
        <View editable={-this.state.facebookRegister} style={[styles.textInput, (this.state.haveName)?{backgroundColor: '#27ae60'}:{backgroundColor:'#e74c3c'}]}>
          <Text style={styles.text}>Tên đầy đủ: </Text>
          <TextInput style={styles.text} underlineColorAndroid='white'  defaultValue={this.props.usrName} ref={component=>this.txtinpName=component}
           onChangeText={value=>{
             if (value!='')
              this.setState({
                haveName: true
              });
              else {
                this.setState({
                  haveName: false
                })
              }
             this.txtinpName.value=value;
          }}/>
        </View>
        <View style={[styles.textInput, (this.state.havePhone)?{backgroundColor: '#27ae60'}:{backgroundColor:'#e74c3c'}]}>
          <Text style={styles.text}>Số điện thoại: </Text>
          <TextInput style={[styles.text]} underlineColorAndroid='white' ref={component=>this.txtinpPhone=component}
          onChangeText={value=>{
            if (value!='')
             this.setState({
               havePhone: true
             });
             else this.setState({
               havePhone: false
             })
            this.txtinpPhone.value=value;
         }}
          defaultValue={this.props.usrPhone}/>
        </View>
        <TouchableHighlight onPress={()=>{
          this.props.updateUser({info:{
            name: (this.txtinpName.value==" ")?this.props.usrName:this.txtinpName.value,
            phone: (this.txtinpPhone.value==" ")?this.props.usrPhone:this.txtinpPhone.value
          }});
          firebase.database().ref('RegisteredUser').push({
            name: this.txtinpName.value,
            phone: this.txtinpPhone.value
          });
          navigate('Main');
        }}>
          <View style={{flexDirection:'row', borderRadius: 5, backgroundColor:'#f1c40f', alignItems:'center', justifyContent:'center'}}>
            <Icon name='save' size={20} color='#34495e' style={{margin: 5}}/>
            <Text style={{margin: 5, color:'#34495e', fontSize:15, fontFamily:'helveticaneuemedium'}}>CẬP NHẬT</Text>
          </View>
        </TouchableHighlight>


      </View>
    )
  }
}

function mapStateToProps(state){
  return{
    usrName: state.userReducer.info.name,
    usrPhone: state.userReducer.info.phone,
    usr: state.userReducer
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(Actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
