import React,{Component} from 'react';
import {StyleSheet, View, Button, Image, Text, TextInput, TouchableOpacity, Animated, Easing, Dimensions} from 'react-native';
import CustomButton from './CustomButton';
import PropTypes from 'prop-types';
import {CustomPicker} from 'react-native-custom-picker';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Actions from '../Redux/Actions/AccidentPickerActions';
import * as poppingAction from '../Redux/Actions/poppingAction';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const styles = StyleSheet.create({
  container:
  {
    backgroundColor: '#34495e',
    top: 0,
    height: Dimensions.get('window').height/10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  }
})
// ,
// {label: 'Khác', value: 2}
var accident_icons={wheel:'wrench', key:'key', other: 'plus-square'};
var radio_props =[{label: 'Hỏng Xe', value: 0},
                  {label: 'Mất Khóa', value: 1},
                  {label: 'Khác', value: 2}];
class TopBar extends Component{
  constructor(){
    super();
    this.translateValue = new Animated.Value(0);
    this.state={
      accidentRadio: false,
      otherDialog: false,
      value: 0
    }
  }
  translate(){
    this.translateValue.setValue(-Dimensions.get('window').height/10);
    return Animated.timing(
      this.translateValue,
      {
        toValue:0,
        duration: 400,
        easing:Easing.linears,
      }
    ).start();
  }
  renderDefaultTopBar(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={{flex:1, marginLeft: 10}} onPress={()=>this.props.onPress()}>
          <Icon name={"bars"} size={30} color="#fff" />
        </TouchableOpacity>
        <View style={{flex: 2}}/>
        <TouchableOpacity style={{flex: 2}} onPress={()=>{
          this.setState({
                      accidentRadio:true
          });

        }}>
          <View style={{ flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'akrobat_black', fontSize: 30, color:'#d35400'}}> V.</Text>
            <Text style={{fontFamily: 'akrobat_black', fontSize: 30, color:'#e67e22'}}> R. </Text>
            <Icon name={accident_icons[accident_icons[this.props.accident]?this.props.accident:'other']} size={25} color='#d35400'/>
          </View>
        </TouchableOpacity>
        <View style={{flex: 2}}/>
        <TouchableOpacity style={{flex: 1,alignItems:'center', justifyContent: 'center'}} onPress={this.props.onRightPress}>
          <Icon name={"user"} size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
  renderOtherDialog(){
    return(
      <View style={styles.darkFade}>
        <View style={styles.acceptDialog}>
          <TextInput placeholder='Hãy trình bày cụ thể hơn..'/>
          <Button title='Xong' onPress={()=>
            {
              this.setState({
                otherDialog: false
              })
            }
          }/>
        </View>
      </View>
    )

  }
  renderRadioButton(){
    this.translate();
    return(
      <Animated.View style={{flex: 1, height: Dimensions.get('window').height/10, transform:[{translateY: this.translateValue}]}}>
        <RadioForm
          style={{justifyContent:'center', height:'100%', width:'100%', alignItems:'center', backgroundColor:'#34495e'}}
          formHorizontal={true}
          labelHorizontal={false}
          >
          {radio_props.map((param, value)=>(
            <RadioButton labelHorizontal={false} key={value}>
              <RadioButtonInput obj={param}
                                index={value}
                                animation={true}
                                isSelected={this.state.value===value}
                                onPress={()=>{
                                  this.setState(
                                  {
                                    value: value,
                                    accidentRadio: false
                                  });
                                  if (value == 2){
                                    this.props.otherPopping();
                                  }
                                  this.props.chooseAccident({accident: (value==1)?'key':(value==0)?'wheel':'other'})
                                }}
                                borderWidth={2}
                                buttonOuterColor={this.state.value===value?'#d35400':'#95a5a6'}
                                buttonSize={20}
                                buttonOuterSize={30}
                                buttonInnerColor='#e67e22'/>
                <RadioButtonLabel obj={param}
                                  onPress={()=>{}}
                                  index={value}
                                  labelWrapStyle={{marginTop: 5, justifyContent:'center', backgroundColor:'#ecf0f1', alignItems:'center', borderRadius: 10}}
                                  labelStyle={{fontSize:15, margin: 2, marginLeft:5, marginRight:5, color: '#34495e', fontFamily:'helveticaneuelightitalic'}}/>
            </RadioButton>
          ))}
        </RadioForm>
      </Animated.View>
    )
  }
  renderAccidentRadio(){
    return(
      <View style={styles.container}>
        {!this.state.otherDialog&&this.renderRadioButton()}
        {this.state.otherDialog&&this.renderOtherDialog()}
      </View>
    )

  }

  render(){
    const {onPress, onRightPress} = this.props;
    return (
      <View>
        {!this.state.accidentRadio&&this.renderDefaultTopBar()}
        {this.state.accidentRadio&&this.renderAccidentRadio()}
      </View>
    )}
}
function mapStateToProps(state){
  return {
    accident: state.userReducer.accident
  };
}
function mapDispatchToProps(dispatch){
  var LogInAction = bindActionCreators(Actions, dispatch);
  var PoppingAction = bindActionCreators(poppingAction, dispatch);
  return Object.assign({},LogInAction,PoppingAction);
}
TopBar.PropTypes={
  onPress: PropTypes.func.isRequired,
  onRightPress: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
