export default function coordinatesReducer(state={
  coordinates: {
    longitude: undefined,
    latitude: undefined
  }
}, action){
  switch (action.type) {
    case "COORDINATES_RETRIEVE":
    {

      return {...state, coordinates: action.payload};
    }
      break;
    default:
      return {...state};
  }
}
