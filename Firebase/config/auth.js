import { FBLoginManager } from 'react-native-facebook-login';
import { retrieveUser } from '../../Redux/Actions/LogInAction'

var FB_PHOTO_WIDTH = 200;
const Facebook = {
  login: (permissions) => {
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {
        if (!error) {
          var tempUser = {};
          var api = `https://graph.facebook.com/v2.3/${data.credentials.userId}?fields=name,email&access_token=${data.credentials.token}`;
          var api2 = `https://graph.facebook.com/v2.3/${data.credentials.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${data.credentials.token}`;
          fetch(api)
            .then((response)=>response.json())
            .then((responseData)=>{
              tempUser = {...tempUser,info: {
                id: responseData.id,
                name: responseData.name
              }};
            })
            .then(()=>{
              fetch(api2)
                .then((response)=>response.json())
                  .then((responseData)=>{
                    var info = {...tempUser.info, avaURL: responseData.data.url};
                    tempUser = {...{}, info};
                    resolve({token: data.credentials.token, user: tempUser});
                  });
            });
        } else {
          reject(error);
        }
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      });
    });
  }
}
const Auth = { Facebook };
export default Auth;
