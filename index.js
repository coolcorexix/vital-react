import { AppRegistry } from 'react-native';
import App from './App';
import CustomMapView from './CustomComponents/CustomMapView'
import StaticPickerMapView from './CustomComponents/StaticPickerMapView'
import MainPage from './CustomPages/MainPage'
import CustomButton from './CustomComponents/CustomButton'
import FacebookLogInPage from './CustomPages/FacebookLogInPage'
import ProfilePage from './CustomPages/ProfilePage'
import HistoryPage from './CustomPages/HistoryPage'

AppRegistry.registerComponent('VitalReact', () => App);
AppRegistry.registerComponent('MainPage', () => MainPage);
AppRegistry.registerComponent('LogInPage', () => FacebookLogInPage);
AppRegistry.registerComponent('HistoryPage', ()=>HistoryPage);
AppRegistry.registerComponent('ProfilePage', ()=>ProfilePage);

AppRegistry.registerComponent('StaticPickerMapView', () => StaticPickerMapView);
AppRegistry.registerComponent('CustomMapView', () => CustomMapView);
AppRegistry.registerComponent('CustomButton', () => CustomButton);
