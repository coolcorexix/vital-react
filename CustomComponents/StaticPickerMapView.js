import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  Image,
  Button,Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import * as MapViewAction from '../Redux/Actions/MapViewAction';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

Geocoder.setApiKey('AIzaSyA_hy3y7YHkmBPghmhXam_uKBrnQvcblJk');
const retroMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 10.762622;
const LONGITUDE = 106.660172;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class StaticPickerMapView extends Component{
  constructor(){
    super();
    this.state={
      address:' ',
      currentPos: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }
  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <MapView initialRegion={(this.props.prevChosenLocation.longitude!=undefined)?Object.assign({},this.props.prevChosenLocation,
               {latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA}):this.state.currentPos}
        onRegionChangeComplete={(region)=>{
          this.props.coordinateRetrieve({coordinates:{
            longitude: region["longitude"],
            latitude: region["latitude"]
          }});
          Geocoder.getFromLatLng(region["latitude"], region["longitude"]).then(
            json => {
              var street_number = json.results[0].address_components[0];
              var route = json.results[0].address_components[1];
              this.setState({
                address: street_number.long_name + " " + route.long_name
              })
              //this.props.retrieveAddress({address: street_number.long_name + " " + route.long_name})
            },
            error => {
              alert(error);
            }
          );
        }} style={styles.map} customMapStyle={retroMap}/>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <View style={{ margin:5, elevation: 3, flexDirection: 'row', backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius: 10}}>
            <Text style={{fontFamily:'helveticaneue', margin: 5}}>{this.state.address}</Text>
            <TouchableOpacity style={{backgroundColor:'#2ecc71', margin: 5, justifyContent:'center', alignItems:'center', borderRadius: 10}} onPress={()=>{
              const payload = this.state.address;
              this.props.retrieveAddress({address: payload});
              navigate('Main');
            }}>
              <Icon name='check' style={{margin: 2}} size={20} color='white'/>
            </TouchableOpacity>

          </View>

          <Icon name='map-pin' size={30}/>

        </View>
      </View>
    )
  }
}
function mapStateToProps(state){
  return {
    prevChosenLocation: state.coordinatesReducer.coordinates
  };
}
// <Button title='Confirm' onPress={()=>{
//   const payload = this.state.address;
//   this.props.retrieveAddress({address: payload});
//   navigate('Main');
// }} color='#2ecc71'/>
function mapDispatchToProps(dispatch){
  return bindActionCreators(MapViewAction, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(StaticPickerMapView);
