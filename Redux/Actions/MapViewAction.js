export function retrieveAddress(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "ADDRESS_RETRIEVE", payload: data.address});
        }, 1);
  }
}
export function disableGetCurrentPosition(){
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch({type: "GETCUR_DISABLE", payload: null});
    }, 1);
  }
}
export function coordinateRetrieve(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "COORDINATES_RETRIEVE", payload: data.coordinates});
        }, 1);
  }
}
