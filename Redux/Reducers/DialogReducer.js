export default function dialogReducer(state={
  otherDialog: false,
  bikeDialog: false
}, action){
  switch (action.type) {
    case "BIKE_POPPING":
    {
      state.bikeDialog = action.payload;
      return state;
    }
      break;
    case "OTHER_POPPING":
    {
      state.otherDialog = true;
      return state;
    }
      break;
    case "OTHER_DISMISS":
    {
      state.otherDialog = false;
      return state;
    }
      break;
    default:
      return {...state};
  }
}
