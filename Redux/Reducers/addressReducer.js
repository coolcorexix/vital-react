export default function addressReducer(state={
  address: "Địa điểm gặp biến cố"
}, action){
  switch (action.type) {
    case "ADDRESS_RETRIEVE":
    {
      return {...state, address: action.payload};
    }
      break;
    default:
      return {...state};
  }
}
