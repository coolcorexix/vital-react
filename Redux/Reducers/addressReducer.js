export default function addressReducer(state={
  autoUpdated: true,
  address: "Địa điểm gặp biến cố"
}, action){
  switch (action.type) {
    case "GETCUR_DISABLE":
    {
      state.autoUpdated = false;
      return state;
    }
      break;
    case "ADDRESS_RETRIEVE":
    {
      return {...state, address: action.payload};
    }
      break;
    default:
      return {...state};
  }
}
