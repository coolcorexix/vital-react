/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//redux
import { Provider } from 'react-redux';

import store from './store'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar
} from 'react-native';
import CustomButton from "./CustomComponents/CustomButton";

//navigation purpose
import {StackNavigator, DrawerNavigator} from "react-navigation";
import FacebookLogInPage from './CustomPages/FacebookLogInPage'
import MainPage from './CustomPages/MainPage'
import HistoryPage from './CustomPages/HistoryPage'
import ProfilePage from './CustomPages/ProfilePage'
import SideBar from './CustomComponents/SideBar'
import PhoneAuthTest from './CustomPages/PhoneAuthTest'
import StaticPickerMapView from './CustomComponents/StaticPickerMapView';
import { NavigationActions } from 'react-navigation';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

//notification for testing purpose


export default class App extends Component {
  // async componentDidMount(){
  //   ReactNativeAN.scheduleAlarm(alarmNotifData);
  // }
  constructor(){
    super();
  }
  render() {
    const deviceWidth = Dimensions.get('window').width;
    const MenuEmbeddedStack = DrawerNavigator({
      Main: {screen: MainPage}
    },{
      contentComponent: ({navigation})=>(<SideBar/>),
      drawerWidth: deviceWidth/1.38,
    });
    const MainStack = StackNavigator({

        Welcome: {screen: FacebookLogInPage},
        Test: {screen: HistoryPage},
        Profile:{screen: ProfilePage},
        PhoneLogIn: {screen: PhoneAuthTest},
        Main: {screen: MenuEmbeddedStack},
        staticPick: {screen: StaticPickerMapView},
        SideBar: {screen: SideBar}

    },{
        initialRouteName: "Welcome",
        navigationOptions: ({navigation}) => ({
          header: null})
      });
      //|| state.routes[state.index].routeName === 'Profile'
    const prevGetStateForAction = MainStack.router.getStateForAction;
    MainStack.router.getStateForAction = (action, state)=>{
      if (action.type === 'Navigation/BACK' && state && (state.routes[state.index].routeName === 'Main'))
      {
        console.log(state);
        return prevGetStateForAction({...action, type: NavigationActions.reset},state);
      }

      return prevGetStateForAction(action, state);
    }


    return (
      <Provider store={store}>
      <View style={{flex:1}}>
        <StatusBar
          backgroundColor="#34495e"
          barStyle="light-content"
        />
        <MainStack/>
        </View>
      </Provider>
    );
  }
}
