export default function saviorListReducer(state={
  saviorsList: []
}, action){
  switch (action.type) {
    case "AVAILABLE_RETRIEVE":
    {
      return {...state, saviorsList: action.payload};
    }
      break;
    default:
      return {...state};
  }
}
