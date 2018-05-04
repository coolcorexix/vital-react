export function otherPopping(){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "OTHER_POPPING", payload: null});
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
