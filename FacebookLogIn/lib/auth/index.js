import { fbLoginPermissions } from '../../constants/index';
import firebase from '../../../Firebase/config/firebase';
import Auth from '../../../Firebase/config/auth';

export const handleFbLogin = ()=>{
  return new Promise((resolve, reject) =>{
    Auth.Facebook.login(fbLoginPermissions)
      .then((data) => {
        firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(data.token));
        resolve({payload: data.user});
      })
      .catch((err) => {
                      alert(err);
                      this.onError;
                      resolve({payload: null});
                    });
})};
