import React, {Component} from 'react';
import {Text, Image, TextInput, Button, StyleSheet, View, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Easing} from 'react-native';
import CustomMapView from '../CustomComponents/CustomMapView';
import CustomButton from '../CustomComponents/CustomButton';
import PendingDialog from '../CustomComponents/PendingDialog';
import FinishDialog from '../CustomComponents/FinishDialog';
import UserInfoDisplay from '../CustomComponents/UserInfoDisplay';
import TopBar from '../CustomComponents/TopBar';
import firebase from '../Firebase/config/firebase';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToastExample from '../NativeModule/ToastExample';
import * as DatabaseActions from '../Redux/Actions/DatabaseAction';
import * as AccidentPickerActions from '../Redux/Actions/AccidentPickerActions';
import * as MapViewActions from '../Redux/Actions/MapViewAction';
import * as PoppingAction from '../Redux/Actions/poppingAction';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import RNGooglePlaces from 'react-native-google-places';
import OnOffButton from '../CustomComponents/OnOffButton';






import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const GeoFire = require('geofire');

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'space-between'
  },
  customButton:
  {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#c0392b',
    height: 70,
    margin: 15,
    borderRadius: 5
  },
  customButtonPressed:
  {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    height: 70,
    margin: 15,
    borderRadius: 5
  },
  image: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: 'contain' },
    containerDraw: {
    flex: 1,
  },
  darkFade:{
    elevation: 12,
    backgroundColor:'#00000050',
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
    height:'50%',
    width:'50%'
  },
  otherDialog:{
    borderRadius: 2,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    height:'40%',
    width:'70%'
  }

});

class MainPage extends Component{
  constructor(props){
    super(props);
    this.state={
      saviorData: undefined,
      otherValue: ' ',
      locatingMethod: 1,
      pending: false,
      enableCanceling: false,
      accepted: false,
      actionButtonX: 0,
      actionButtonY: 0,
      none: false,
      finished: false
    };
  }

  componentDidMount(){
    //console.log('fuck');

    //firebase.database().ref(`OnlineUsers/${this.props.usrId}/AvailableSaviors`)
    // var requestCollection = firebase.database().ref().child("RequestDetails");
    // requestCollection.on('child_added',(snapshot, previousChildName)=>{
    //   console.log('snapshot', Object.keys(snapshot.val()));
    //
    //   console.log('previousChildName', previousChildName);
    // });
  }
  openSearchModal(navigate){
    if (this.locatingMethod.state.selected==1)
    {
      RNGooglePlaces.openAutocompleteModal({country: 'VN'}).then((place)=>{
        //console.log(place);
        this.props.retrieveAddress({address: place.name});
        this.props.coordinateRetrieve({coordinates:{
          longitude: place.longitude,
          latitude: place.latitude
        }});
      }).catch(err=>console.log(err.message))
    }
    else{
      navigate('staticPick')
    }

  }
  renderFireRequestButton(navigate){
    return (
      <CustomButton fontFamily="helveticaneuecondensedbold"
      text="BẮN PHÁO SÁNG" colorPress='#c0392b'
      onPress={()=>{sendRequestDetailToDb({...this.props.usrFullReq, address: this.props.address,  status: "unsolved"}, this.props.usrId, navigate, this.props.findNearby, this)}}
      colorUnpress='#e74c3c' />
    )
  }
  renderCancelButton(){
    return (
      <CustomButton colorPress='#2980b9' colorUnpress='#3498db' fontFamily="helveticaneuecondensedbold" onPress={()=>{
        firebase.database().ref('OnlineUsers/' + this.props.usrId).update({status: 'online'});
        firebase.database().ref('OnlineSavior/'+ this.state.saviorData).update({status:'canceled'});
        this.setState({
          enableCanceling: false,
          saviorData: ""
        })
      }} text="HỦY"/>
    )
  }
  renderFinishDialog(){
    return (
      <FinishDialog onPress={()=>{
        this.setState({
          finished: false,
          enableCanceling: false
        });
        firebase.database().ref('OnlineUsers/'+this.props.usrId).update({status: 'online'});
      }}/>
    )
  }
  renderPendingDialog(){
    setTimeout(()=>{
      firebase.database().ref(`OnlineUsers/${this.props.usrId}/status`).once('value',snapshot=>{
        if (snapshot.val()=='pending') {
          this.setState({
            pending: false,
            none: true
          });
          firebase.database().ref(`OnlineUsers/${this.props.usrId}`).off();
          firebase.database().ref(`OnlineUsers/${this.props.usrId}`).update({
            status: 'online'
          });
        }
      })
    }, 30000);
    firebase.database().ref(`OnlineUsers/${this.props.usrId}/saviorPhone`).on('value',snapshot=>{
      if (snapshot.val()!=null){
        this.setState({
          saviorData: snapshot.val()
        })
      }
    })
    return(
      <View style={styles.darkFade}>
        <PendingDialog />
      </View>
    )
  }
  navigateWelcome(navigate){
    navigate('Welcome');
  }
  renderOtherDialog(){
    return (
      <View style={styles.darkFade}>
        <View style={styles.otherDialog}>
          <Icon name='plus-square' size={30} color='#e74c3c'/>
          <TextInput style={{width:'80%'}}
            onChangeText={value=>this.setState({
              otherValue: value
            })}
            ref={component=>this.accidentInput = component} placeholder='Hãy trình bày cụ thể hơn..'/>
          <Button title='Xong' onPress={()=>{
            this.props.chooseAccident({accident:this.state.otherValue});
            this.props.otherDismiss();
          }}/>
        </View>
      </View>
    )
  }
  renderBikeDialog(){
    return (
    <View style={styles.darkFade}>
      <View style={styles.otherDialog}>
        <Icon name='wrench' size={30} color='#e74c3c'/>
        <TextInput style={{width:'80%'}}
          onChangeText={value=>this.setState({
            bikeValue: value
          })}
          ref={component=>this.bikeInput = component} placeholder='Mẫu xe của bạn là gì??..'/>
        <Button title='Xong' onPress={()=>{
          this.props.popBikeDetail(false);
        }}/>
      </View>
    </View>
    )
  }
  renderSadlyDialog(){
    return(
      <View backgroundColor='#e74c3c' style={{justifyContent:'center', width:'100%', position:'absolute', height:'100%', elevation:12, alignItems:'center'}}>
          <Image style={{width: '100%', height: '40%', resizeMode:'contain'}} source={{uri: 'https://media.giphy.com/media/NTY1kHmcLsCsg/giphy.gif'}} />
        <Text style={{fontFamily:'helveticaneuecondensedbold', color:'white'}}>Rất tiếc, không có cứu hộ viên nào ở lân cận</Text>

        <Button title='Xong' onPress={()=>this.setState({
          none: false
        })} overrides={{backgroundColor: "3fffff"}}/>
      </View>
    )
  }
  renderAcceptDialog(){
    var springHeartValue = new Animated.Value(0.3);
    Animated.spring(
      springHeartValue,
      {
        friction: 1.0,
        toValue: 1
      }
    ).start();

    return (
      <View style={styles.darkFade}>
        <View style={styles.acceptDialog}>
          <Text style={{fontFamily:'helveticaneuecondensedbold', fontSize: 15, color: 'black'}}>Cứu hộ đang trên đường</Text>
          <Animated.View  style={{transform:[{scale:springHeartValue}]}}>
            <Icon name='heart' size={80} color='#e74c3c'/>
          </Animated.View>
          <Text style={{fontFamily:'helveticaneuelightitalic', color: 'black',fontSize:12}}>Số điện thoại: {this.state.saviorData}</Text>
          <Button onPress={()=>{this.setState({
            enableCanceling: true,
            accepted: false
          });
          firebase.database().ref(`OnlineUsers/${this.props.usrId}/status`).set('waiting')}}
            title='Xác nhận' color='#2ecc71'></Button>
        </View>
      </View>)
  }

  componentWillMount(){

  }
  render(){
    const {navigate} = this.props.navigation;
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;
    if (this.props.onlState==false)
    {
            navigate('Welcome');
            return null;
    }

    return(
      <View style={styles.container}>

        <CustomMapView/>
        <HideWithKeyboard style={{height:'20%'}}>
          <TopBar onRightPress={()=>{navigate('Profile')}} onPress={()=>{navigate('DrawerOpen')}}/>
        </HideWithKeyboard>

        <View style={{backgroundColor:'white', borderRadius: 5, elevation: 10, flexGrow: 1, marginTop:'17%', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginRight:'5%', height: '20%', marginLeft:'5%'}}>
          <OnOffButton ref={ref=>this.locatingMethod = ref} />
          <TouchableOpacity ref={ref=>this.toucha = ref} style={{justifyContent:'center',  borderBottomColor: '#bbb',
          borderBottomWidth: StyleSheet.hairlineWidth, alignItems: 'center', marginRight:'5%',
            width:'70%'}} onPress={()=>this.openSearchModal(navigate)}>
            <Text style={{textAlign: 'center', fontSize:20, fontFamily:'helveticaneue'}}>{this.props.address}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 8}}/>
        {!this.state.enableCanceling && this.renderFireRequestButton(navigate)}
        {this.state.enableCanceling && this.renderCancelButton()}


        {this.state.pending&&this.renderPendingDialog()}
        {this.state.accepted&&this.renderAcceptDialog()}
        {this.state.none&&this.renderSadlyDialog()}
        {this.props.otherDialog&&this.renderOtherDialog()}
        {this.state.finished&&this.renderFinishDialog()}
        {this.props.bikeDialog&&this.renderBikeDialog()}
      </View>
    )
  }
}

function sendRequestDetailToDb(data, id, navigate, func, obj){
  var requestCollection = firebase.database().ref().child("RequestDetails");
  requestCollection.push().set(data);
  //console.log(Object.keys(data));
  //now find the nearby savior in the area
  var saviorCollection =firebase.database().ref().child("OnlineSavior");
  var availableSaviors=[];
  //console.log(saviorCollection.getKey());
  saviorCollection.once('value').then((snapshot)=>{
    for (var k in snapshot.val()){
      //console.log('play', k);
      var tempDist= GeoFire.distance([data.coordinates['latitude'], data.coordinates['longitude']], [snapshot.val()[k].coordinate['lat'], snapshot.val()[k].coordinate['long']]);
      //console.log(tempDist);
      if (tempDist <= obj.props.radius)
      {
        //console.log(snapshot.key[k]);
        if(snapshot.val()[k].status!=='busy')
        {
          availableSaviors.push(snapshot.val()[k]);
          firebase.database().ref(`OnlineSavior/${k}/Victim`).set({
            fullDetails: data
          });
        }
      }
    }
    //console.log(JSON.stringify(availableSaviors));
    //firebase.database().ref(`OnlineUsers/${id}/AvailableSaviors`).set(availableSaviors);
  }).then(()=>{
    if (availableSaviors.length!=0)
    {
      func({saviorsList: availableSaviors});
      obj.setState({
            pending: true
      });
    }
    else{
      obj.setState({
        none: true
      })
    }

    firebase.database().ref(`OnlineUsers`).on('child_added',(snapshot,previousChildName)=>{
      firebase.database().ref(`OnlineUsers/${id}`).update({
        status: 'pending'
      })
    });
    firebase.database().ref(`OnlineUsers/${id}/status`).on('value',(snapshot)=>{
      if (snapshot.val()=='accepted')
      {
        obj.setState({
          pending: false,
          accepted: true
        });
        firebase.database().ref('OnlineUsers/' + obj.props.usrId+'/status').on('value', snapshot=>{

          if (snapshot.val()== 'finished')
          {
            obj.setState({
              accepted: false,
              finished: true,
              saviorData: ''

            })
          }
        });
      }
    })
  });
}

function mapStateToProps(state){
  return{
    otherDialog: state.dialogReducer.otherDialog,
    bikeDialog: state.dialogReducer.bikeDialog,
    onlState: state.userReducer.isOnline,
    accident: state.userReducer.accident,
    usrId: state.userReducer.info.id,
    usrName: state.userReducer.info.name,
    avaURL: state.userReducer.info.avaURL,
    address: state.addressReducer.address,
    usrFullReq: state.userReducer,
    chosenLocation: state.coordinatesReducer,
    radius: state.userReducer.radius
  }
}
function mapDispatchToProps(dispatch){
  var accidentAct=bindActionCreators(AccidentPickerActions, dispatch);
  var databaseAct=bindActionCreators(DatabaseActions, dispatch);
  var mapviewAct=bindActionCreators(MapViewActions, dispatch);
  var poppingAct=bindActionCreators(PoppingAction, dispatch);
  //console.log(Object.assign({},accidentAct,databaseAct));
  return Object.assign({},accidentAct,databaseAct, mapviewAct, poppingAct);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
