export function chooseAccident(data){
  return (dispatch)=>{
    setTimeout(() => {
            dispatch({type: "CHOOSE_ACCIDENT", payload: data.accident});
        }, 1);
  }
}
export function chooseRadius(data){
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch({type: "REQUEST_RADIUS", payload: data});
    }, 1);
  }
}
