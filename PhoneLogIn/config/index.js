import {
    DeviceEventEmitter,
} from 'react-native';

import RNFirebasePhoneAuth from 'react-native-firebase-phone-auth';

RNFirebasePhoneauth.initFirebase(
        appId,
        'vitalreact-87a81',
        appKey,
        'https://vitalreact-87a81.firebaseio.com/',
        (resp)=>{ console.log(resp) },
        (error)=>{
            alert(error);
            console.log(error);
            },
    );
