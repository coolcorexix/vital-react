export default function dialogReducer(state={
  otherDialog: false
}, action){
  switch (action.type) {
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
