export function otherPopping(){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "OTHER_POPPING", payload: null});
        }, 1);
  }
}
export function popBikeDetail(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "BIKE_POPPING", payload: data});
        }, 1);
  }
}
export function otherDismiss(){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "OTHER_DISMISS", payload: null});
        }, 1);
  }
}
