import RNFirebase from 'react-native-firebase'
const configurationOptions = {
  debug: true,
  databaseURL: 'https://vitalreact-87a81.firebaseio.com/',
  projectId: 'vitalreact-87a81',
  appKey: 'AIzaSyALSozpjuNKXpcewu2c0Jlxjvq5RzVBtwE'
}
const firebase = RNFirebase.initializeApp();
var firebaseDbh = firebase.database();
module.export = firebaseDbh;
export default firebase;
