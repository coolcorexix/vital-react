import {combineReducers} from 'redux';
import addressReducer from './addressReducer';
import userReducer from './userReducer';
import saviorListReducer from './saviorListReducer';
import coordinatesReducer from './coordinatesReducer';
import dialogReducer from './DialogReducer';

//Combine all the reducer

const rootReducer = combineReducers({
  addressReducer,
  userReducer,
  saviorListReducer,
  coordinatesReducer,
  dialogReducer
})

export default rootReducer;
