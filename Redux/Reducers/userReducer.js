export default function userReducer(state={
  isOnline: false,
  info: {
    id: " ",
    name: undefined,
    phone: undefined,
    avaURL: " ",
    isRegistered: false
  },
  accident: "wheel"
}, action){
  switch (action.type) {
    case "UPDATE_USER":
    {
      state.info.name = action.payload.info.name;
      state.info.phone = action.payload.info.phone;
      state.info.isRegistered = true;
      return state;
    }
    case "RETRIEVE_USER_PHONE":
    {
      state.isOnline = true;
      state.info.phone = action.payload;
      return state;
    }
    case "RETRIEVE_USER":
    {
        state.isOnline = true;
        return {...state, info: action.payload};
    }
      break;
    case "CHOOSE_ACCIDENT":
    {
      return {...state,  accident: action.payload};
    }
    break;
    case "COORDINATES_RETRIEVE":
    {
      return {...state,  coordinates: action.payload};
    }
    break;
    case "LOG_OUT":
    {
      return {
        isOnline: false,
        info: {
          id: " ",
          name: undefined,
          phone: undefined,
          avaURL: " ",
          isRegistered: false
        },
        accident: "wheel"
      }
    }
    break;
    default:
      return {...state};
  }
}
