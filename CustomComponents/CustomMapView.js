import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  Image
} from 'react-native';



//google map api
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as MapViewActions from '../Redux/Actions/MapViewAction';

Geocoder.setApiKey('AIzaSyA_hy3y7YHkmBPghmhXam_uKBrnQvcblJk');

const SilverMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
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

class CustomMapView extends Component {
  constructor() {
    super();
    this.state = {
      currentPos: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markedSpot: {
        latitude: 0,
        longitude: 0,
      },
      initScreenRegion:{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }
  async requestLocationPermission(){
    try {
      const grantedFineLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Vital React Fine Location Requirement',
          'message': 'Vital React need to enable your exact location:' + 'so we can know excatly where you are'
        }
      );
      if (grantedFineLocation === PermissionsAndroid.RESULTS.GRANTED)
      {
        const grantedCoarseLocation = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            'title': 'And coarse location also, please',
            'message': `In case we can't indentify your exact location, at least we can narrow it down`
          }
        )
        if (grantedCoarseLocation===PermissionsAndroid.RESULTS.GRANTED)
          return true;
        else return false;
      };
    } catch (err){
      throw err;
    }
  }
  async componentDidMount() {
    const granted = await this.requestLocationPermission();
    if (granted == true)
    {
      navigator.geolocation.getCurrentPosition(
        position => {

          Geocoder.getFromLatLng(position.coords.latitude, position.coords.longitude).then(
            json => {
              var street_number = json.results[0].address_components[0];
              var route = json.results[0].address_components[1];
              this.props.retrieveAddress({address: street_number.long_name + " " + route.long_name})
            },
            error => {
              alert(error);
            }
          );
          this.props.coordinateRetrieve({coordinates:{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }});
          this.setState({
            currentPos: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          });
        },
      (error) => alert('Không thể xác định vị trí hiện tại'),
      { timeout: 20000, maximumAge: 10000, DistanceFilter: 50 },
      );
      // this.watchID = navigator.geolocation.watchPosition(
      //   position => {
      //     this.setState({
      //       currentPos: {
      //         latitude: position.coords.latitude,
      //         longitude: position.coords.longitude,
      //         latitudeDelta: LATITUDE_DELTA,
      //         longitudeDelta: LONGITUDE_DELTA,
      //       }
      //     });
      //   }
      // );
    }
    else {
      alert ("Location transparency is not enabled");
    }
 }
 renderMarker(){
   setTimeout(()=>{
     this.map.animateToCoordinate(this.props.chosenLocation, 500);
   }, 200);
   return (<MapView.Marker coordinate={this.props.chosenLocation}/>);
 }
 componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {


    return (
      <View style ={styles.container}>
          <MapView
            ref ={map=> this.map=map}
            style={styles.map}
            customMapStyle = {SilverMap}
            showsUserLocation={ true }
            initialRegion={this.state.initScreenRegion}
          >
            {this.props.chosenLocation.latitude && this.renderMarker()}
            {this.props.saviorMarkerSource.map(savior=>(
                <MapView.Marker coordinate = {{longitude: savior.coordinates.long, latitude: savior.coordinates.lat}}>
                  <View style={{flex:1}}>
                    <Image style={{width:30, height:30}} source={require('../image-res/reflector-vest64.png')}/>
                  </View>
                </MapView.Marker>
            ))}
        </MapView>
      </View>
    );
  }
}

function mapStateToProps(state){
  return {
    saviorMarkerSource: state.saviorListReducer.saviorsList,
    chosenLocation: state.coordinatesReducer.coordinates
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(MapViewActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(CustomMapView);
